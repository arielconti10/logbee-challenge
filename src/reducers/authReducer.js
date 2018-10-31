import { FETCH_USER } from "../actions/types";

export default function (state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_USER:
      return { loading: false, ...action.payload};
    default:
      return state;
  }
}