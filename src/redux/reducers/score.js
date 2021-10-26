import { GET_SCORE, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const score = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_SCORE:
    return {
      score: state.score + action.payload,
    };
  case SET_SCORE:
    return {
      score: 0,
    };
  default:
    return state;
  }
};

export default score;
