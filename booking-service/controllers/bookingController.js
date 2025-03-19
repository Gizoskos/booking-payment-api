const { pool } = require("../models/bookingModel");

exports.createBooking = async (req, res) => {
  const { name, date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO bookings (name, date) VALUES ($1, $2) RETURNING *",
      [name, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
