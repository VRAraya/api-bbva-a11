const apiService = require('../services/apiService').build()
const referenceService = require('../services/referenceService').build()

async function getPaymentReference(dueDate, amount, freePositions, freeDigit, userId){
    const base = await apiService.getBaseForElevenAlgorithm()
    const paymentReferenceCreated = await referenceService.create({
        'user_id': userId,
        'free_positions': freePositions,
        'amount': amount, 
        'due_date': dueDate,
        base, 
        'free_digit': freeDigit
    })
    return paymentReferenceCreated
}

module.exports = {
    getPaymentReference
}