import * as types from "./../../constants/ActionTypes";

var initialState = [];

var edditPromotion = (state = initialState, action) => {
 
  switch (action.type) {
    case types.EDIT_PROMOTION:
      
        
      return action.promotion;
    default:
      return state;
  }
};

export default edditPromotion;
