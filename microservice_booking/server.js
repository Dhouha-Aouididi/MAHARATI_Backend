const express = require('express');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');
const { sequelize } = require('./model/index');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Load database configuration from config.json
const config = require('./config/config.json')['development'];

// Sync models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized with models.');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });

// Test database connection
async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Test database connection
testDBConnection();

// Route configuration
app.use('/bookings', bookingRoutes);

// Start the server
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
