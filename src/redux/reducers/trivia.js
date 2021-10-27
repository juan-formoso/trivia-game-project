import { REQUEST_QUESTIONS, GET_QUESTIONS, RESET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.payload.results,
    };
  case RESET_QUESTIONS:
    return {
      questions: [],
    };
  default:
    return state;
  }
};

export default questionsReducer;
