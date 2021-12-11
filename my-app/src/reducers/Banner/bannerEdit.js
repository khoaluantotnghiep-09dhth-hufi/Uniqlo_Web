import * as types from "./../../constants/ActionTypes";

var initialState = [];

var bannerEdit = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    
    //Lấy banner Để Eddit
    case types.EDIT_BANNER:
      return action.bannerEdit;
    default:
      return state;
  }
};

export default bannerEdit;
