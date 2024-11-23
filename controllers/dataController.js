const {
    afterParty: afterParitiesModel,
    concert: concertModel,
    merchandiseStall: merchandiseStallModel,
    tour: tourModel,
    tourItem: tourItemModel
} = require('../models')

const createTour = async (req, res) => {
    try {
        const { concerts, merchandiseStalls, afterParties, name } = req.body
       
        // create new tour name
        const newTour = await tourModel.create({ name })

        // logic for concerts created data
        if (concerts && concerts.length > 0) {
            for (const concert of concerts) {
                const savedConcerts = await concertModel.create(concert)
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedConcerts.id,
                    type: "concert"
                })
            }
        }

        if (merchandiseStalls && merchandiseStalls.length > 0) {
            for (const merchandiseStall of merchandiseStalls) {
                const savedmerchandiseStalls = await merchandiseStallModel.create(merchandiseStall)
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedmerchandiseStalls.id,
                    type: "merchandiseStall"
                })
            }
        }


        if (afterParties && afterParties.length > 0) {
            for (const afterParty of afterParties) {
                const savedafterParties = await afterParitiesModel.create(afterParty)
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedafterParties.id,
                    type: "afterParties"
                })
            }
        }

        res.status(201).json({ message: 'Tour created successfully', tour: newTour })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create tour" })
    }
}



const getTour = async (req, res) => {
    try {

        // get tour which is created by the above createTour function
        const tourId = parseInt(req.params.id)
        const tour = await tourModel.findByPk(tourId)

        // if tour id not found
        if (!tour) {
            return res.status(404).json({ message: "Tour not found" })
        }

        // if id found then return the tour details
        const tourDetails = await tourModel.findAll({
            where: { id: tour.id }
        })


        // retrive all the tour items for each in empty array 
        const concertsItem = []
        const merchandiseStallItem = []
        const afterPartiesItem = []

        for (const item of tourDetails) {
            // extract data from tour item
            if (item.type === "concert") {
                const concert = await concertModel.findByPk(item.itemId)
                if (concert) concertsItem.push(concert)
            } else if (item.type === "merchandiseStall") {
                const merchandiseStall = await merchandiseStallModel.findByPk(item.itemId)
                if (merchandiseStall) concertsItem.push(merchandiseStall)
            } else {
                const afterParties = await afterParitiesModel.findByPk(item.itemId)
                if (afterParties) concertsItem.push(afterParties)
            }
        }

        // return the tour details with all the items
        res.status(200).json({ tour: tourDetails, concerts: concertsItem, merchandiseStalls: merchandiseStallItem, afterParties: afterPartiesItem })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get Tour" })

    }
}



module.exports = { createTour, getTour }