require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { sequelize } = require('./models')

const { createTour, getTour } = require('./controllers/dataController')
const { getConcerts, getMerchandiseStalls, getAfterParties } = require('./controllers/tourController')

app.use(cors())
app.use(express.json())

// createing routes  and id
app.post('/tour', createTour)
app.get('/tour/:id', getTour)

// get routes of  all item details
app.get('/data/concerts', getConcerts)
app.get('/data/merchandiseStalls', getMerchandiseStalls)
app.get('/data/afterParties', getAfterParties)



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