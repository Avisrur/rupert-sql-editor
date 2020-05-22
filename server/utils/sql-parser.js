const parseSqlStringToObject = (queryString) => {
  queryString = queryString.toLowerCase();
  const splitedQuery = queryString.split(/\n| /);
  let queryObject = {
    select: updateValue(splitedQuery, "select", "from"),
    from: updateValue(splitedQuery, "from", "join", "where"),
    join: updateValue(splitedQuery, "join", "on"),
    on: updateValue(splitedQuery, "on", "where"),
    where: updateValue(splitedQuery, "where", "group"),
    groupBy: updateGroupByValue(splitedQuery),
  };
  return queryObject;
};

const parseSqlObjectToString = (queryObject) => {
  let queryString = "";
  for (let [key, value] of Object.entries(queryObject)) {
    if (value !== "") {
      if (key != "select") queryString += "\n";
      queryString += key + " " + value;
    }
  }
  return queryString;
};

const updateValue = (
  splitedQuery,
  fromString,
  toString,
  toSecondString = ""
) => {
  let valueToUpdate = "";
  if (splitedQuery.includes(fromString)) {
    if (splitedQuery.includes(toString)) {
      valueToUpdate = splitedQuery.slice(
        splitedQuery.indexOf(fromString) + 1,
        splitedQuery.indexOf(toString)
      );
    } else if (splitedQuery.includes(toSecondString)) {
      valueToUpdate = splitedQuery.slice(
        splitedQuery.indexOf(fromString) + 1,
        splitedQuery.indexOf(toString)
      );
    } else {
      valueToUpdate = splitedQuery.slice(splitedQuery.indexOf(fromString) + 1);
    }
    valueToUpdate = valueToUpdate.join(" ");
  }
  return valueToUpdate;
};

const updateGroupByValue = (splitedQuery) => {
  let groupByValue = "";
  if (splitedQuery.includes("by")) {
    groupByValue = splitedQuery.slice(splitedQuery.indexOf("by") + 1);
    groupByValue = groupByValue.join(" ");
  }
  return groupByValue;
};

module.exports = {
  parseSqlStringToObject,
  parseSqlObjectToString,
};
