import { ActionPattern } from "../models/ActionPattern";
import { FetchedPattern } from "../models/FetchedPattern";

export const PatternReducer = (
  state: FetchedPattern,
  action: ActionPattern
): FetchedPattern => {
  if (action.type === "NEW") {
    state = action.payload;
    return action.payload;
  }
  return state;
};
