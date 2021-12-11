import * as types from "./../../constants/ActionTypes";

var initialState = [];

var sizeEdit = (state = initialState, action) => {

  switch (action.type) {
   
    //Lấy Size Để Eddit
    case types.EDIT_SIZE:
      return action.size;
    default:
      return state;
  }
};

export default sizeEdit;
