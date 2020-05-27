const ParserFactory = require("./sql-parsing-types/parser-factory");

const getOperationValue = (splitedQuery, fromSqlClause, toSqlClause = null, toSecondSqlClause = null) => {
  if (splitedQuery.includes(fromSqlClause)) {
    let operationValue = getOperationValueBetweenGivenSqlClause(
      splitedQuery,
      fromSqlClause,
      toSqlClause,
      toSecondSqlClause
    );
    operationValue = operationValue.join(" ");
    return parseOperationBySqlClauseType(fromSqlClause, operationValue);
  }
  return [];
};

const parseOperationBySqlClauseType = (sqlClauseType, operationValue) => {
  return new ParserFactory().getParserByType(sqlClauseType).parse(operationValue);
};

const getOperationValueBetweenGivenSqlClause = (splitedQuery, fromSqlClause, toSqlClause, toSecondSqlClause) => {
  let operationValue = "";
  if (splitedQuery.includes(toSqlClause)) {
    operationValue = sliceSplitedQueryFromTo(splitedQuery, fromSqlClause, toSqlClause);
  } else if (splitedQuery.includes(toSecondSqlClause)) {
    operationValue = sliceSplitedQueryFromTo(splitedQuery, fromSqlClause, toSecondSqlClause);
  } else {
    operationValue = sliceSplitedQueryFromTo(splitedQuery, fromSqlClause, null);
  }
  return operationValue;
};

const sliceSplitedQueryFromTo = (splitedQuery, fromSqlClause, toSqlClause) => {
  if (toSqlClause !== null) {
    return splitedQuery.slice(splitedQuery.indexOf(fromSqlClause) + 1, splitedQuery.indexOf(toSqlClause));
  }
  return splitedQuery.slice(splitedQuery.indexOf(fromSqlClause) + 1);
};

module.exports = {
  getOperationValue,
};
