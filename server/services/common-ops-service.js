const tableName = "common_ops_test11";

module.exports = {
  createCommonOpsByIdWithoutCommonOp: (db, id) => db(tableName).insert({ id }),
  getCommonOpsById: (db, id) =>
    db(tableName)
      .where({ id })
      .then((rows) => rows[0]),
  updateCommonOpsById: (db, id, operation_name, used) =>
    db(tableName).where("id", "=", id).update(operation_name, used),
};
