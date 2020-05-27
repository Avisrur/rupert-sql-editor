const columnNamesService = require("../../../services/column-names-service");
const { handleEntityCommonOp } = require("./shared-handler");

const handleColumnName = async (db, columnName, tableId, sqlOp) => {
  let columnNameRow = await columnNamesService.getColumnByNameAndId(db, columnName, tableId);
  await handleEntityCommonOp(db, columnNamesService.tableName, columnNameRow, sqlOp, ["from", "join"]);
  return Promise.resolve("");
};

module.exports = {
  handleColumnName,
};
