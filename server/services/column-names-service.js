const tableName = "column_names_test11";

module.exports = {
  createNewColumnName: (db, id, name, table_id) => db(tableName).insert({ id, name, table_id, used: 0 }),
  updateUsedById: (db, id, used) => db(tableName).where("id", "=", id).update({ used }),
  updateCommonOpById: (db, id, common_op, used) => db(tableName).where("id", "=", id).update({ used, common_op }),
  getColumnByNameAndId: (db, name, table_id) =>
    db(tableName)
      .where({ name, table_id })
      .then((rows) => rows[0]),
  getAllColumnNamesByTableId: (db, table_id) => db(tableName).where({ table_id }),
};
