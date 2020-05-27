const { updateCommonOps } = require("./common-ops-handler");
const sharedService = require("../../../services/shared-service");

const handleEntityCommonOp = async (db, tableName, { id, used, common_op: commonOp }, sqlOp, sqlOpsNotToUpdateList) => {
  if (!sqlOpsNotToUpdateList.includes(sqlOp)) {
    await updateCommonOps(db, tableName, id, used, commonOp, sqlOp);
  } else {
    await sharedService.updateUsedById(db, tableName, id, used + 1);
  }
};

module.exports = {
  handleEntityCommonOp,
};
