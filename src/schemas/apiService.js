'use strict'

const ajv = require('./ajv-instance')

const inputData = ajv.compile({
  type: 'object',
  properties: {
    freePositions: { type: ['string'], minLength: 8, maxLength: 20, "pattern": "^[A-Za-z0-9]+$"  },
    dueDate: { type: ['string'] },
    amount: { type: ['string']}
  },
  required: ['freePositions', 'dueDate', 'amount'],
  additionalProperties: false,
  errorMessage: {
    type: "data should be an object",
    properties: {
      freePositions: "freePositions should be alphanumeric with length between 8 and 20 characters",
    },
    _: 'data should have properties "freePositions", "dueDate" and "amount" only',
  },
})

module.exports = { inputData }
