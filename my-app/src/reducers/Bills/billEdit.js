import * as types from "./../../constants/ActionTypes";

var initialState = [];

var billEdit = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    
    //Lấy Bill Để Eddit
    case types.EDIT_BILL:
      return action.bill;
    default:
      return state;
  }
};

export default billEdit;
