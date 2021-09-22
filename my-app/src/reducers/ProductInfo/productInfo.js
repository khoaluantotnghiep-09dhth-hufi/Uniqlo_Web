import * as types from "../../constants/ActionTypes";
var initialState = [];
var findIndex = (productInfo, id) => {
  var result = -1;
  productInfo.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var productInfo = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    case types.FETCH_PRODCUTINFO:
      state = action.productInfo;
      return [...state];
    case types.ADD_PRODUCTINFO:
      state.push(action.productInfo);
      return [...state];
    case types.DELETE_PRODUCTINFO:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
};
export default productInfo;