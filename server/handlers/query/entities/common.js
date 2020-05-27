const { updateCommonOps } = require("./common-ops-handler");

const handleEntityCommonOp = async (db, entityService, id, used, commonOp, sqlOp, sqlOpsNotToUpdateList) => {
  if (!sqlOpsNotToUpdateList.includes(sqlOp)) {
    await updateCommonOps(db, entityService, id, used, commonOp, sqlOp);
  } else {
    await entityService.updateUsedById(db, id, used + 1);
  }
};

module.exports = {
  handleEntityCommonOp,
};
