import { combineReducers } from "redux";

import queryReducer from "./query/query.reducer";
import userInteractionsReducer from "./user-interactions/user-interactions.reducer";

const rootReducer = combineReducers({
  query: queryReducer,
  userInteractions: userInteractionsReducer,
});

export default rootReducer;
