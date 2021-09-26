import * as types from "../../constants/ActionTypes";
var initialState = [];

var billInfo = (state = initialState, action) => {
  var { id } = action;
  switch (action.type) {
    case types.FETCH_BILLINFOEXCHANGE:
      state = action.billInfoExchange;
      return [...state];
    default:
      return state;
  }
};
export default billInfo;