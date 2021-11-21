import { actionTypes } from "./actionTypes";

export const actionCreators = {
  addMember: (member) => ({
    type: actionTypes.ADD_MEMBER,
    payload: member,
  }),
  addMemberId: (memberId) => ({
    type: actionTypes.ADD_MEMBERID,
    payload: memberId,
  }),
  loggingIn: (isLoggedIn) => ({
    type: actionTypes.LOGGING_IN,
    payload: isLoggedIn,
  }),
  loggingOut: (isLoggedOut) => ({
    type: actionTypes.LOGGING_OUT,
    payload: isLoggedOut,
  }),
};
