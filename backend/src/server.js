require('dotenv').config();

const express = require('express');

const cors = require('cors');

const helmet = require('helmet');

const morgan = require('morgan');

const path = require('path');

const sequelize =
  require('./config/database');

const User =
  require('./models/User');

const Dataset =
  require('./models/Dataset');

const authRoutes =
  require('./routes/authRoutes');

const uploadRoutes =
  require('./routes/uploadRoutes');

const datasetRoutes =
  require('./routes/datasetRoutes');

  const dashboardRoutes =
  require('./routes/dashboardRoutes');

  const settingsRoutes =
  require('./routes/settingsRoutes');

  const Project =
  require('./models/Project');

const projectRoutes =
  require('./routes/projectRoutes');

  const commentRoutes =
  require('./routes/commentRoutes');

const forumRoutes =
  require('./routes/forumRoutes');

  const userRoutes =
  require('./routes/userRoutes');

console.log(
  'DATASET ROUTES LOADED'
);

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {

  res.json({
    success: true,
    message:
      'Research Data API running'
  });
});

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/uploads',
  uploadRoutes
);

app.use(
  '/api/datasets',
  datasetRoutes
);

app.use(
  '/uploads',

  express.static(
    path.join(
      __dirname,
      '../uploads'
    )
  )
);

app.use(
  '/api/dashboard',
  dashboardRoutes
);

app.use(
  '/api/settings',
  settingsRoutes
);

app.use(
  '/api/projects',
  projectRoutes
);

app.use(
  '/api/comments',
  commentRoutes
);

app.use(
  '/api/forum',
  forumRoutes
);

app.use(
  '/api/users',
  userRoutes
);

app.use(
  '/api/search',
  require('./routes/searchRoutes')
);

const PORT =
  process.env.PORT || 5000;

sequelize.authenticate()

  .then(() => {

    console.log(
      'Database connected'
    );
  })

  .catch((err) => {

    console.error(
      'Database connection error:',
      err
    );
  });

sequelize.sync({ alter: true })

  .then(() => {

    console.log(
      'Database synced'
    );
  });

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});