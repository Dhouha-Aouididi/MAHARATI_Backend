const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, user_id, service_id, date, status
    FROM Bookings LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getById(bookingId) {
  const rows = await db.query(
    `SELECT 
    id, user_id, service_id, date, status 
    FROM Bookings WHERE booking_id = ?`,
    [bookingId]
  );

  return helper.emptyOrRows(rows);
}

async function create(booking) {
  const result = await db.query(
    `INSERT INTO Bookings 
    (user_id, service_id, date, status) 
    VALUES 
    (?, ?, ?, ?)`,
    [booking.user_id, booking.service_id, booking.date, booking.status]
  );

  let message = "Error in creating booking";

  if (result.affectedRows) {
    message = "Booking created successfully";
  }

  return { message };
}

async function update(id, booking) {
  const result = await db.query(
    `UPDATE Bookings 
    SET user_id=?, service_id=?, date=?, status=?
    WHERE booking_id=?`,
    [booking.user_id, booking.service_id, booking.date, booking.status, id]
  );

  let message = "Error in updating booking";

  if (result.affectedRows) {
    message = "Booking updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM Bookings WHERE id=${id}`
  );

  let message = "Error in deleting booking";

  if (result.affectedRows) {
    message = "Booking deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
};
