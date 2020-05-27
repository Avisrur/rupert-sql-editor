const commonOpsService = require("../../../services/common-ops-service");

const updateCommonOps = async (db, entityService, id, used, oldCommonOp, sqlOp) => {
  const opsRow = await commonOpsService.getCommonOpsById(db, id);
  incrementCurrentSqlOp(opsRow, sqlOp);
  let newCommonOp = calculateMostCommonOp(opsRow);
  await commonOpsService.updateCommonOpsById(db, id, sqlOpColumName(sqlOp), opsRow[sqlOp + "_op"]);
  if (newMostCommonOp(newCommonOp, oldCommonOp)) {
    await entityService.updateCommonOpById(db, id, getCommonOp(newCommonOp), used + 1);
  }
};

const newMostCommonOp = (newCommonOp, oldCommonOp) => newCommonOp.op !== oldCommonOp;

const incrementCurrentSqlOp = (opsRow, sqlOp) => (opsRow[sqlOp + "_op"] += 1);

const getCommonOp = (newCommonOp) => newCommonOp.op.replace("_op", "");

const sqlOpColumName = (sqlOp) => sqlOp + "_op";

const calculateMostCommonOp = (opsRow) => {
  let mostCommonOp = { used: 0, op: "" };
  for (let [op, used] of Object.entries(opsRow)) {
    if (op !== "id" && used > mostCommonOp.used) {
      mostCommonOp = { used, op };
    }
  }
  return mostCommonOp;
};

module.exports = {
  updateCommonOps,
};
