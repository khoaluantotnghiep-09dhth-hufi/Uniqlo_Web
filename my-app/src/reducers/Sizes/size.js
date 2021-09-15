import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (size, id) => {
  var result = -1;
  size.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var size = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Size
    case types.FETCH_SIZE:
      state = action.size;

      return [...state];
    //Xóa Size
    case types.DELETE_SIZE:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Size
    case types.ADD_SIZE:
      console.log(action.size);
      state.push(action.size);

      return [...state];
    //Cập Nhật Size
    case types.UPDATE_SIZE:
      index = findIndex(state, action.size.idItem);
      if (index !== -1) {
        state[index] = size;
      }

      return [...state];
    //Lấy Size Để Eddit
    case types.EDIT_SIZE:
      return action.size;
    default:
      return state;
  }
};

export default size;
