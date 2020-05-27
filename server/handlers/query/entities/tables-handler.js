const talbeNamesDB = require("../../../services/table-names-service");
const { handleEntityCommonOp } = require("./common");

const handleTableName = async (db, tableName, sqlOp) => {
  let { id, used, common_op: commonOp } = await talbeNamesDB.getTableByName(db, tableName);
  await handleEntityCommonOp(db, talbeNamesDB, id, used, commonOp, sqlOp, ["select", "where"]);
  return Promise.resolve(id);
};

module.exports = {
  handleTableName,
};
