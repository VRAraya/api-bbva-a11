var express = require('express')
const UserService = require('../services/userService')
const passport = require('passport')
var router = express.Router()

/* GET user listing. */
router.get('/',
  // passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const userService = UserService.build()
      const user = await userService.findAll()
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

/* POST new user. */
router.post('/', async function (req, res, next) {
  try {
    const userService = UserService.build()
    const body = req.body
    const newUser = await userService.create(body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

/* GET one user. */
router.get('/:id', async function (req, res, next) {
  try {
    const userService = UserService.build()
    const { id } = req.params
    const user = await userService.findOne(id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

/* PATCH one user. */
router.patch('/:id', async function (req, res, next) {
  try {
    const userService = UserService.build()
    const body = req.body
    const { id } = req.params
    const user = await userService.update(id, body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

/* DELETE one user. */
router.delete('/:id', async function (req, res, next) {
  try {
    const userService = UserService.build()
    const { id } = req.params
    await userService.delete(id)
    res.status(201).json(id)
  } catch (error) {
    next(error)
  }
})

module.exports = router
