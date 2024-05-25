const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');

// POST route to create a new booking
router.post('/', bookingController.createBooking);

// DELETE route to delete a booking by ID
router.delete('/:bookingId', bookingController.deleteBooking);

// PUT route to update a booking by ID
router.put('/:bookingId', bookingController.updateBooking);

// GET route to fetch all bookings
router.get('/', bookingController.getAllBookings);

//
router.get('/user/:userId', bookingController.getBookingsByUserId);

module.exports = router;

