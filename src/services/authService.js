const debug = require('debug')('api-bbva-a11:authService')
const { User } = require('../db/models/index')
const nodemailer = require('nodemailer')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const config = require('../config')
const jwt = require('jsonwebtoken')

class AuthService {
  // Singleton Pattern

    static _authServiceInstance = null

    static build () {
      if (this._authServiceInstance === null) {
        this._authServiceInstance = new AuthService()
      }
      return this._authServiceInstance
    }
    
    payloadData(user) {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        cms_user_id: user.cms_user_id,
        recovery_token: user.recovery_token,
        first_logged_in: user.first_logged_in
      }
      return userData
    }

    async getUserById(id) {
      const user = await User.findByPk(id)
      if (!user) {
        throw boom.unauthorized()
      }
      debug(user)
      return user
    }

    async getUserByEmail(email, password) {
      const cond = {
        where: { email }
      }
      const user = await User.unscoped().findOne(cond)
      if (!user) {
        throw boom.unauthorized()
      } else debug(user)
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw boom.unauthorized()
      } else debug(user)

      return user
    }


    signToken(user) {
      const userData = this.payloadData(user)
      return {
        token: {
          headers: {},
          original: {
            access_token: jwt.sign({ userData }, config.jwtSecret, { expiresIn: '1d' }),
            token_type: 'bearer',
            expires_in: 86400
          },
          exception: null
        },
        user: userData
      }
    }

    refreshToken(user) {
      const userData = this.payloadData(user)
      return {
        access_token: jwt.sign({ userData }, config.jwtSecret, { expiresIn: '1d' }),
        token_type: 'bearer',
        expires_in: 86400
      }
    }

    async generateResetLink(email) {
      const user = await User.unscoped().findOne({
        where: { email }
      })
      if (!user) {
        throw boom.notFound('email not found')
      }
      const payload = { sub: user.id }
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' })
      await user.update({ recovery_token: token })
      debug(user)
      return `${config.frontendUrl}/reset-password?token=${token}`
    }

    async changePassword(token, newPassword) {
      const payload = jwt.verify(token, config.jwtSecret)
      const user = await User.findByPk(payload.sub)
      if (!newPassword) {
        throw boom.notFound('password not found')
      }
      if (!user) {
        throw boom.notFound('user not found')
      }
      if(user.recovery_token !== token) {
        throw boom.unauthorized()
      }
      const userUpdated = await user.update({ recovery_token: null, password: newPassword })
      if (!userUpdated) {
        throw boom.unauthorized()
      }
      return { message: 'password changed' }
    }

    async sendMail(email, subject, html) {
      const mail = {
        from: `${config.smtpMail}`,
        to: `${email}`,
        subject,
        html
      }

      const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: (config.smtpPort === 465) ? true : false, // true for 465, false for other ports
        auth: {
          user: config.smtpUser, 
          pass: config.smtpPass
        },
      })
      await transporter.sendMail(mail)
      return { message: 'mail sent' }
    }

}

module.exports = AuthService
