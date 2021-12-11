import * as types from "./../../constants/ActionTypes";

var initialState = [];

var promotionEdit = (state = initialState, action) => {

  var { id } = action;
  switch (action.type) {
    
    case types.EDIT_PROMOTION:
      return action.promotion;
    default:
      return state;
  }
};

export default promotionEdit;
