require('dotenv').config();
const sequelize = require('./config/database');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Research Data API running'
  });
});

const PORT = process.env.PORT || 5000;

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
  });

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});