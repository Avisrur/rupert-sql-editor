module.exports = require("knex")({
  client: "pg",
  connection: {
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432,
  },
});
