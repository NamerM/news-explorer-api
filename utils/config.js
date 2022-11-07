const {
  MONGO_URL = 'mongodb://localhost:27017/aroundb',
  NODE_ENV,
  JWT_SECRET = 'secret-dev',
} = process.env;

module.exports = {
  MONGO_URL,
  NODE_ENV,
  JWT_SECRET,
};
