import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (customer, id) => {
  var result = -1;
  customer.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
}
var customer = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Danh Sách Khách Hàng
    case types.FETCH_CUSTOMER:
      state = action.customer;
      return [...state];
    case types.COUNT_CUSTOMER:
      state = action.customer;
      return [...state];
    //Xoá Khách Hàng
    case types.DELETE_CUSTOMER:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    //Thêm Khách Hàng
    case types.ADD_CUSTOMER:

      state.push(customer);
      return [...state];
    //Thêm Khách Hàng Client
    case types.ADD_CUSTOMER_CLIENT:

      state.push(customer);
      return [...state];
    //Cập Nhập Khách Hàng
    case types.UPDATE_CUSTOMER:
      index = findIndex(state, action.customer.id);
      if (index !== -1) {
        state[index] = customer;
      }
      return [...state];
    //Chỉnh Sửa Nhân Viên
    case types.EDIT_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
};

export default customer;