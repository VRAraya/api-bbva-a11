'use strict'

const debug = require('debug')('api-bbva-a11:api')
const router = require('express').Router()

const ApiService = require('../services/apiService')
const validatorHandler = require('../middlewares/validator-handler')
const schemas = require('../schemas/apiService')

router.get(
  '/get/',
  validatorHandler(schemas.inputData, 'body'),
  async function (req, res, next) {
    try {
      const apiService = await ApiService.build()

      const { dueDate, amount, freePositions } = req.body
      const referenceCheckDigits = await apiService.applyElevenAlgorithm(dueDate, amount, freePositions)
      res.status(200).json({referenceCheckDigits})
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
