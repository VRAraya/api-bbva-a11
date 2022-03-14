'use strict'

const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajvInstance = new Ajv({ allErrors: true, allowUnionTypes: true })
addFormats(ajvInstance)

module.exports = ajvInstance
