export const handleQueryString = (queryString) => {
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
  console.log(queryObject);
  return queryObject;
};

const updateValue = (
  splitedQuery,
  fromString,
  toString,
  toSecondString = ""
) => {
  let selectValue = "";
  if (splitedQuery.includes(fromString)) {
    if (splitedQuery.includes(toString)) {
      selectValue = splitedQuery.slice(
        splitedQuery.indexOf(fromString) + 1,
        splitedQuery.indexOf(toString)
      );
    } else if (splitedQuery.includes(toSecondString)) {
      selectValue = splitedQuery.slice(
        splitedQuery.indexOf(fromString) + 1,
        splitedQuery.indexOf(toString)
      );
    } else {
      selectValue = splitedQuery.slice(splitedQuery.indexOf(fromString) + 1);
    }
    selectValue = selectValue.join(" ");
  }
  return selectValue;
};

const updateGroupByValue = (splitedQuery) => {
  let groupByValue = "";
  if (splitedQuery.includes("by")) {
    groupByValue = splitedQuery.slice(splitedQuery.indexOf("by") + 1);
    groupByValue = groupByValue.join(" ");
  }
  return groupByValue;
};

export const placeSuggestionInQueryObjectAndCreateQueryString = (
  suggestion,
  queryObject,
  sqlClause
) => {
  console.log("QUERRRTYYYYY", queryObject);
  queryObject[sqlClause] = suggestion.name;
  let queryString = "";
  for (let [key, value] of Object.entries(queryObject)) {
    if (value !== "") queryString += key + " " + value + "\n";
  }
  return queryString;
};
