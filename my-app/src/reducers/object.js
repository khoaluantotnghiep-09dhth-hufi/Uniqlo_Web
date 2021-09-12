import * as types from "./../constants/ActionTypes";

var initialState = [];


var object = (state = initialState, action) => {

  switch (action.type) {
//Lấy Tất cả Danh Sách Đối tượng
    case types.FETCH_OBJECT:
      state = action.object;
     
      return [...state];
      case types.FETCH_SECTOR_BY_ID:
      
        return action.object;
    default:
      return state;
  }
};

export default object;
