const { Reference } = require('../db/models/index')
const boom = require('@hapi/boom')

class ReferenceService {
  // Singleton Pattern

  static _referenceServiceInstance = null

  static build () {
    if (this._referenceServiceInstance === null) {
      this._referenceServiceInstance = new ReferenceService()
    }
    return this._referenceServiceInstance
  }

  async create (data) {
    return await Reference.create(data)
  }

  async findAll () {
    return await Reference.findAll()
  }

  async findOne (id) {
    const reference = Reference.findByPk(id)
    if (!reference) {
      throw boom.notFound('reference not found')
    }
    return reference
  }

  async findByUserId (userId) {
    const cond = {
      where: { user_id: userId }
    }
    const references = Reference.findAll(cond)
    if (!references) {
      throw boom.notFound('references not found')
    }
    return references
  }
}

module.exports = ReferenceService
