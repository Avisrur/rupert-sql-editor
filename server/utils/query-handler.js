const { parseSqlStringToObject } = require("./sql-parser.js");
const talbeNamesDB = require("../db/table-names");
const columnNamesDB = require("../db/column-names");
const commonOpsDB = require("../db/common-ops");

const handleNewQuery = (query) => {
  const queryObject = parseSqlStringToObject(query);
  for (let [sqlOp, opValue] of Object.entries(queryObject)) {
    //break down op value by dots,commas,(),saved words like avg and etc
    if (opValue.includes(".")) {
      splitedOpValue = opValue.split(".");
      const tableId = handleTableName(splitedOpValue[0], sqlOp);
      handleColumnName(splitedOpValue[1], tableId);
    } else {
      handleTableName(opValue);
    }
  }
  //parse to object
  //iterate object
  //     get column/table id
  //     if column/table doesnt exists id
  //          create new column/table
  //          create new common ops
  //     else
  //          update common ops according to table / column name
};

const handleTableName = async (tableName, sqlOp) => {
  const { rows } = await talbeNamesDB.getTableIdByName(tableName);
  if (rows.length === 0) {
    await talbeNamesDB.createNewTableName(tableName, sqlOp);
    const { rows: newRows } = await talbeNamesDB.getTableIdByName(tableName);
    await commonOpsDB.createCommonOpsById(newRows[0].id, sqlOp + "_op");
  } else {
    //UPDATE - NEED TO CONTINUE!
    const { rows: opsRows } = await commonOpsDB.getCommonOpsById(rows[0].id);
    console.log("OPS ROWS BEFORE CHANGE", opsRows);
    opsRows[0][sqlOp + "_op"] += 1;
    console.log("OPS ROWS AFTER CHANGE", opsRows);
    let max = Object.entries(obj).sort((prev, next) => next - prev)[0]; // WORK IN PROGRESS
  }
};

const handleColumnName = (columnName, tableId) => {};

module.exports = { handleNewQuery };
