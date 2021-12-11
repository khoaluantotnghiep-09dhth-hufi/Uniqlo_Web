import * as types from "./../../constants/ActionTypes";

var initialState = [];


var customerEdit = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    
    //Chỉnh Sửa Nhân Viên
    case types.EDIT_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
};

export default customerEdit;