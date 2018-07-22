import types from './actionTypes';

//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer
//
// 여기서는 "plain object actions" 만 사용.

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

