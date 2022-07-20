const { User } = require('../db/models/index')
const boom = require('@hapi/boom')

class UserService {
  // Singleton Pattern

  static _userServiceInstance = null

  static build () {
    if (this._userServiceInstance === null) {
      this._userServiceInstance = new UserService()
    }
    return this._userServiceInstance
  }

  async findOrCreate (data) {
    const { email } = data
    const newUser = await User.findOrCreate({
      defaults: data,
      where: { email }
    })
    delete newUser[0].dataValues.password
    return newUser
  }

  async findAll () {
    return await User.findAll()
  }

  async findOne (id) {
    const user = User.findByPk(id)
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user
  }

  async findByEmail (email, unscoped = null) {
    const cond = {
      where: { email }
    }
    const user = await (unscoped ? User.unscoped().findOne(cond) : User.find(cond))
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user
  }

  async update (id, changes) {
    const user = await this.findOne(id)
    const updatedUser = await user.update(changes)
    delete updatedUser.dataValues.password
    return updatedUser
  }

  async delete (id) {
    const user = await this.findOne(id)
    await user.destroy(id)
    return { id }
  }
}

module.exports = UserService
