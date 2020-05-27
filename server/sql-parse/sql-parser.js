const { getOperationValue } = require("./operations-parser");

const parseSqlStringToObject = (queryString) => {
  queryString = queryString.toLowerCase();
  const splitedQuery = queryString.split(/\n| /);
  let queryObject = {
    select: getOperationValue(splitedQuery, "select", "from"),
    from: getOperationValue(splitedQuery, "from", "join", "where"),
    join: getOperationValue(splitedQuery, "join", "on"),
    on: getOperationValue(splitedQuery, "on", "where", "group"),
    where: getOperationValue(splitedQuery, "where", "group"),
    groupBy: getOperationValue(splitedQuery, "by"),
  };
  return queryObject;
};

const parseSqlObjectToString = (queryObject) => {
  let queryString = "";
  for (let [key, value] of Object.entries(queryObject)) {
    queryString += concatQueryStringBy(key, value);
  }
  return queryString;
};

const concatQueryStringBy = (key, value) => {
  if (value === "") return "";
  return key !== "select" ? "\n" + key + " " + value : key + " " + value;
};

module.exports = {
  parseSqlStringToObject,
  parseSqlObjectToString,
};
