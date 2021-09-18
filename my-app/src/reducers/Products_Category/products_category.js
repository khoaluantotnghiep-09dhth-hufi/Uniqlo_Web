import * as types from "../../constants/ActionTypes";

var initialState = [];

var products_category = (state = initialState, action) => {
  switch (action.type) {
    //Lấy tất cả danh sách Sản Phẩm
    case types.FETCH_PRODUCT_CATEGORY:
      state = action.products_category;

      return [...state];
    case types.LIST_ALL:
      return [...state];
    //Xóa Sản Phẩm

    default:
      return state;
  }
};

export default products_category;
