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
      const { dueDate, amount, freePositions } = req.body
      debug('dueDate: ', dueDate)
      debug('amount: ', amount)
      debug('freePositions: ', freePositions)
      const paymentReference = await apiController.getPaymentReference(dueDate, amount, freePositions)
      debug('paymentReference: ', paymentReference)
      res.status(200).json({paymentReference})
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
