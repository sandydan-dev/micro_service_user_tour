// get concerts input error validation

// concerts
function validateConcertsQueryParams(query) {
    const errors = []
    if (!query.artist) {
        errors.push('artist is required')
    }
    if (!query.city) {
        errors.push('city is required')
    }
    return errors;
}
// merchandiseStalls
function validateMerchandiseStallsQueryParams(query) {
    const errors = []
    if (!query.stallName) {
        errors.push({ message: 'Stall name is required' })
    }
    return errors
}
// afterParties
function validateAfterPartiesQueryParams(query) {
    const errors = []
    if (!query.city) {
        errors.push({ message: 'afterPartyId is required' })
    }
    return errors;
}

module.exports = { validateConcertsQueryParams, validateMerchandiseStallsQueryParams, validateAfterPartiesQueryParams }