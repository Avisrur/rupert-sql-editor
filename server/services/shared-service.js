module.exports = {
  updateUsedById: (db, tableName, id, used) => db(tableName).where("id", "=", id).update({ used }),
  updateCommonOpById: (db, tableName, id, common_op, used) =>
    db(tableName).where("id", "=", id).update({ used, common_op }),
};
