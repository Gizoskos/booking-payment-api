-- Create database if it doesn't exist
DO $$ BEGIN IF NOT EXISTS (
  SELECT
  FROM pg_database
  WHERE datname = 'booking_db'
) THEN PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE booking_db');
END IF;
END $$;
-- Connect to the 'booking_db' database (Note: you can't use \c in scripts)
\ c booking_db;
-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
-- Create bookings table with foreign key reference
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  payment_id INT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_payment FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE CASCADE
);