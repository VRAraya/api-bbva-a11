'use strict'

const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const addErrors = require("ajv-errors")

const ajvInstance = new Ajv({ allErrors: true, allowUnionTypes: true })
addFormats(ajvInstance)
addErrors(ajvInstance)

module.exports = ajvInstance
