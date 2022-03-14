'use strict'

const debug = require('debug')('api-bbva-a11:api')
const router = require('express').Router()

const ApiService = require('../services/apiService')
const validatorHandler = require('../middlewares/validator-handler')
const schemas = require('../schemas/apiService')

/* GET home page. */
router.post(
  '/get/',
  async function (req, res, next) {
    try {
      res.status(200).json()
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/test',
  async function (req, res, next) {
    try {
      res.status(200).json()
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/create/',
  async function (req, res, next) {
    try {
      res.status(200).json()
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/update/',
  async function (req, res, next) {
    try {
      res.status(200).json()
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
