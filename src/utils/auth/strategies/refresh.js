'use strict'

const { Strategy, ExtractJwt } = require('passport-jwt')
const authService = require('../../../services/authService').build()

const config = require('../../../config')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const refreshTokenJwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await authService.getUserById(payload.userData.id)
    return done(null, authService.refreshToken(user))
  } catch (err) {
    done(err, false)
  }
})

module.exports = refreshTokenJwtStrategy
