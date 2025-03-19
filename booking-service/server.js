const express = require('express');
const app = express();
const bookingRoutes = require('./routes/bookingRoutes');

app.use(express.json()); // JSON verileri almak için
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Booking Service is working: ${PORT}`));
