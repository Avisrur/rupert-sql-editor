const pool = require("./db-pool");
const tableName = "common_ops_test11";

module.exports = {
  createCommonOpsById: (id, operation_name) =>
    pool.query("INSERT INTO " + tableName + " (id,$1) VALUES ($2,1)", [
      operation_name,
      id,
    ]),
  createCommonOpsByIdWithoutCommonOp: (id) =>
    pool.query("INSERT INTO " + tableName + " (id) VALUES ($1)", [id]),
  getCommonOpsById: (id) =>
    pool.query("SELECT * FROM " + tableName + " WHERE id = $1", [id]),
  updateCommonOpById: (id, newCommonOp, used) =>
    pool.query(
      "UPDATE " + tableName + " SET common_op = $1, used = $2 WHERE id = $3",
      [newCommonOp, used, id]
    ),
  updateUsedById: (id, used) =>
    pool.query("UPDATE " + tableName + " SET used = $1 WHERE id = $2", [
      used,
      id,
    ]),
  updateCommonOpsById: (id, operation_name, used) =>
    pool.query(
      "UPDATE " + tableName + " SET " + operation_name + " = $1 WHERE id = $2",
      [used, id]
    ),
};
