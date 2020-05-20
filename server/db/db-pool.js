const Pool = require("pg").Pool;
module.exports = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});
