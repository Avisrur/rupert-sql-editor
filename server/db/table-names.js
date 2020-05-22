const pool = require("./db-pool");

module.exports = {
  createNewTableName: (table_name, sqlOp) =>
    pool.query(
      "INSERT INTO table_names (name,common_op,used) VALUES ($1,$2,1)",
      [table_name, sqlOp]
    ),
  getAllTableNamesThatStartsWith: (startsWith) =>
    pool.query(
      "SELECT * FROM table_names WHERE name LIKE '" + startsWith + "'"
    ),
  getAllTableNames: () => pool.query("SELECT * FROM table_names"),
  getTableIdByName: (name) =>
    pool.query("SELECT id FROM table_names WHERE name = $1", [name]),
};
