const pool = require("./db-pool");

module.exports = {
  getAllColumnNamesByTableId: (id) =>
    pool.query("SELECT * FROM column_names WHERE table_id = $1", [id]),
};
