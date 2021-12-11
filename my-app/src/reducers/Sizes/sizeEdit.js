import * as types from "./../../constants/ActionTypes";

var initialState = [];

var size = (state = initialState, action) => {

  switch (action.type) {
   
    //Lấy Size Để Eddit
    case types.EDIT_SIZE:
      return action.size;
    default:
      return state;
  }
};

export default size;
