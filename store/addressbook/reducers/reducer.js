
// TODO : Immutable로 바꾸기.
import types from './actionTypes';

const addrbook = [];

export default (state = addrbook, action) => {
  switch (action.type) {
    case types.ADDR_LOAD:
      return action.addrBook;
    case types.ADDR_SAVE:
      return state;
    case types.ADDR_ADD:
      return action.newState;
    case types.ADDR_REMOVE:
      return action.newState;
    default:
      return state;
  }
};

// selectors

export function getAddrBook(state) {
  const topicsByUrl = state.topics.topicsByUrl;
  const topicsUrlArray = _.keys(topicsByUrl);
  return [topicsByUrl, topicsUrlArray];
}

