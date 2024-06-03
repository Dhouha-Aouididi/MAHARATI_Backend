// services/user.controller.js

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, email, username, address, phone, profile_image
    FROM Users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getById(id) {
  const [user] = await db.query('SELECT * FROM Users WHERE id = ?', [id]);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

async function create(user) {
  if (!user || !user.email || !user.password || !user.username || !user.address || !user.phone || !user.profile_image) {
    throw new Error("Missing required fields for user creation");
  }

  const result = await db.query(
    `INSERT INTO Users 
    (email, password, username, address, phone, profile_image) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`,
    [user.email, user.password, user.username, user.address, user.phone, user.profile_image]
  );

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return { message };
}

async function update(id, user) {
  const values = [
    user.email || null,
    user.username || null,
    user.address || null,
    user.phone || null,
    user.profile_image || null,
    id
  ];

  const result = await db.query(
    `UPDATE Users 
    SET email=?, username=?, address=?, phone=?, profile_image=?
    WHERE id=?`,
    values
  );

  let message = "Error in updating user";

  if (result.affectedRows) {
    message = "User updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM Users WHERE id=?`,
    [id]
  );

  let message = "Error in deleting user";

  if (result.affectedRows) {
    message = "User deleted successfully";
  }

  return { message };
}

async function getUsernameById(userId) {
  const rows = await db.query(
    `SELECT username FROM Users WHERE id = ?`,
    [userId]
  );

  return helper.emptyOrRows(rows);
}

module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
  getUsernameById
};
