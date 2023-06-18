// Update with your config settings.

const path = require("path");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      // eslint-disable-next-line no-undef
      filename: path.resolve(__dirname, "src", "database", "data.db"),
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(
        // eslint-disable-next-line no-undef
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  },
  staging: {
    client: "sqlite3",
    connection: {
      // eslint-disable-next-line no-undef
      filename: path.resolve(__dirname, "src", "database", "data.db"),
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(
        // eslint-disable-next-line no-undef
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  },
  production: {
    client: "sqlite3",
    connection: {
      // eslint-disable-next-line no-undef
      filename: path.resolve(__dirname, "src", "database", "data.db"),
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(
        // eslint-disable-next-line no-undef
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  },
};
