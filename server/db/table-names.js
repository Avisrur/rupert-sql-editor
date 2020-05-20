const pool = require("./db-pool");

module.exports = {
  getAllTableNamesThatStartsWith: (startsWith) =>
    pool.query(
      "SELECT * FROM table_names WHERE name LIKE '" + startsWith + "'"
    ),
  getAllTableNames: () => pool.query("SELECT * FROM table_names"),
  getTableIdByName: (name) =>
    pool.query("SELECT id FROM table_names WHERE name = $1", [name]),
};
