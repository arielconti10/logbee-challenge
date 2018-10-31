import { FETCH_TASKS } from "../actions/types";

export default (state = "loading", action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload;
    default:
      return state;
  }
};