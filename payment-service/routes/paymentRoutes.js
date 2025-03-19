const express = require('express');
const router = express.Router();

// Database bağlantısı için
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'postgres-service',
  database: 'booking_db',
  password: '12345678',
  port: 5431,
});

// GET: Test için
router.get('/', (req, res) => {
  res.send('Payment Service API is working!');
});

// POST: Yeni payment ekle
router.post('/', async (req, res) => {
  const { user_id, amount } = req.body;

  if (!user_id || !amount) {
    return res.status(400).json({ error: 'user_id ve amount zorunludur.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO payments (user_id, amount) VALUES ($1, $2) RETURNING *',
      [user_id, amount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Database hatası:', error);
    res.status(500).json({ error: 'Veritabanına ekleme yapılamadı.' });
  }
});

module.exports = router;
