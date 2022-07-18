var express = require('express')
const ReferenceController = require('../controllers/referenceController')
const passport = require('passport')
var router = express.Router()

router.get('/',
  // passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const references = await ReferenceController.getAllReferences()
      res.json(references)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  // passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const newReference = await ReferenceController.createReference(req.body)
      res.status(201).json(newReference)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id', 
  // passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const reference = await ReferenceController.getReferenceById(req.params.id)
      res.json(reference)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/by-user/:id', 
  // passport.authenticate('jwt', { session: false }), 
  async function (req, res, next) {
    try {
      const { id } = req.params
      const reference = await ReferenceController.getReferencesByUserId(id)
      res.json(reference)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
