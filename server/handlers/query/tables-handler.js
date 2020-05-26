const talbeNamesDB = require("../../db/table-names");
const { handleEntityCommonOp } = require("./common");

const handleTableName = async (tableName, sqlOp) => {
  const { rows: tableNameRows } = await talbeNamesDB.getTableIdByName(tableName);
  let { id, used, common_op: commonOp } = tableNameRows[0];
  await handleEntityCommonOp(talbeNamesDB, id, used, commonOp, sqlOp, ["select", "where"]);
  return Promise.resolve(id);
};

module.exports = {
  handleTableName,
};
