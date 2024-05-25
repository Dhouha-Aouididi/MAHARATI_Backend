const request = require('supertest');
const app = require('../server');

describe('Booking API integration tests', () => {
  let bookingId; // Variable pour stocker l'ID de la réservation créée pour une utilisation ultérieure

  it('should create a new booking', async () => {
    const res = await request(app)
      .post('/bookings')
      .send({
        user_id: 1, // Remplacez par un ID utilisateur existant dans votre base de données
        service_id: 16, // Remplacez par un ID de service existant dans votre base de données
        date: '2024-06-01',
        time: '10:00 AM',
        status: 'pending',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    bookingId = res.body.id; // Stockez l'ID de la réservation créée pour les tests ultérieurs
  });

  it('should get all bookings', async () => {
    const res = await request(app).get('/bookings');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get bookings for a specific user', async () => {
    const userId = 1; // Remplacez par l'ID de l'utilisateur pour lequel vous souhaitez récupérer les réservations
    const res = await request(app).get(`/bookings/user/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a booking', async () => {
    const res = await request(app)
      .put(`/bookings/${bookingId}`)
      .send({
        user_id: 35, // Remplacez par un ID utilisateur existant dans votre base de données
        service_id: 19, // Remplacez par un ID de service existant dans votre base de données
        date: '2024-06-02',
        time: '11:00 AM',
        status: 'confirmed',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', bookingId);
    expect(res.body.date).toEqual('2024-06-02');
    expect(res.body.time).toEqual('11:00 AM');
    expect(res.body.status).toEqual('confirmed');
  });

  it('should delete a booking', async () => {
    const res = await request(app).delete(`/bookings/${bookingId}`);

    expect(res.statusCode).toEqual(204);
  });
});
