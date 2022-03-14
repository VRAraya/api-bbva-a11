'use strict'

const debug = require('debug')('api-bbva-a11:auth')
const boom = require('@hapi/boom')

const express = require('express')
const passport = require('passport')
const router = express.Router()

router.post('/login',
  passport.authenticate('local', { session: false }),
  async function (req, res, next) {
    try {
      res.json(req.user)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/me',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      res.json(req.user)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/refresh',
  async function (req, res, next) {
    try {
      passport.authenticate('refresh', (error, user, info) => {
        debug('isAuthenticated policy: ', error, user, info)
        if (error || !user) {
          next(boom.unauthorized(info.name))
        } else {
          req.user = user
          res.json(req.user)
        }
      })(req, res)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
