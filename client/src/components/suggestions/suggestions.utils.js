export const checkWhichSqlClauseHasChanged = (oldObj, curObj) => {
  if (JSON.stringify(oldObj) === JSON.stringify(curObj)) return "";
  if (oldObj.select !== curObj.select) return "select";
  if (oldObj.from !== curObj.from) return "from";
  if (oldObj.join !== curObj.join) return "join";
  if (oldObj.on !== curObj.on) return "on";
  if (oldObj.where !== curObj.where) return "where";
  if (oldObj.groupBy !== curObj.groupBy) return "groupBy";
};

export const sortByPriority = (response, sqlClause) => {
  const sortedBySqlClause = response.filter(function (e) {
    return e.common_op === sqlClause;
  });

  sortedBySqlClause.forEach(function (element) {
    var index = response.indexOf(element);
    response.splice(index, 1);
  });
  sortedBySqlClause.sort((a, b) => b.used - a.used);
  response.sort((a, b) => b.used - a.used);
  return sortedBySqlClause.concat(response);
};
