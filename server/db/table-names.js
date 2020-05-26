const pool = require("./db-pool");
const tableName = "table_names_test11";

module.exports = {
  createNewTableNameWithoutCommonOp: (table_id, table_name) =>
    pool.query("INSERT INTO " + tableName + " (id,name,used) VALUES ($1,$2,10", [
      table_id,
      table_name,
    ]),
  updateCommonOpById: (id, newCommonOp, used) =>
    pool.query("UPDATE " + tableName + " SET common_op = $1, used = $2 WHERE id = $3", [
      newCommonOp,
      used,
      id,
    ]),
  updateUsedById: (id, used) =>
    pool.query("UPDATE " + tableName + " SET used = $1 WHERE id = $2", [used, id]),
  getAllTableNamesThatStartsWith: (startsWith) =>
    pool.query("SELECT * FROM " + tableName + " WHERE name LIKE '" + startsWith + "'"),
  getTableIdByName: (name) => pool.query("SELECT * FROM " + tableName + " WHERE name = $1", [name]),
};
