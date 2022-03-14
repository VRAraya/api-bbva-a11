'use strict'

const { Strategy } = require('passport-local')
const UserService = require('../../../services/userService')

const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')
const config = require('../../../config')
const jwt = require('jsonwebtoken')

const userService = UserService.build()

const LocalStrategy = new Strategy({
  usernameField: 'email',
  password: 'password'
},
async (email, password, done) => {
  try {
    const user = await userService.findByEmail(email, true)
    if (!user) {
      done(boom.unauthorized(), false)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      done(boom.unauthorized(), false)
    }

    const userData = {
      id: user.id,
      email: user.email,
      cms_user_id: user.cms_user_id
    }

    done(null, {
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
    })
  } catch (err) {
    done(err, false)
  }
}
)

module.exports = LocalStrategy
