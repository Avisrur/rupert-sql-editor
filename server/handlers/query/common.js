const { updateCommonOps } = require("./common-ops-handler");

const handleEntityCommonOp = async (db, id, used, commonOp, sqlOp, sqlOpsNotToUpdateList) => {
  if (!sqlOpsNotToUpdateList.includes(sqlOp)) {
    await updateCommonOps(db, id, used, commonOp, sqlOp);
  } else {
    await db.updateUsedById(id, used + 1);
  }
};

module.exports = {
  handleEntityCommonOp,
};
