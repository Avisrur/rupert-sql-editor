import QueryActionTypes from "./query.types";

export const setQuery = (queryString) => ({
  type: QueryActionTypes.SET_QUERY,
  payload: queryString,
});

export const setQueryUsingSuggestion = (
  suggestion,
  queryObject,
  sqlClause
) => ({
  type: QueryActionTypes.SET_QUERY_USING_SUGGESTION,
  payload: { suggestion, queryObject, sqlClause },
});
