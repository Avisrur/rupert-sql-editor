const columnNamesService = require("../../../services/column-names-service");
const { handleEntityCommonOp } = require("./common");

const handleColumnName = async (db, columnName, tableId, sqlOp) => {
  let { id, used, common_op: commonOp } = await columnNamesService.getColumnByNameAndId(db, columnName, tableId);
  await handleEntityCommonOp(db, columnNamesService, id, used, commonOp, sqlOp, ["from", "join"]);
  return Promise.resolve("");
};

module.exports = {
  handleColumnName,
};
