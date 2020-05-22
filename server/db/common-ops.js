const pool = require("./db-pool");

module.exports = {
  createCommonOpsById: (id, operation_name) =>
    pool.query("INSERT INTO common_ops_test (id,$1) VALUES ($2,1)", [
      operation_name,
      id,
    ]),
  getCommonOpsById: (id) =>
    pool.query("SELECT * FROM common_ops_test WHERE id = $1", [id]),
  updateCommonOpsById: (id, operation_name, used) =>
    pool.query("UPDATE past_queries_test SET $1 = $2 WHERE id = $3", [
      operation_name,
      used,
      id,
    ]),
};
