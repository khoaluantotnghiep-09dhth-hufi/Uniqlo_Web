import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (staff, id) => {
  var result = -1;
  staff.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var staff = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Nhân Viên
    case types.FETCH_STAFF:
      state = action.staff;

      return [...state];
      case types.COUNT_STAFF:
      state = action.staff;

      return [...state];
    //Xóa Nhân Viên
    case types.DELETE_STAFF:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Nhân Viên
    case types.ADD_STAFF:

      state.push(action.staff);

      return [...state];
    //Cập Nhật Nhân Viên
    case types.UPDATE_STAFF:
      index = findIndex(state, action.staff.id);
      if (index !== -1) {
        state[index] = staff;
      }

      return [...state];
    //Cập Nhật Vị Trí Nhân Viên
    case types.UPDATE_POSITION_BY_STAFF:
      index = findIndex(state, action.staff.id);
      if (index !== -1) {
        state[index] = staff;
      }
      return [...state];

    case types.UPDATE_STAFFPROFILE:
      index = findIndex(state, action.staff.id);
      if (index !== -1) {
        state[index] = staff;
      }
      return [...state];
      case types.UPDATE_STAFF_PASSWORD:
      index = findIndex(state, action.staff.id);
      if (index !== -1) {
        state[index] = staff;
      }
      return [...state];
    
    default:
      return state;
  }
};

export default staff;
