require('dotenv').config({ path: '../.env' });
//const JWT_SECRET = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { MONGO_URL } = require('./utils/config');
const errorHandler = require('./middleware/errorHandler');
const { logger, errorLogger } = require('./middleware/logger');
const { limiter } = require('./middleware/limiter');

const app = express();
const { PORT = 3001 } = process.env;
const { router } = require('./routes');

mongoose.connect(MONGO_URL);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use(limiter);
app.use(logger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is available  on port  ${PORT}...`);
  //console.log(JWT_SECRET);
});
