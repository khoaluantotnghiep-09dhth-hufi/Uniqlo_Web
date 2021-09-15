import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (color, id) => {
  var result = -1;
  color.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var color = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Nhân Viên
    case types.FETCH_COLOR:
      state = action.color;

      return [...state];
    //Xóa Nhân Viên
    case types.DELETE_COLOR:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Nhân Viên
    case types.ADD_COLOR:
      console.log(action.color);
      state.push(action.color);

      return [...state];
    //Cập Nhật Nhân Viên
    case types.UPDATE_COLOR:
      index = findIndex(state, action.color.id);
      if (index !== -1) {
        state[index] = color;
      }

      return [...state];
    //Lấy Nhân Viên Để Eddit
    case types.EDIT_COLOR:
      return action.color;
    default:
      return state;
  }
};

export default color;
