const tableName = "table_names_test11";

module.exports = {
  createNewTableName: (db, id, name) => db(tableName).insert({ id, name, used: 0 }),
  updateCommonOpById: (db, id, common_op, used) => db(tableName).where("id", "=", id).update({ common_op, used }),
  updateUsedById: (db, id, used) => db(tableName).where("id", "=", id).update({ used }),
  getAllTableNamesThatStartsWith: (db, startsWith) => db(tableName).where("name", "like", startsWith),
  getTableByName: (db, name) =>
    db(tableName)
      .where({ name })
      .then((rows) => rows[0]),
};
