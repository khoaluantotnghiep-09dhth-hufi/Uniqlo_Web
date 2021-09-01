import * as types from "./../constants/ActionTypes";

var initialState = [];
var findIndex = (products, id) => {
  var result = -1;
  products.forEach((product, index) => {
    if (product.id === id) {
      result = index;
    }
  });
  return result;
};
var itemEditting = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case types.EDIT_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default itemEditting;
