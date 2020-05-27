const tableName = "user_interactions11";

module.exports = {
  createNewUserInteraction: (db, id, { curQueryString: cur_query, curSqlClause: sql_op, suggestion }, query_id) =>
    db(tableName).insert({ id, cur_query, sql_op, suggestion, query_id }),
};
