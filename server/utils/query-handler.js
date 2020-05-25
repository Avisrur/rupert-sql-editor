const { parseSqlStringToObject } = require("./sql-parser.js");

const talbeNamesDB = require("../db/table-names");
const columnNamesDB = require("../db/column-names");
const commonOpsDB = require("../db/common-ops");

const handleNewQuery = async (query) => {
  const queryObject = parseSqlStringToObject(query);
  console.log("OBJECT AFTER ", queryObject);
  for (let [sqlOp, opValues] of Object.entries(queryObject)) {
    //break down op value by dots,commas,(),saved words like avg and etc
    for (let opValue of opValues) {
      if (opValue.includes(".")) {
        splitedOpValue = opValue.split(".");
        const tableId = await handleTableName(
          splitedOpValue[0],
          sqlOp.toLowerCase()
        );
        await handleColumnName(splitedOpValue[1], tableId, sqlOp.toLowerCase());
      } else {
        await handleTableName(opValue, sqlOp.toLowerCase());
      }
    }
  }
};

const handleTableName = async (tableName, sqlOp) => {
  const { rows: tableNameRows } = await talbeNamesDB.getTableIdByName(
    tableName
  );
  if (sqlOp !== "select" && sqlOp !== "where") {
    const { rows: opsRows } = await commonOpsDB.getCommonOpsById(
      tableNameRows[0].id
    ); // get ops of table for updating it
    opsRows[0][sqlOp + "_op"] += 1;
    let mostCommonOp = calculateMostCommonOp(opsRows[0]);
    await commonOpsDB.updateCommonOpsById(
      tableNameRows[0].id,
      sqlOp + "_op",
      opsRows[0][sqlOp + "_op"]
    ); // update common ops
    if (mostCommonOp.op !== tableNameRows[0].common_op) {
      // update table name for new most common op
      await talbeNamesDB.updateCommonOpById(
        tableNameRows[0].id,
        mostCommonOp.op.replace("_op", ""),
        tableNameRows[0].used + 1
      );
    }
  } else {
    await talbeNamesDB.updateUsedById(
      tableNameRows[0].id,
      tableNameRows[0].used + 1
    );
  }
  return Promise.resolve(tableNameRows[0].id);
};

const handleColumnName = async (columnName, tableId, sqlOp) => {
  console.log(columnName);
  const { rows: columnNameRows } = await columnNamesDB.getColumnByNameAndId(
    columnName,
    tableId
  );
  console.log(columnNameRows);
  if (sqlOp !== "from" && sqlOp !== "join") {
    const { rows: opsRows } = await commonOpsDB.getCommonOpsById(
      columnNameRows[0].id
    ); // get ops of table for updating it
    opsRows[0][sqlOp + "_op"] += 1;
    let mostCommonOp = calculateMostCommonOp(opsRows[0]);
    await commonOpsDB.updateCommonOpsById(
      columnNameRows[0].id,
      sqlOp + "_op",
      opsRows[0][sqlOp + "_op"]
    ); // update common ops
    if (mostCommonOp.op !== columnNameRows[0].common_op) {
      // update table name for new most common op
      await columnNamesDB.updateCommonOpById(
        columnNameRows[0].id,
        mostCommonOp.op.replace("_op", ""),
        columnNameRows[0].used + 1
      );
    }
  } else {
    await columnNamesDB.updateUsedById(
      columnNameRows[0].id,
      columnNameRows[0].used + 1
    );
  }
  return Promise.resolve("");
};

const calculateMostCommonOp = (opsObject) => {
  let mostCommonOp = { used: 0, op: "" };
  for (let [op, used] of Object.entries(opsObject)) {
    if (op !== "id") {
      if (used > mostCommonOp.used) {
        mostCommonOp = { used, op };
      }
    }
  }
  return mostCommonOp;
};

module.exports = { handleNewQuery };
