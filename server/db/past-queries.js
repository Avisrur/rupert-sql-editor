const pool = require("./db-pool");

module.exports = {
  saveQuery: (query, used) =>
    pool.query("INSERT INTO past_queries_test (query,used) VALUES ($1)", [
      query,
      used,
    ]),
  getQuery: (query) =>
    pool.query("SELECT * FROM past_queries_test WHERE query = $1", [query]),
  updateQuery: (query, used) =>
    pool.query("UPDATE past_queries_test SET used = $1 WHERE query = $2", [
      used,
      query,
    ]),
};
