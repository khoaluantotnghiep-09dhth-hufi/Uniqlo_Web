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
var products = (state = initialState, action) => {
  var index = -1;
  var {product,id} = action;
  switch (action.type) {
    case types.FETCH_PRODUCT:
      state = action.products;

      return [...state];
    case types.LIST_ALL:
      return [...state];
    case types.DELETE_PRODUCT:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    case types.ADD_PRODUCT:
      state.push(action.product);

      return [...state];
    case types.UPDATE_PRODUCT:
      index = findIndex(state, product.id);
      if (index !== -1) {
        state[index]=product;
      }

      return [...state];
    default:
      return state;
  }
};

export default products;
