const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const chargingStations = require('./Routes/chargingStations'); // or ProductRouter
require('dotenv').config();
require('./models/db'); // connect MongoDB

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); // Instead of bodyParser.json()

// Health check
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Routes
app.use('/auth', AuthRouter);
app.use('/stations', chargingStations);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
