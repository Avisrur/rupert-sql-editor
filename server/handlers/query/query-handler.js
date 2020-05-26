const { parseSqlStringToObject } = require("../../sql-parse/sql-parser");
const { handleTableName } = require("./tables-handler");
const { handleColumnName } = require("./columns-handler");

const handleNewQuery = async (query) => {
  const queryObject = parseSqlStringToObject(query);
  for (let [sqlOp, opValues] of Object.entries(queryObject)) {
    await handleOperationValues(sqlOp.toLowerCase(), opValues);
  }
};

const handleOperationValues = async (sqlOp, opValues) => {
  for (let opValue of opValues) {
    handleOneOperation(sqlOp, opValue);
  }
};

const handleOneOperation = async (sqlOp, opValue) => {
  const { tableName, columnName } = splitToTableAndColumnNames(opValue);
  const tableId = await handleTableName(tableName, sqlOp);
  if (columnNameExists(columnName)) {
    await handleColumnName(columnName, tableId, sqlOp);
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
