const debug = require('debug')('api-bbva-a11:apiService')
const boom = require('@hapi/boom')

class ApiService {
  // Singleton Pattern

    static _apiServiceInstance = null;

    static build () {
      if (this._apiServiceInstance === null) {
        this._apiServiceInstance = new ApiService()
      }
      return this._apiServiceInstance
    }
}

module.exports = ApiService
