const express = require('express');
const app = express();
const paymentRoutes = require('./routes/paymentRoutes');

app.use(express.json()); // JSON verileri almak için
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Payment Service is working: ${PORT}`));
