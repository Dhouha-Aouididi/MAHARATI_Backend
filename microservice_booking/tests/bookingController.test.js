// bookingController.test.js

const bookingController = require('../controller/bookingController');
const { Booking, User, Service } = require('../model/index').models;

jest.mock('../model/index', () => ({
  models: {
    Booking: {
      findAll: jest.fn(),
      create: jest.fn(),
      findByPk: jest.fn(),
      destroy: jest.fn(),
      update: jest.fn()
    },
    User: {
      findByPk: jest.fn()
    },
    Service: {
      findByPk: jest.fn()
    }
  }
}));

// Example Unit Test for getAllBookings
describe('getAllBookings', () => {
  it('should return all bookings with service titles', async () => {
    const mockBookings = [
      { id: 1, user_id: 1, service_id: 1, date: '2024-05-19', status: 'pending', Service: { title: 'Massage' } },
      // ... more mock bookings
    ];
    Booking.findAll.mockResolvedValue(mockBookings); 

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await bookingController.getAllBookings(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockBookings);
  });

  // ... more unit tests for error cases, etc.
});
