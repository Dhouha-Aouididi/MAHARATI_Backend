const { Comment} = require('../model/index').models; 
const { User} = require('../model/index').models;
const {Booking} = require('../model/index').models;
const { Service } = require('../model/index').models;


// Controller to get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    // Find all bookings
    const bookings = await Booking.findAll({
      include: [{ model: Service, attributes: ['title', 'image', 'price'] }] 
    });
    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
};

// Controller to handle booking creation
exports.createBooking = async (req, res) => {
  const { user_id, service_id, date, time, status } = req.body;

  try {
    console.log('Received request to create booking:', req.body);

    // Check if the user and service exist
    const user = await User.findByPk(user_id);
    const service = await Service.findByPk(service_id);

    if (!user || !service) {
      console.error('User or service not found.');
      return res.status(404).json({ error: 'User or service not found.' });
    }

    // Create the booking
    const newBooking = await Booking.create({ user_id, service_id, date, time, status });

    console.log('New booking created:', newBooking);

    return res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Failed to create booking.', details: error.message });
  }
};


// Controller to get bookings for a specific user
exports.getBookingsByUserId = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed in the URL params

  try {
    // Find bookings for the specified user ID
    const bookings = await Booking.findAll({
      where: { user_id: userId }, // Filter by user_id
      include: [
        { model: Service, attributes: ['title', 'image', 'price'] } // Include service details (title and image)
      ]
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
};



// Controller to handle booking deletion
exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Find the booking by ID
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      console.error('Booking not found.');
      return res.status(404).json({ error: 'Booking not found.' });
    }
    // Delete the booking
    await booking.destroy();

    console.log('Booking deleted:', bookingId);

    return res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting booking:', error);
    return res.status(500).json({ error: 'Failed to delete booking.', details: error.message });
  }
};


// Controller to handle booking update
exports.updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { user_id, service_id, date, time, status } = req.body;

  try {
    // Find the booking by ID
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      console.error('Booking not found.');
      return res.status(404).json({ error: 'Booking not found.' });
    }

    // Update the booking details
    await booking.update({ user_id, service_id, date, time, status });

    console.log('Booking updated:', bookingId);

    return res.status(200).json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return res.status(500).json({ error: 'Failed to update booking.', details: error.message });
  }
}; 

