const express = require('express');
const router = express.Router();

// Database bağlantısı için
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'postgres-service',
    database: 'booking_db',
    password: '12345678',
    port: 5432,
});

// GET: Test için
router.get('/', (req, res) => {
    res.send('Booking Service API is working!');
});

// POST: Yeni booking ekle
router.post('/', async (req, res) => {
    const { user_id, payment_id } = req.body;

    if (!user_id || !payment_id) {
        return res.status(400).json({ error: 'user_id ve payment_id zorunludur.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO bookings (user_id, payment_id) VALUES ($1, $2) RETURNING *',
            [user_id, payment_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Database hatası:', error);
        res.status(500).json({ error: 'Veritabanına ekleme yapılamadı.' });
    }
});

module.exports = router;
