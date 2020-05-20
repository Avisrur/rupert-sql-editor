const express = require("express");
const router = express.Router();
const talbeNamesDB = require("../db/table-names");
const columnNamesDB = require("../db/column-names");

router.post("/tableNames", tableNames);
router.post("/columnNames", columnNames);

module.exports = router;

async function tableNames(req, res, next) {
  console.log(req.body);
  const { rows } = await talbeNamesDB.getAllTableNames();
  res.json(rows);
}

async function columnNames(req, res, next) {
  console.log(req.body.table_name);
  const { rows } = await talbeNamesDB.getTableIdByName(req.body.table_name);
  console.log(rows[0].id);
  const { rows: column_rows } = await columnNamesDB.getAllColumnNamesByTableId(
    rows[0].id
  );
  console.log(column_rows);
  res.json(column_rows);
}
