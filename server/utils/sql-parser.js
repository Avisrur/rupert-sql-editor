const parseSqlStringToObject = (queryString) => {
  queryString = queryString.toLowerCase();
  const splitedQuery = queryString.split(/\n| /);
  let queryObject = {
    select: updateValue(splitedQuery, "select", "from"),
    from: updateValue(splitedQuery, "from", "join", "where"),
    join: updateValue(splitedQuery, "join", "on"),
    on: updateValue(splitedQuery, "on", "where", "group"),
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
  let valuesToUpdate = [];
  if (splitedQuery.includes(fromString)) {
    if (splitedQuery.includes(toString)) {
      valueToUpdate = splitedQuery.slice(
        splitedQuery.indexOf(fromString) + 1,
        splitedQuery.indexOf(toString)
      );
    } else if (splitedQuery.includes(toSecondString)) {
      valueToUpdate = splitedQuery.slice(
        splitedQuery.indexOf(fromString) + 1,
        splitedQuery.indexOf(toSecondString)
      );
    } else {
      valueToUpdate = splitedQuery.slice(splitedQuery.indexOf(fromString) + 1);
    }
    valueToUpdate = valueToUpdate.join(" ");
    valuesToUpdate = handleValueToUpdate(fromString, valueToUpdate);
  }
  return valuesToUpdate;
};

const updateGroupByValue = (splitedQuery) => {
  let groupByValue = "";
  let groupByValues = [];
  if (splitedQuery.includes("by")) {
    groupByValue = splitedQuery.slice(splitedQuery.indexOf("by") + 1);
    groupByValue = groupByValue.join(" ");
    groupByValues = handleValueToUpdate("by", groupByValue);
  }
  return groupByValues;
};

const handleValueToUpdate = (fromString, valueToUpdate) => {
  switch (fromString) {
    case "select":
      let selectValues = valueToUpdate.split(" ").join("").split(",");
      return selectValues.map((value) => {
        if (value.includes("avg") || value.includes("sum")) {
          let newValue = value
            .replace("sum(", "")
            .replace("avg(", "")
            .replace(")", "");
          return newValue;
        }
        return value;
      });
    case "from":
      return valueToUpdate.split(" ").join("").split(",");
    case "where":
      let whereValues = valueToUpdate.split(" ").join("");
      let whereNewValues = [];
      if (whereValues.includes(">=")) {
        whereNewValues = whereValues.split(">=");
      } else if (whereValues.includes("<=")) {
        whereNewValues = whereValues.split("<=");
      } else if (whereValues.includes("=")) {
        whereNewValues = whereValues.split("=");
      }
      if (whereNewValues[1].includes(".")) {
        return [...whereNewValues];
      } else {
        return [whereNewValues[0]];
      }
    case "join":
      return [valueToUpdate];
    case "on":
      let onValues = valueToUpdate.split(" ").join("");
      let onNewValues = [];
      if (onValues.includes("=")) onNewValues = onValues.split("=");
      return [...onNewValues];
    case "by":
      return [valueToUpdate];
    default:
      return [];
  }
};

module.exports = {
  parseSqlStringToObject,
  parseSqlObjectToString,
};
