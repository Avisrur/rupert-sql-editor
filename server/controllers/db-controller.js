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
    const newTableId = uuidv4();
    await talbeNamesDB.createNewTableNameWithoutCommonOp(
      newTableId,
      req.body.tableName
    );
    await commonOpsDB.createCommonOpsByIdWithoutCommonOp(newTableId);
    for (let columnName of req.body.columns) {
      const newColumnId = uuidv4();
      await columnNamesDB.createNewColumnNameWithoutCommonOp(
        newColumnId,
        columnName,
        newTableId
      );
      await commonOpsDB.createCommonOpsByIdWithoutCommonOp(newColumnId);
    }
    res.status(201).send("Table created");
  } else {
    res.status(400).send("Table name already exists");
  }
}
