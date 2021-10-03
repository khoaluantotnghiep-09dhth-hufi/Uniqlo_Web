import * as types from "./../../constants/ActionTypes";

var initialState = [];

var billTotalQuantity = (state = initialState, action) => {
  switch (action.type) {
    case types.COUNT_TOTALQUANTITY:
      state = action.billTotalQuantity;
      return [...state];
    
    default:
      return state;
  }
};

export default billTotalQuantity;
