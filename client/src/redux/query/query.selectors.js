import { createSelector } from "reselect";

const selectQuery = (state) => state.query;

export const selectQueryString = createSelector(
  [selectQuery],
  (query) => query.queryString
);

export const selectQueryObject = createSelector(
  [selectQuery],
  (query) => query.queryObject
);
