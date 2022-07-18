const referenceService = require('../services/referenceService').build()


async function getAllReferences() {
    return await referenceService.findAll()
}

async function createReference(data) {
    return await referenceService.create(data)
}

async function getReferenceById(id) {
    return await referenceService.findOne(id)
}

async function getReferencesByUserId(userId) {
    return await referenceService.findByUserId(userId)
}

module.exports = {
    getAllReferences,
    createReference,
    getReferenceById,
    getReferencesByUserId,
}
