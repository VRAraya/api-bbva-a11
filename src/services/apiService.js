const debug = require('debug')('api-bbva-a11:apiService')
const boom = require('@hapi/boom')
const { reference_check_digits } = require('../functions/index')

class ApiService {
  // Singleton Pattern

    static _apiServiceInstance = null;

    static build () {
      if (this._apiServiceInstance === null) {
        this._apiServiceInstance = new ApiService()
      }
      return this._apiServiceInstance
    }

    async applyElevenAlgorithm(dueDate, amount, freePositions, base = 2014, freeDigit = 2) {
      const referenceCheckDigits = await reference_check_digits(dueDate, amount, freePositions)
      return referenceCheckDigits
    }
}

module.exports = ApiService
