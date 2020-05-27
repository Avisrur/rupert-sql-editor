const tableNamesService = require("../../../services/table-names-service");
const { handleEntityCommonOp } = require("./shared-handler");

const handleTableName = async (db, tableName, sqlOp) => {
  let tableNameRow = await tableNamesService.getTableByName(db, tableName);
  await handleEntityCommonOp(db, tableNamesService.tableName, tableNameRow, sqlOp, ["select", "where"]);
  return Promise.resolve(tableNameRow.id);
};

module.exports = {
  handleTableName,
};
