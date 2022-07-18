var express = require('express')
const UserController = require('../controllers/userController')
const passport = require('passport')
var router = express.Router()

router.get('/',
  // passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const user = await UserController.getAllUsers()
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  // passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const newUser = await UserController.findOrCreate(req.body)
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id', 
  // passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const user = await UserController.getUserById(req.params.id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id', 
  // passport.authenticate('jwt', { session: false }), 
  async function (req, res, next) {
    try {
      const body = req.body
      const { id } = req.params
      const user = await UserController.updateUserById(id, body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/to-admin/:id', 
  // passport.authenticate('jwt', { session: false }), 
  async function (req, res, next) {
    try {
      const { id } = req.params
      const user = await UserController.changeRoleToAdmin(id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/to-executive/:id', 
  // passport.authenticate('jwt', { session: false }), 
  async function (req, res, next) {
    try {
      const { id } = req.params
      const user = await UserController.changeRoleToExecutive(id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', 
  // passport.authenticate('jwt', { session: false }), 
  async function (req, res, next) {
    try {
      const { id } = req.params
      await UserController.deleteUserById(id)
      res.status(201).json(id)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
