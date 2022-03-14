const debug = require('debug')('api-bbva-a11:errors')
const boom = require('@hapi/boom')
const PrettyError = require('pretty-error')

const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

function logErrors (err, req, res, next) {
  console.error(pe.render(err))
  next(err)
}

function errorHandler (err, req, res, next) {
  const error = boom.boomify(err, { statusCode: err.code || 500, message: err.message || 'Internal Server Error' })
  const { output } = error
  output.payload = {
    ...output.payload,
    "data": {
      "titleError": err.message || 'Internal Server Error',
      "stack": err.stack
    }
  }
  res.status(output.statusCode).json(output.payload)
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output, data } = err
    const errorMessage = data ? (data.response ? data.response.data.errors[0].message : (output.payload.message ? output.payload.message : 'unknown error')) : output.payload.message
    const titleError = data ? (data.titleError ? data.titleError : (output.payload.message ? output.payload.message : 'unknown error')) : output.payload.message
    output.payload = {
      ...output.payload,
      "message": errorMessage,
      "data": {
        "titleError": titleError,
        "stack": err.stack
      }
    }
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
