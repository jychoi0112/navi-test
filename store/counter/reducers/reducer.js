
// TODO : Immutable로 바꾸기.
import types from '../actions/actionTypes';

const count = 100;
export default (state = count, action) => {
  switch (action.type) {
    case types.COUNT_UP:
      return state + action.payload;
    case types.COUNT_DOWN:
      return state - action.payload;
    default:
      return state;
  }
};
