import QueryActionTypes from "./query.types";

export const setQuery = (queryString) => ({
  type: QueryActionTypes.SET_QUERY,
  payload: queryString,
});
