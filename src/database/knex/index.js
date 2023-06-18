const knexConfig = require("../../../knexfile");

const knex = require("knex");

const connection = knex(knexConfig.development);

module.exports = connection;
