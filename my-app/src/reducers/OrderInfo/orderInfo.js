import * as types from "../../constants/ActionTypes";
var initialState = [];
var findIndex = (orderInfo, id) => {
  var result = -1;
  orderInfo.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var orderInfo = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    case types.FETCH_ORDERINFO:
      state = action.orderInfo;
      return [...state];
    case types.COUNT_QUANTITYORDERINFO:
      state = action.orderInfo;
      return [...state];
    case types.ADD_ORDERINFO:
      state.push(action.orderInfo);
      return [...state];
    case types.DELETE_ORDERINFO:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
};
export default orderInfo;