import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (import_product, id) => {
  var result = -1;
  import_product.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
}
var import_product = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Phiếu Nhập
    case types.FETCH_IMPORTPRODUCT:
      state = action.import_product;
      return [...state];
    case types.DELETE_IMPORTPRODUCT:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case types.ADD_IMPORTPRODUCT:
      console.log(action.import_product);
      state.push(action.import_product);
      return [...state];
    case types.UPDATE_IMPORTPRODUCT:
      index = findIndex(state, action.import_product.id);
      if (index !== -1) {
        state[index] = import_product;
      }
      return [...state];
    case types.EDIT_IMPORTPRODUCT:
      return action.import_product;
    default:
      return state;
  }
};

export default import_product;
