const pool = require("./db-pool");

module.exports = {
  saveNewQuery: (query) =>
    pool.query("INSERT INTO past_queries_test (query,used) VALUES ($1,1)", [
      query,
    ]),
  getQuery: (query) =>
    pool.query("SELECT * FROM past_queries_test WHERE query = $1", [query]),
  updateQuery: (query, used) =>
    pool.query("UPDATE past_queries_test SET used = $1 WHERE query = $2", [
      used,
      query,
    ]),
  deleteQueryByQuery: (query) =>
    pool.query("DELETE FROM past_queries_test WHERE query = $1", [query]),
  deleteQueryById: (id) =>
    pool.query("DELETE FROM past_queries_test WHERE id = $1", [id]),
};
