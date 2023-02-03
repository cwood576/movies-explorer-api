const helmetConfig = {
  frameguard: {
    action: 'deny',
  },
};
const corsConfig = {
  credentials: true,
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PATCH,POST,DELETE',
};
const mongoConfig = {
  useNewUrlParser: true,
};

module.exports = { helmetConfig, corsConfig, mongoConfig };
