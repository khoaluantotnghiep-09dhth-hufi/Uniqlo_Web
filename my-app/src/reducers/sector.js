import * as types from "./../constants/ActionTypes";

var initialState = [];

var sector = (state = initialState, action) => {
 
  switch (action.type) {
//Lấy Tất cả Danh Sách Danh Mục
    case types.FETCH_SECTOR:
      state = action.sector;
     
      return [...state];

    default:
      return state;
  }
};

export default sector;
