import * as types from "../../constants/ActionTypes";

var initialState = [];

var productsEdit = (state = initialState, action) => {
  var index = -1;
  var { product, id } = action;
  switch (action.type) {
    
    case types.EDIT_PRODUCT:
      return action.product;

    default:
      return state;
  }
};

export default productsEdit;
