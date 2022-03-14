'use strict'

require('dotenv').config()
require('./src/utils/auth')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const cors = require('cors')

const indexRouter = require('./src/routes/index')
const { logErrors, errorHandler, boomErrorHandler } = require('./src/middlewares/error-handler')

const app = express()

app.use(cors({ origin: '*' }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

app.use('/api', indexRouter)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

module.exports = app