'use strict'

const ajv = require('./ajv-instance')

const inputData = ajv.compile({
  type: 'object',
  properties: {
    freePositions: { type: ['string'] },
    dueDate: { type: ['string'] },
    amount: { type: ['string'] }
  },
  required: ['freePositions', 'dueDate', 'amount'],
  additionalProperties: false
})

module.exports = { inputData }
