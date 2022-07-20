'use strict'

const debug = require('debug')('api-bbva-a11:auth')
const boom = require('@hapi/boom')
const authService = require('../services/authService').build()
const { recoveryPasswordEmailTemplate } = require('../utils/email/templates')

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

router.post('/forgot',
  async function (req, res, next) {
    try {
      const { email } = req.body
      const link = await authService.generateResetLink(email)
      const html = recoveryPasswordEmailTemplate(link)
      res.json(await authService.sendMail(email, 'Password recovery', html))
    } catch (error) {
      next(error)
    }
  }
)

router.post('/change-password',
  async function (req, res, next) {
    try {
      const { token, newPassword } = req.body
      res.json(await authService.changePassword(token, newPassword))
    } catch (error) {
      next(error)
    }
  }
)

router.post('/refresh',
  async function (req, res, next) {
    try {
      passport.authenticate('refresh', (error, user, info) => {
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
