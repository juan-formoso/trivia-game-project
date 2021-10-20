import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  userName: '',
  userEmail: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      userName: action.payload.userName,
      userEmail: action.payload.userEmail,
    };
  default:
    return state;
  }
};

export default user;
