const commonOpsDB = require("../../db/common-ops");

const updateCommonOps = async (db, id, used, oldCommonOp, sqlOp) => {
  const { rows: opsRows } = await commonOpsDB.getCommonOpsById(id);
  incrementCurrentSqlOp(opsRows, sqlOp);
  let newCommonOp = calculateMostCommonOp(opsRows[0]);
  await commonOpsDB.updateCommonOpsById(id, sqlOpColumName(sqlOp), opsRows[0][sqlOp + "_op"]);
  if (newMostCommonOp(newCommonOp, oldCommonOp)) {
    await db.updateCommonOpById(id, getCommonOp(newCommonOp), used + 1);
  }
};

const newMostCommonOp = (newCommonOp, oldCommonOp) => newCommonOp.op !== oldCommonOp;

const incrementCurrentSqlOp = (opsRows, sqlOp) => (opsRows[0][sqlOp + "_op"] += 1);

const getCommonOp = (newCommonOp) => newCommonOp.op.replace("_op", "");

const sqlOpColumName = (sqlOp) => sqlOp + "_op";

const calculateMostCommonOp = (opsObject) => {
  let mostCommonOp = { used: 0, op: "" };
  for (let [op, used] of Object.entries(opsObject)) {
    if (op !== "id" && used > mostCommonOp.used) {
      mostCommonOp = { used, op };
    }
  }
  return mostCommonOp;
};

module.exports = {
  updateCommonOps,
};
