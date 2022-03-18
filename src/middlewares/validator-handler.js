const boom = require('@hapi/boom')

function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property]
    const valid = schema(data)
    if (!valid) {
      const errors = schema.errors[0] ? schema.errors[0] : schema.errors
      next(boom.badRequest(errors.message))
    }
    next()
  }
}

module.exports = validatorHandler
