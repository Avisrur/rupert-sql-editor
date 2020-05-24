import UserInteractionsActionTypes from "./user-interactions.types";

export const addUserInteraction = (userInteraction) => ({
  type: UserInteractionsActionTypes.SET_USER_INTERACTION,
  payload: userInteraction,
});

export const clearUserInteractions = () => ({
  type: UserInteractionsActionTypes.CLEAR_USER_INTERACTIONS,
});
