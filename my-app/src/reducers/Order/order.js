import * as types from "../../constants/ActionTypes";
var initialState = [];
var findIndex = (order, id) => {
  var result = -1;
  order.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var order = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    case types.FETCH_ORDER:
      state = action.order;
      return [...state];
    case types.ADD_ORDER:
      state.push(action.order);
      return [...state];
    case types.DELETE_ORDER:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
};
export default order;