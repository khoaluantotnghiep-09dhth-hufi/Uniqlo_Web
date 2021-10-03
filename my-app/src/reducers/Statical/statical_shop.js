import * as types from "./../../constants/ActionTypes";

var initialState = [];

var billTotal = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BILL_TOTAL:
      state = action.billTotal;
      return [...state];
    default:
      return state;
  }
};

export default billTotal;
