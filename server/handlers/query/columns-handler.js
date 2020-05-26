const columnNamesDB = require("../../db/column-names");
const { handleEntityCommonOp } = require("./common");

const handleColumnName = async (columnName, tableId, sqlOp) => {
  const { rows: columnNameRows } = await columnNamesDB.getColumnByNameAndId(columnName, tableId);
  let { id, used, common_op: commonOp } = columnNameRows[0];
  await handleEntityCommonOp(columnNamesDB, id, used, commonOp, sqlOp, ["from", "join"]);
  return Promise.resolve("");
};

module.exports = {
  handleColumnName,
};
