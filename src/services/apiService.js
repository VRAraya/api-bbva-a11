const debug = require('debug')('api-bbva-a11:apiService')
const boom = require('@hapi/boom')
const config = require('../../src/config')
const { reference_check_digits } = require('../functions/index')

class ApiService {
  // Singleton Pattern

    static _apiServiceInstance = null;

    static build () {
      if (this._apiServiceInstance === null) {
        this._baseForElevenAlgorithm = 
        this._apiServiceInstance = new ApiService()
      }
      return this._apiServiceInstance
    }

    async getBaseForElevenAlgorithm() {
      return await config.baseForElevenAlgorithm
    }

    async applyElevenAlgorithm(dueDate, amount, freePositions, base = config.baseForElevenAlgorithm, freeDigit = 2) {
      debug(dueDate, amount, freePositions)
      const referenceCheckDigits = await reference_check_digits(dueDate, amount, freePositions, base, freeDigit)
      return referenceCheckDigits
    }
}

module.exports = ApiService
