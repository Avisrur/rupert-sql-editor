const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const talbeNamesService = require("../services/table-names-service");
const columnNamesService = require("../services/column-names-service");
const commonOpsService = require("../services/common-ops-service");
const { getDB } = require("../utils/getter");

router.post("/createTable", createTable);

module.exports = router;

async function createTable(req, res, next) {
  const db = getDB(req);
  const tableNameRow = await talbeNamesService.getTableByName(db, req.body.tableName);
  if (tableNameRow === undefined) {
    await createNewTable(db, req.body.tableName, req.body.columns);
    res.status(201).send("Table created");
  } else {
    res.status(400).send("Table name already exists");
  }
}

const createNewTable = async (db, tableName, columns) => {
  const newTableId = uuidv4();
  await talbeNamesService.createNewTableName(db, newTableId, tableName);
  await commonOpsService.createCommonOpsById(db, newTableId);
  await createColumns(db, columns);
};

const createColumns = async (db, columns) => {
  for (let columnName of columns) {
    const newColumnId = uuidv4();
    await columnNamesService.createNewColumnName(db, newColumnId, columnName, newTableId);
    await commonOpsService.createCommonOpsById(db, newColumnId);
  }
};
