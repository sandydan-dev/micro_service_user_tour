require('dotenv').config()
const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: process.env.MICROSERVICE_BASE_URL,
    headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET
    }
})



const getConcerts = async (req, res) => {
    try {

        const response = await axiosInstance.get('/concerts', {
            headers: {
                'Content-Type': 'application/json',
                CLIENT_KEY: process.env.CLIENT_KEY,
                CLIENT_SECRET: process.env.CLIENT_SECRET
            }
        })

        return res.json(response.data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get concerts" })
    }
}



const getMerchandiseStalls = async (req, res) => {
    try {
        const response = await axiosInstance.get('/merchandisestalls')
        return res.json(response.data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get merchandisestalls" })
    }
}



const getAfterParties = async (req, res) => {
    try {
        const response = await axiosInstance.get('/afterparties')
        return res.json(response.data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get afterparties" })
    }
}


module.exports = {
    getConcerts,
    getMerchandiseStalls,
    getAfterParties
}