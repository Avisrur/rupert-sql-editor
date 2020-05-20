export const handleQueryString = (queryString) => {
  queryString = queryString.toLowerCase();
  const splitedQuery = queryString.split(/\n| /);
  let queryObject = {
    select: updateSelectValue(splitedQuery),
    from: updateFromValue(splitedQuery),
    where: updateWhereValue(splitedQuery),
    groupBy: updateGroupByValue(splitedQuery),
  };
  console.log(queryObject);
  return queryObject;
};

const updateSelectValue = (splitedQuery) => {
  let selectValue = "";
  if (splitedQuery.includes("select")) {
    if (splitedQuery.includes("from")) {
      selectValue = splitedQuery.slice(
        splitedQuery.indexOf("select") + 1,
        splitedQuery.indexOf("from")
      );
    } else {
      selectValue = splitedQuery.slice(splitedQuery.indexOf("select") + 1);
    }
    selectValue = selectValue.join(" ");
  }
  return selectValue;
};

const updateFromValue = (splitedQuery) => {
  let fromValue = "";
  if (splitedQuery.includes("from")) {
    if (splitedQuery.includes("where")) {
      fromValue = splitedQuery.slice(
        splitedQuery.indexOf("from") + 1,
        splitedQuery.indexOf("where")
      );
    } else {
      fromValue = splitedQuery.slice(splitedQuery.indexOf("from") + 1);
    }
    fromValue = fromValue.join(" ");
  }
  return fromValue;
};

const updateWhereValue = (splitedQuery) => {
  let whereValue = "";
  if (splitedQuery.includes("where")) {
    if (splitedQuery.includes("group")) {
      whereValue = splitedQuery.slice(
        splitedQuery.indexOf("where") + 1,
        splitedQuery.indexOf("group")
      );
    } else {
      whereValue = splitedQuery.slice(splitedQuery.indexOf("where") + 1);
    }
    whereValue = whereValue.join(" ");
  }
  return whereValue;
};

const updateGroupByValue = (splitedQuery) => {
  let groupByValue = "";
  if (splitedQuery.includes("by")) {
    groupByValue = splitedQuery.slice(splitedQuery.indexOf("by") + 1);
    groupByValue = groupByValue.join(" ");
  }
  return groupByValue;
};
