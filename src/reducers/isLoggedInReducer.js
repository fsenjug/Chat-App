import { actionTypes } from "../actions/actionTypes";

const initialState = { isLoggedIn: false };

const isLoggedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGING_IN:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};

export default isLoggedInReducer;
