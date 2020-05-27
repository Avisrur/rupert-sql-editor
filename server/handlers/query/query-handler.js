const { parseSqlStringToObject } = require("../../sql-parse/sql-parser");
const { handleTableName } = require("./entities/tables-handler");
const { handleColumnName } = require("./entities/columns-handler");

const handleNewQuery = async (db, query) => {
  const queryObject = parseSqlStringToObject(query);
  for (let [sqlOp, opValues] of Object.entries(queryObject)) {
    await handleOperationValues(db, sqlOp.toLowerCase(), opValues);
  }
};

const handleOperationValues = async (db, sqlOp, opValues) => {
  for (let opValue of opValues) {
    handleOneOperation(db, sqlOp, opValue);
  }
};

const handleOneOperation = async (db, sqlOp, opValue) => {
  const { tableName, columnName } = splitToTableAndColumnNames(opValue);
  const tableId = await handleTableName(db, tableName, sqlOp);
  if (columnNameExists(columnName)) {
    await handleColumnName(db, columnName, tableId, sqlOp);
  }
};

const columnNameExists = (columnName) => columnName !== undefined && columnName !== "";

const splitToTableAndColumnNames = (opValue) => {
  return {
    tableName: opValue.split(".")[0],
    columnName: opValue.split(".")[1],
  };
};

module.exports = { handleNewQuery };
