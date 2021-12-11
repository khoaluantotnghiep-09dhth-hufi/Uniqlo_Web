import * as types from "./../../constants/ActionTypes";

var initialState = [];

var staffEdit = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    
    //Lấy Nhân Viên Để Eddit
    case types.EDIT_STAFF:
      return action.staff;
    default:
      return state;
  }
};

export default staffEdit;
