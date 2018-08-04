import types from './actionTypes';

//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer
//
// 여기서는 "plain object actions" 만 사용.

export function loadCount() {
  return async(dispatch, getState) => {
    try {
      const value = await AsyncStorage.getItem('CNTTEXT');
      dispatch({ type: types.COUNT_SET, value });
    } catch (error) {
      console.error("error in getCount() : " + error);
    }
  };
}

export function countUp(num) {
  return {
    type: types.COUNT_UP,
    payload: num
  };
}

export function countDown(num) {
  return {
    type: types.COUNT_DOWN,
    payload: num
  };
}

export function setCount(num) {
  return {
    type: types.COUNT_SET,
    payload: num
  };
}

