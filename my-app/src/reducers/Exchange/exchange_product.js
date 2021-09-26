import * as types from "../../constants/ActionTypes";
var initialState = [];
var findIndex = (exchange, id) => {
  var result = -1;
  exchange.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var exchange = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    case types.FETCH_EXCHANGE:
      state = action.exchange;
      return [...state];
    case types.ADD_EXCHANGE:
      state.push(action.exchange);
      return [...state];
    case types.DELETE_EXCHANGE:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
};
export default exchange;