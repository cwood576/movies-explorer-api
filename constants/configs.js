const helmetConfig = {
  frameguard: {
    action: 'deny',
  },
};
const corsConfig = {
  credentials: true,
  origin: 'https://cw576.nomoredomainsclub.ru http://localhost:3000',
  methods: 'GET,HEAD,PATCH,POST,DELETE',
};
const mongoConfig = {
  options: {
    useNewUrlParser: true,
  },
  devServer: 'mongodb://localhost:27017/bitfilmsdbdev',
};

module.exports = { helmetConfig, corsConfig, mongoConfig };
