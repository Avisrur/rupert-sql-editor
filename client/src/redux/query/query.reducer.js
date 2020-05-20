import QueryActionTypes from "./query.types";
import { handleQueryString } from "./query.utils";
const INITIAL_STATE = {
  queryObject: {
    select: "",
    from: "",
    join: "",
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
    default:
      return state;
  }
};

export default queryReducer;
