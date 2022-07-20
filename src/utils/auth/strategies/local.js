'use strict'

const { Strategy } = require('passport-local')
const authService = require('../../../services/authService').build()

const LocalStrategy = new Strategy({
  usernameField: 'email',
  password: 'password'
},
async (email, password, done) => {
  try {
    const user = await authService.getUserByEmail(email, password)
    done(null, authService.signToken(user))
  } catch (err) {
    done(err, false)
  }
})

module.exports = LocalStrategy
