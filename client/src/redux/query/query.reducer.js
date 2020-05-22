import QueryActionTypes from "./query.types";
import {
  handleQueryString,
  placeSuggestionInQueryObjectAndCreateQueryString,
} from "./query.utils";
const INITIAL_STATE = {
  queryObject: {
    select: "",
    from: "",
    join: "",
    on: "",
    where: "",
    groupBy: "",
  },
  queryString: "Type Your Query Here...",
};

const queryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QueryActionTypes.SET_QUERY:
      return {
        ...state,
        queryObject: handleQueryString(action.payload),
        queryString: action.payload,
      };
    case QueryActionTypes.SET_QUERY_USING_SUGGESTION:
      const { suggestion, queryObject, sqlClause } = action.payload;
      const generatedQueryString = placeSuggestionInQueryObjectAndCreateQueryString(
        suggestion,
        queryObject,
        sqlClause
      );
      return {
        ...state,
        queryObject: queryObject,
        queryString: generatedQueryString,
      };
    default:
      return state;
  }
};

export default queryReducer;
