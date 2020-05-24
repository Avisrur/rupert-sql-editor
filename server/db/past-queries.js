const pool = require("./db-pool");
const tableName = "past_queries_test";

module.exports = {
  saveNewQuery: (query) =>
    pool.query("INSERT INTO " + tableName + " (query,used) VALUES ($1,1)", [
      query,
    ]),
  getQuery: (query) =>
    pool.query("SELECT * FROM " + tableName + " WHERE query = $1", [query]),
  updateQuery: (query, used) =>
    pool.query("UPDATE " + tableName + " SET used = $1 WHERE query = $2", [
      used,
      query,
    ]),
  deleteQueryByQuery: (query) =>
    pool.query("DELETE FROM " + tableName + " WHERE query = $1", [query]),
  deleteQueryById: (id) =>
    pool.query("DELETE FROM " + tableName + " WHERE id = $1", [id]),
};
