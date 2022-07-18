'use strict'

const passport = require('passport')

const JwtStrategy = require('./strategies/jwt')
const LocalStrategy = require('./strategies/local')
const RefreshStrategy = require('./strategies/refresh')

passport.use('jwt', JwtStrategy)
passport.use('local', LocalStrategy)
passport.use('refresh', RefreshStrategy)
