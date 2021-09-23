import * as types from "../../constants/ActionTypes";

var initialState = [];
var findIndex = (productsAdmin, id) => {
  var result = -1;
  productsAdmin.forEach((product, index) => {
    if (product.id === id) {
      result = index;
    }
  });
  return result;
};
var productsAdmin = (state = initialState, action) => {
  var index = -1;
  var { product, id } = action;
  switch (action.type) {
    //Lấy tất cả danh sách Sản Phẩm
    case types.FETCH_PRODUCTADMIN:
      state = action.productsAdmin;

      return [...state];
    case types.LIST_ALL:
      return [...state];
    //Xóa Sản Phẩm
    case types.DELETE_PRODUCTADMIN:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Sản Phẩm
    case types.ADD_PRODUCTADMIN:
      state.push(action.product);
      return [...state];
    //Cập Nhật Sản Phẩm
    case types.UPDATE_PRODUCTADMIN:
      index = findIndex(state, product.id);
      if (index !== -1) {
        state[index] = product;
      }

      return [...state];
    default:
      return state;
  }
};

export default productsAdmin;
