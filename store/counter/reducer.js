
// TODO : Immutable로 바꾸기.
import { AsyncStorage} from 'react-native';
import types from './actionTypes';

const count = { 
  value: 100
};

setItem = async (cnt) => {
  try {
    await AsyncStorage.setItem('CNTTEXT', cnt.toString());
  } catch (error) {
    // Error saving data
    console.log("===setItem() error="+error);
  }
}

export default function reduce(state = count, action = {}) {
  switch (action.type) {
    case types.COUNT_UP:
      setItem(state.value + action.payload);
      return state.merge( { value: state.value + action.payload });
    case types.COUNT_DOWN:
      setItem(state - action.payload);
      return state.merge( { value: state.value - action.payload });
    case types.COUNT_SET:
      return state.merge( { value: action.payload });
    default:
      return state;
  }
};

// selectors

export function getCount(state) {
  return state.count.value;
}
