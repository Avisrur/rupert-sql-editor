import axios from "axios";

export const checkWhichSqlClauseHasChanged = (oldObj, curObj) => {
  if (JSON.stringify(oldObj) === JSON.stringify(curObj)) return;
  if (oldObj.select !== curObj.select) return "select";
  if (oldObj.from !== curObj.from) return "from";
  if (oldObj.where !== curObj.where) return "where";
  if (oldObj.groupBy !== curObj.groupBy) return "groupBy";
};

export const getSuggestionsAccordingToCurrentClause = (sqlClause, curObj) => {
  if (sqlClause != null && sqlClause != undefined) {
    let response = axios
      .post("http://localhost:5000/suggestion/tableNamesStartsWith", {
        startsWith: curObj[sqlClause],
      })
      .then((response) => {
        return response.data;
      });
  }
  return [];
};
