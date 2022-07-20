'use strict'

const debug = require('debug')('api-bbva-a11:api')
const router = require('express').Router()

const apiController = require('../controllers/apiController')
const validatorHandler = require('../middlewares/validator-handler')
const schemas = require('../schemas/apiService')

router.post(
  '/get/reference',
  validatorHandler(schemas.inputData, 'body'),
  async function (req, res, next) {
    try {
      const { dueDate, amount, freePositions, freeDigit, userId } = req.body
      debug('dueDate: ', dueDate)
      debug('amount: ', amount)
      debug('freePositions: ', freePositions)
      debug('freeDigit: ', freeDigit)
      debug('userId: ', userId)
      const paymentReference = await apiController.getPaymentReference(dueDate, amount, freePositions, freeDigit, userId)
      debug('paymentReference: ', paymentReference)
      res.status(200).json({paymentReference})
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
