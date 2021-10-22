import { GET_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const score = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_SCORE:
    return {
      score: action.payload.score,
    };
  default:
    return state;
  }
};

export default score;
