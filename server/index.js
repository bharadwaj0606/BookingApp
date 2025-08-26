const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Route imports
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');
const providerRoutes = require('./routes/provider.routes.js');
const appointmentRoutes = require('./routes/appointment.routes.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
