import { actionTypes } from "../actions/actionTypes";

const initialState = { isLoggedOut: true };

const isLoggedOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGING_OUT:
      return { ...state, isLoggedOut: action.payload };
    default:
      return state;
  }
};

export default isLoggedOutReducer;
