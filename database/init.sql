-- Booking-Service ve Payment-Service için veritabanını kullan
\c postgres;
-- Eğer veritabanı varsa sil
-- Eğer veritabanı zaten varsa, işlemi atla
DO $$ BEGIN IF EXISTS (
  SELECT
  FROM pg_database
  WHERE datname = 'booking_db'
) THEN RAISE NOTICE 'Database booking_db already exists';
ELSE CREATE DATABASE booking_db;
END IF;
END $$ -- Veritabanına bağlan
\c booking_db;
-- Payments tablosunu oluştur
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
-- Bookings tablosunu oluştur (Foreign Key ile)
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  payment_id INT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_payment FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE
);