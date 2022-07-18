const userService = require('../services/userService').build()
const crypto = require("crypto")
const bcrypt = require("bcrypt")

async function createUsers(params = {}) {
    const userEmail = [
    ]

    const subUserList = [

]

    const cmsUserService = await CmsUserService.build()
    let result = []
    for (const email of subUserList) {
        const userFound = await cmsUserService.getUserByEmail(email)
        let pass = crypto.randomBytes(10).toString('hex')
        if (userFound) {
            result.push({ email, pass })
            await userService.create({
                cms_user_id: userFound[0].id,
                name: `${userFound[0].firstname} ${userFound[0].lastname}`,
                password: pass,
                email: email
            })
        }else{
            result.push({ email, pass: 'Usuario no encontrado' })
        }
    }
    return result
}


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
