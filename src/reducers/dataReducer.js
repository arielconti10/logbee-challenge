import { FETCH_TASKS, FETCH_TASKS_SEARCH } from "../actions/types";
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        list: action.payload,
        filtered: null,
      };
    case FETCH_TASKS_SEARCH:
      console.log(action);
      return {
        ...state,
        filtered: action.payload
      };
    default:
      return state;
  }
}