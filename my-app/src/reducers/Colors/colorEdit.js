import * as types from "./../../constants/ActionTypes";

var initialState = [];

var colorEdit = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
   
   
    //Lấy Mau Để Eddit
    case types.EDIT_COLOR:
      return action.color;
    default:
      return state;
  }
};

export default colorEdit;
