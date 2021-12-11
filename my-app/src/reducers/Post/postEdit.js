import * as types from "../../constants/ActionTypes";

var initialState = {};
var findIndex = (postEdit, id) => {
  var result = -1;
  postEdit.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var postEdit = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    
    
    //Lấy Mau Để Eddit
    case types.EDIT_POST:
      return action.postEdit;
    default:
      return state;
  }
};

export default postEdit;
