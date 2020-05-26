const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const talbeNamesDB = require("../db/table-names");
const columnNamesDB = require("../db/column-names");
const commonOpsDB = require("../db/common-ops");

router.post("/createTable", createTable);

module.exports = router;

async function createTable(req, res, next) {
  const { rows } = await talbeNamesDB.getTableIdByName(req.body.tableName);
  if (rows.length === 0) {
    await createNewTable(req.body.tableName, req.body.columns);
    res.status(201).send("Table created");
  } else {
    res.status(400).send("Table name already exists");
  }
}

const createNewTable = async (tableName, columns) => {
  const newTableId = uuidv4();
  await talbeNamesDB.createNewTableName(newTableId, tableName);
  await commonOpsDB.createCommonOpsById(newTableId);
  await createColumns(columns);
};

const createColumns = async (columns) => {
  for (let columnName of columns) {
    const newColumnId = uuidv4();
    await columnNamesDB.createNewColumnName(newColumnId, columnName, newTableId);
    await commonOpsDB.createCommonOpsById(newColumnId);
  }
};
