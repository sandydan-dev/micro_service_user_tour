const {
    getConcertsByArtistAndCity,
    getMerchandiseStallsByStallName,
    getAfterPartiesByCity
} = require('../controllers/tourController')

const axiosInstance = require('../lib/index')

jest.mock('../lib/index.js', () => ({
    get: jest.fn()
}))



describe('Tour Controllers Test', () => {


    // concerts test data
    test('should return concerts by artist and city', async () => {
        const mockResponse = {
            concerts: [
                {
                    'id': 2,
                    'artist': 'Beyoncé',
                    'venue': 'Madison Square Garden',
                    'city': 'New York',
                    'date': '2024-08-15T20:00:00.000Z',
                    'ticketPrice': 6127,
                    'seatCategory': 'Front Row'
                }
            ],
        };
        axiosInstance.get.mockResolvedValue(mockResponse);
        const req = { query: { artist: 'Beyoncé', city: 'New York' } }
        const res = { json: jest.fn(), status: jest.fn(() => req) }
        await getConcertsByArtistAndCity(req, res)
        // expect to have been called with
        expect(axiosInstance.get).toHaveBeenCalledWith('/concerts/search?artist=Beyoncé&city=New York')
    })


    // merchandise test data
    test('should return merchandiseStatllName using query params', async () => {
        const mockResponse = {
            merchandiseStalls: [
                {
                    'id': 1,
                    'stallName': 'Rocking Tees',
                    'itemAvailable': 'T-Shirts',
                    'price': 250
                }
            ],
        };

        axiosInstance.get.mockResolvedValue(mockResponse);
        const req = { query: { stallName: 'Rocking Tees' } }
        const res = { json: jest.fn(), status: jest.fn(() => req) }
        await getMerchandiseStallsByStallName(req, res)
        // expect to have been called with
        expect(axiosInstance.get).toHaveBeenCalledWith('/merchandiseStalls/search?stallName=Rocking Tees')

    })

    // afterparties test data
    test('should return afterparties by  city', async () => {
        const mockResponse = {
            afterParties: [
               {
                  'id': 11,
                  'location': 'Vortex Club',
                  'city': 'Phoenix',
                  'date': '2024-12-11T22:30:00.000Z',
                  'ticketPrice': 800
              },
              {
                  'id': 30,
                  'location': 'Velvet Nightclub',
                  'city': 'Phoenix',
                  'date': '2024-12-30T22:30:00.000Z',
                  'ticketPrice': 900
              }
            ],
       };
       axiosInstance.get.mockResolvedValue(mockResponse);
       const req = { query: { city: 'Phoenix' } }
       const res = { json: jest.fn(), status: jest.fn(() => req) }
       await getAfterPartiesByCity(req, res)
       // expect to have been called with
       expect(axiosInstance.get).toHaveBeenCalledWith('/afterparties/search?city=Phoenix')
    })

})