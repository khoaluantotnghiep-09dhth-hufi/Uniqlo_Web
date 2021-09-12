import * as types from "./../../constants/ActionTypes";

var initialState = [];

var bills_customer = (state = initialState, action) => {
 
  switch (action.type) {
//Lấy Tất cả Danh Sách Danh Bill cua Customer
    case types.FETCH_BILLS_CUSTOMER:
      state = action. bills_customer;
    
      return [...state];

    default:
      return state;
  }
};

export default  bills_customer;
