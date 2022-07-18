const apiService = require('../services/apiService').build()

async function getPaymentReference(dueDate, amount, freePositions){
    return await apiService.applyElevenAlgorithm(dueDate, amount, freePositions)
}

module.exports = {
    getPaymentReference
}