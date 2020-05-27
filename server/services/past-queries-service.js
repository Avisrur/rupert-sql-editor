const tableName = "past_queries_test11";

module.exports = {
  saveNewQuery: (db, id, query) => db(tableName).insert({ id, query }),
};
