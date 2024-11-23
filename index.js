require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { sequelize } = require('./models')

const { createTour, getTour } = require('./controllers/dataController')
const { getConcerts, getMerchandiseStalls, getAfterParties, getConcertsByArtistAndCity, getMerchandiseStallsByStallName, getAfterPartiesByCity } = require('./controllers/tourController')

app.use(cors())
app.use(express.json())

// createing routes  and id
app.post('/tour', createTour)
app.get('/tour/:id', getTour)

// get routes of  all item details
app.get('/data/concerts', getConcerts)
app.get('/data/merchandiseStalls', getMerchandiseStalls)
app.get('/data/afterParties', getAfterParties)

// get input validation 
app.get('/concerts/search', getConcertsByArtistAndCity) // http://localhost:3000/concerts/search?artist=Taylor Swift&city=Las Veg

app.get('/merchandiseStalls/search', getMerchandiseStallsByStallName ) // http://localhost:3000/merchandiseStalls/search?stallName=Rocking Tees

// get input validation afterparites
app.get('/afterParties/search', getAfterPartiesByCity) // http://localhost:3000/afterParties/search?city=Las Vegas


// 
sequelize.authenticate().then(() => {
    console.log('connected to database')
}).catch((error) => {
    console.log('error connecting to database', error.message)
})


// listening on incomming request
app.listen(3000, () => {
    console.log('server is running on port 3000')
})