const pool = require("./db-pool");
const tableName = "column_names_test11";

module.exports = {
  createNewColumnName: (column_id, column_name, table_id, sqlOp) =>
    pool.query(
      "INSERT INTO " +
        tableName +
        " (id,name,table_id,common_op,used) VALUES ($1,$2,$3,$4,1)",
      [column_id, column_name, table_id, sqlOp]
    ),
  createNewColumnNameWithoutCommonOp: (column_id, column_name, table_id) =>
    pool.query(
      "INSERT INTO " +
        tableName +
        " (id,name,table_id,used) VALUES ($1,$2,$3,1)",
      [column_id, column_name, table_id]
    ),
  updateUsedById: (id, used) =>
    pool.query("UPDATE " + tableName + " SET used = $1 WHERE id = $2", [
      used,
      id,
    ]),
  updateCommonOpById: (id, newCommonOp, used) =>
    pool.query(
      "UPDATE " + tableName + " SET common_op = $1, used = $2 WHERE id = $3",
      [newCommonOp, used, id]
    ),
  getColumnByNameAndId: (column_name, table_id) =>
    pool.query(
      "SELECT * FROM " + tableName + " WHERE name = $1 AND table_id = $2",
      [column_name, table_id]
    ),
  getAllColumnNamesByTableId: (id) =>
    pool.query("SELECT * FROM " + tableName + " WHERE table_id = $1", [id]),
};
