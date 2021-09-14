import * as types from "./../../constants/ActionTypes";

var initialState = [];

var promotion = (state = initialState, action) => {
 
  switch (action.type) {
//Lấy Tất cả Danh Sách Khuyen Mai
    case types.FETCH_PROMOTION:
      state = action.promotion;
     
      return [...state];

    default:
      return state;
  }
};

export default promotion;
