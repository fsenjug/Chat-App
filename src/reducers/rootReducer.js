import { combineReducers } from "redux";

import memberReducer from "./memberReducer";
import memberIdReducer from "./memberIdReducer";
import isLoggedInReducer from "./isLoggedInReducer";
import isLoggedOutReducer from "./isLoggedOutReducer";

const rootReducer = combineReducers({
  memberReducer: memberReducer,
  memberIdReducer: memberIdReducer,
  isLoggedInReducer: isLoggedInReducer,
  isLoggedOutReducer: isLoggedOutReducer,
});

export default rootReducer;
