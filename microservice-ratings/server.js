const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// Add or update a rating
app.post('/ratings', async (req, res) => {
  const { serviceId, userId, rating } = req.body;
  try {
    // Check if the user has already rated the service
    const [existingRating] = await pool.query('SELECT * FROM ratings WHERE service_id = ? AND user_id = ?', [serviceId, userId]);
    if (existingRating.length > 0) {
      // Update the existing rating
      await pool.query('UPDATE ratings SET rating = ? WHERE service_id = ? AND user_id = ?', [rating, serviceId, userId]);
      res.json({ message: 'Rating updated successfully' });
    } else {
      // Add a new rating
      await pool.query('INSERT INTO ratings (service_id, user_id, rating) VALUES (?, ?, ?)', [serviceId, userId, rating]);
      res.json({ message: 'Rating added successfully' });
    }
  } catch (error) {
    console.error('Error adding/updating rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get average rating for a service
app.get('/ratings/average/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const [result] = await pool.query('SELECT AVG(rating) AS average_rating FROM ratings WHERE service_id = ?', [serviceId]);
    res.json({ averageRating: result[0].average_rating });
  } catch (error) {
    console.error('Error fetching average rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Ratings microservice running on port ${PORT}`);
});
