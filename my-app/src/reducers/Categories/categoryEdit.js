import * as types from "./../../constants/ActionTypes";

var initialState = [];

var categoryEdit = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    
    case types.EDIT_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

export default categoryEdit;
