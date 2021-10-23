import { combineReducers } from 'redux';
import user from './user';
import trivia from './trivia';
import score from './score';

const rootReducer = combineReducers({
  user,
  trivia,
  score,
});

export default rootReducer;
