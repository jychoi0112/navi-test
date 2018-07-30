
// TODO : Immutable로 바꾸기.
import { AsyncStorage} from 'react-native';
import types from '../actions/actionTypes';

const count = 100;

setItem = async (cnt) => {
  try {
    await AsyncStorage.setItem('CNTTEXT', cnt.toString());
  } catch (error) {
    // Error saving data
    console.log("===setItem() error="+error);
  }
}

export default (state = count, action) => {
  switch (action.type) {
    case types.COUNT_UP:
      setItem(state + action.payload);
      return state + action.payload;
    case types.COUNT_DOWN:
      setItem(state - action.payload);
      return state - action.payload;
    case types.COUNT_SET:
      setItem(action.payload);
      return action.payload;
    default:
      return state;
  }
};
