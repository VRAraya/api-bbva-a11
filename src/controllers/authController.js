const authService = require('../services/authService').build()
const crypto = require("crypto")
const bcrypt = require("bcrypt")

async function findOrCreate(data) {
    const userCreated = await userService.findOrCreate(data)
    return userCreated
}

async function getAllUsers() {
    return await userService.findAll()
}

async function getUserById(id) {
    return await userService.findOne(id)
}

async function getAuthByUserId (id) {
    const user = await userService.findOne(id)
    if (!user) {
      throw boom.unauthorized()
    }
    return user
  }

async function updateUserById(id, changes) {
    return await userService.update(id, changes)
}

async function changeRoleToAdmin(id) {
    return await userService.update(id, {"role": "admin"})
}

async function changeRoleToExecutive(id, changes) {
    return await userService.update(id, {"role": "executive"})
}

async function deleteUserById(id) {
    return await userService.delete(id)
}

module.exports = {
    createUsers,
    findOrCreate,
    getAllUsers,
    getUserById,
    updateUserById,
    changeRoleToAdmin,
    changeRoleToExecutive,
    deleteUserById
}
