import types from './actionTypes';
import { AsyncStorage} from 'react-native';

//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

export function loadAddrBook() {
  return async (dispatch, getState) => {
    try {
      const addrBookStr = await AsyncStorage.getItem('addrBook');
      addrBook = JSON.parse(addrBookStr);
      dispatch({ type: types.ADDR_LOAD, addrBook });
    } catch (error) {
      console.error(error);
    }
  };
}

export function saveAddrBook() {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('addrBook', JSON.stringify(getState()));
      dispatch({ type: types.ADDR_LOAD });
    } catch (error) {
      console.error(error);
    }
  };
}

export function addAddrBook(newAddr) {
  return (dispatch, getState) => {
    const newState = getState();
    newState.push(newAddr);
    dispatch({ type: types.ADDR_ADD, newState });
  }
}

export function removeAddrBook(index) {
  return (dispatch, getState) => {
    const newState = getState();
    newState.splice(index, 1);
    dispatch({ type: types.ADDR_REMOVE, newState });
  }
}

