import { combineReducers } from "redux";

import tasks from "./dataReducer";
import user from "./authReducer";

export default combineReducers({
  tasks,
  user
});