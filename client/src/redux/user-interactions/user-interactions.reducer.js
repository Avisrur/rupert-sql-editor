import UserInteractionsActionTypes from "./user-interactions.types";
const INITIAL_STATE = {
  interactions: [],
};

const userInteractionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserInteractionsActionTypes.SET_USER_INTERACTION:
      console.log(action.payload);
      state.interactions.push(action.payload);
      console.log(state);
      return {
        ...state,
      };
    case UserInteractionsActionTypes.CLEAR_USER_INTERACTIONS:
      return {
        ...state,
        interactions: [],
      };
    default:
      return state;
  }
};

export default userInteractionsReducer;
