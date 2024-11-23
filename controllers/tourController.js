
const {
    validateConcertsQueryParams,
    validateMerchandiseStallsQueryParams,
    validateAfterPartiesQueryParams
} = require('../validation/validate')

const axiosInstance = require('../lib/index')



// get input validation from concerts, get artist and city from it.
const getConcertsByArtistAndCity = async (req, res) => {

    // input error validation
    const errors = validateConcertsQueryParams(req.query)
    if (errors.length > 0) {
        return res.status(400).json({ errors })
    }

    try {
        // get details from concerts
        const { artist, city } = req.query
        const response = await axiosInstance.get(`/concerts/search?artist=${artist}&city=${city}`)
        res.json(response.data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get artis and city from concerts" })
    }
}

const getConcerts = async (req, res) => {
    try {

        const test_error = req.query.test_error;
        const rate_limit = req.query.rate_limit

        const response = await axiosInstance.get(`/concerts?test_error=${test_error}&rate_limit=${rate_limit}`, {
            headers: {
                'Content-Type': 'application/json',
                CLIENT_KEY: process.env.CLIENT_KEY,
                CLIENT_SECRET: process.env.CLIENT_SECRET
            }
        })

        return res.json(response.data)
    } catch (error) {
        console.log(error)

        // rate limit error handle
        if (error.response.status === 429) {
            return res.status(429).json({ message: 'Rate limit exceeded concerts' })
        } else if (error.response.status === 500 && error.response.data.error === "Simulated error for testing purpose") {
            return res.status(500).json({ error: "Simulated error for testing purpose" })
        }

        res.status(500).json({ message: "Failed to get concerts" })
    }
}



// get mechandisestalls details of from merchandiseStall statllName
const getMerchandiseStallsByStallName = async (req, res) => {
    // input validation for stall name of merchandiseStall
    const errors = validateMerchandiseStallsQueryParams(req.query)
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Invalid query parameters', errors })
    }


    try {
        const { stallName } = req.query
        const response = await axiosInstance.get(`/merchandiseStalls/search?stallName=${stallName}`)
        res.json(response.data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get merchandiseStalls stall name" })
    }
}


const getMerchandiseStalls = async (req, res) => {
    try {
        const test_error = req.query.test_error;
        const rate_limit = req.query.rate_limit

        const response = await axiosInstance.get(`/merchandisestalls?test_error=${test_error}&rate_limit=${rate_limit}`)
        return res.json(response.data)

    } catch (error) {
        console.log(error)

        // rate limit error handle
        if (error.response.status === 429) {
            return res.status(429).json({ message: 'Rate limit exceeded merchandisestalls' })
        } else if (error.response.status === 500 && error.response.data.error === "Simulated error for testing purpose") {
            return res.status(500).json({ error: "Simulated error for testing purpose" })
        }

        res.status(500).json({ message: "Failed to get merchandisestalls" })
    }
}



// get afterparties details of from afterparties by city
const getAfterPartiesByCity = async (req, res) => {

    // errors validation for city of afterparties
    const errors = validateAfterPartiesQueryParams(req.query)
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Invalid query parameters', errors })
    }

    try {
        const { city } = req.query;
        const response = await axiosInstance.get(`/afterparties/search?city=${city}`)
        res.json(response.data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get afterparties by city" })

    }
}


const getAfterParties = async (req, res) => {
    try {
        const test_error = req.query.test_error;
        const rate_limit = req.query.rate_limit
        const response = await axiosInstance.get(`/afterparties?test_error=${test_error}&rate_limit=${rate_limit}`)
        return res.json(response.data)

    } catch (error) {
        console.log(error)

        // rate limit error handle
        if (error.response.status === 429) {
            return res.status(429).json({ message: 'Rate limit exceeded afterParties' })
        } else if (error.response.status === 500 && error.response.data.error === "Simulated error for testing purpose") {
            return res.status(500).json({ error: "Simulated error for testing purpose" })
        }

        res.status(500).json({ message: "Failed to get afterparties" })
    }
}


module.exports = {
    getConcerts,
    getMerchandiseStalls,
    getAfterParties,
    getConcertsByArtistAndCity,
    getMerchandiseStallsByStallName,
    getAfterPartiesByCity
}