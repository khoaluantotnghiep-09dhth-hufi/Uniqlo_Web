import * as types from "./../constants/ActionTypes";

var initialState = [];

var category = (state = initialState, action) => {
 
  switch (action.type) {
//Lấy Tất cả Danh Sách Danh Mục
    case types.FETCH_CATEGORY:
      state = action.category;
    
      return [...state];

    default:
      return state;
  }
};

export default category;
