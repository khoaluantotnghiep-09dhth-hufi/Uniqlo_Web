import * as types from "../../constants/ActionTypes";
var initialState = [];
var findIndex = (billInfo, id) => {
  var result = -1;
  billInfo.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var billInfo = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    case types.FETCH_BILLINFOEXCHANGE:
      state = action.billInfoExchange;
      return [...state];
    case types.UPDATE_BILLINFO:
      index = findIndex(state, action.billInfo.id);
      if (index !== -1) {
        state[index] = billInfo;
      }
      return [...state];
    default:
      return state;
  }
};
export default billInfo;