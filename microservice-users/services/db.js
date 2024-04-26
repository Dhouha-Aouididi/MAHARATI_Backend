const mysql = require("mysql2/promise");
const config = require("../config");

// Create a connection pool
const pool = mysql.createPool(config.db);

// Function to execute queries
async function query(sql, params) {
  // Get a connection from the pool
  const connection = await pool.getConnection();

  try {
    // Execute the query
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    throw error;
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}

module.exports = {
  query,
};
