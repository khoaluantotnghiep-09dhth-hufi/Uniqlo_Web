import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (bill, id) => {
  var result = -1;
  bill.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var bill = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Bill
    case types.FETCH_BILL:
      state = action.bill;
      return [...state];
    // case types.FETCH_BILL_DELIVERED:
    //   state = action.bill;
    //   return [...state];
    // case types.FETCH_BILL_DELIVERING:
    //   state = action.bill;
    //   return [...state];
    // case types.FETCH_BILL_WAITTAKE:
    //   state = action.bill;
    //   return [...state];
    // case types.FETCH_BILL_EXCHANGEREQUEST:
    //   state = action.bill;
    //   return [...state];
    case types.COUNT_STATUS_BILL_EQUAL0:
      state = action.bill;
      return [...state];
    //Xóa Bill
    case types.DELETE_BILL:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Bill
    case types.ADD_BILL:
      console.log(action.bill);
      state.push(action.bill);

      return [...state];
    //Cập Nhật Bill
    case types.UPDATE_BILL:
      index = findIndex(state, action.bill.id);
      if (index !== -1) {
        state[index] = bill;
      }

      return [...state];
    //Lấy Bill Để Eddit
    case types.EDIT_BILL:
      return action.bill;
    default:
      return state;
  }
};

export default bill;
