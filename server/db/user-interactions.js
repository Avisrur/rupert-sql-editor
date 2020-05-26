const pool = require("./db-pool");
const tableName = "user_interactions11";

module.exports = {
  createNewUserInteraction: (id, interaction, queryId) =>
    pool.query(
      "INSERT INTO " +
        tableName +
        " (id,cur_query,sql_op,suggestion,query_id) VALUES ($1,$2,$3,$4,$5)",
      [
        id,
        interaction.curQueryString,
        interaction.curSqlClause,
        interaction.suggestion,
        queryId,
      ]
    ),
};
