import * as types from "../../constants/ActionTypes";
var initialState = [];
var productInfo = (state = initialState, action) => {
    switch (action.type) {
      case types.ADD_PRODUCT:
        state.push(action.product);
        return [...state];
      default:
        return state;
    }
  };
  export default productInfo;