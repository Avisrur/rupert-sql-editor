const express = require("express");
const router = express.Router();
const talbeNamesService = require("../services/table-names-service");
const columnNamesService = require("../services/column-names-service");
const { getDB } = require("../utils/getter");

router.post("/tableNamesStartsWith", tableNamesStartsWith);
router.post("/columnNames", columnNames);

module.exports = router;

async function tableNamesStartsWith(req, res, next) {
  const rows = await talbeNamesService.getAllTableNamesThatStartsWith(getDB(req), req.body.startsWith + "%");
  res.json(rows);
}

async function columnNames(req, res, next) {
  const tableNameRow = await talbeNamesService.getTableByName(getDB(req), req.body.table_name);
  if (tableNameRow != undefined) {
    const columnRows = await columnNamesService.getAllColumnNamesByTableId(getDB(req), tableNameRow.id);
    res.json(columnRows);
  } else {
    res.json([]);
  }
}
