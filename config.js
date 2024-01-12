const logAdmin = {
  login: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD,
};

const config = {
  db: process.env.DB_URI,
  keySession: [process.env.KEY_SESSION],
  maxAgeSession: parseInt(process.env.MAX_AGE_SESSION),
};

module.exports = {
  logAdmin,
  config,
};
