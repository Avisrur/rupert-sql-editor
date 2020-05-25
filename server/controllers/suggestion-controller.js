const express = require("express");
const router = express.Router();
const talbeNamesDB = require("../db/table-names");
const columnNamesDB = require("../db/column-names");

router.post("/tableNames", tableNames);
router.post("/tableNamesStartsWith", tableNamesStartsWith);
router.post("/columnNames", columnNames);

module.exports = router;

async function tableNames(req, res, next) {
  const { rows } = await talbeNamesDB.getAllTableNames();
  res.json(rows);
}

async function tableNamesStartsWith(req, res, next) {
  const { rows } = await talbeNamesDB.getAllTableNamesThatStartsWith(
    req.body.startsWith + "%"
  );
  res.json(rows);
}

async function columnNames(req, res, next) {
  const { rows } = await talbeNamesDB.getTableIdByName(req.body.table_name);
  if (rows.length !== 0) {
    const {
      rows: column_rows,
    } = await columnNamesDB.getAllColumnNamesByTableId(rows[0].id);
    res.json(column_rows);
  }
  res.json([]);
}
