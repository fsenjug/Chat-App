import { actionTypes } from "../actions/actionTypes";

const initialState = { member: { memberName: "empty" } };

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MEMBER:
      return {
        ...state,
        member: action.payload,
      };
    default:
      return state;
  }
};

export default memberReducer;
