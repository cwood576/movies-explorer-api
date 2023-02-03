const helmetConfig = {
  frameguard: {
    action: 'deny',
  },
};
const corsConfig = {
  credentials: true,
  origin: 'https://cw576.nomoredomainsclub.ru',
  methods: 'GET,HEAD,PATCH,POST,DELETE',
};
const mongoConfig = {
  useNewUrlParser: true,
};

module.exports = { helmetConfig, corsConfig, mongoConfig };
