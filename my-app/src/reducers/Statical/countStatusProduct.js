import * as types from "../../constants/ActionTypes";

var initialState = [];

var countStatusProduct = (state = initialState, action) => {
  switch (action.type) {
    case types.COUNT_STATUS_PRODUCT_EQUAL1:
      state = action.countStatusProduct;
      return [...state];
    
    default:
      return state;
  }
};

export default countStatusProduct;
