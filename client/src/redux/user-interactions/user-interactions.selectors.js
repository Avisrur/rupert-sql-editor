import { createSelector } from "reselect";

const selectUserInteractions = (state) => state.userInteractions;

export const selectInteractions = createSelector(
  [selectUserInteractions],
  (userInteractions) => userInteractions.interactions
);
