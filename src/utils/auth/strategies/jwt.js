'use strict'

const { Strategy, ExtractJwt } = require('passport-jwt')
const UserService = require('../../../services/userService')
const config = require('../../../config')
const boom = require('@hapi/boom')

const userService = UserService.build()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await userService.findOne(payload.userData.id)
    if (!user) {
      done(boom.unauthorized(), false)
    }
    return done(null, user)
  } catch (err) {
    done(err, false)
  }
})

module.exports = JwtStrategy
