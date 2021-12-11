import * as types from "./../../constants/ActionTypes";

var initialState = [];


var object_menuEdit= (state = initialState, action) => {
  var index = -1;
  var { id,object_menu } = action;
  switch (action.type) {
   
    //Chỉnh Sửa 
    case types.EDIT_OBJECT:
      return action.object_menu;
    default:
      return state;
  }
};

export default object_menuEdit;
