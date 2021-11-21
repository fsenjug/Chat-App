import { actionTypes } from "../actions/actionTypes";

const initialState = { memberId: "empty" };

const memberIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MEMBERID:
      return {
        ...state,
        memberId: action.payload,
      };
    default:
      return state;
  }
};

export default memberIdReducer;
