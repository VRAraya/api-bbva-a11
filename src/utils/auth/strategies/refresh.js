'use strict'

const { Strategy, ExtractJwt } = require('passport-jwt')
const UserService = require('../../../services/userService')

const debug = require('debug')('api-bbva-a11:refreshMiddleware')
const config = require('../../../config')
const jwt = require('jsonwebtoken')
const boom = require('@hapi/boom')

const userService = UserService.build()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const refreshTokenJwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    debug(payload)
    const user = await userService.findOne(payload.userData.id)
    if (!user) {
      done(boom.unauthorized(), false)
    }
    const payloadToken = {
      user: {
        id: user.id,
        email: user.email
      }
    }
    return done(null, {
      access_token: jwt.sign(payloadToken, config.jwtSecret, { expiresIn: '1d' }),
      token_type: 'bearer',
      expires_in: 86400
    })
  } catch (err) {
    done(err, false)
  }
})

module.exports = refreshTokenJwtStrategy
