module.exports = {
  jwt: {
    secret: process.env.JWT_AUTH_SECRET || "development secret",
    expire: "1d",
  },
};
