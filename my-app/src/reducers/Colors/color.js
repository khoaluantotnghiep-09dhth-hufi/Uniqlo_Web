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
    //Lấy Tất cả Danh Sách Mau
    case types.FETCH_COLOR:
      state = action.color;

      return [...state];
    //Xóa Mau
    case types.DELETE_COLOR:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Mau
    case types.ADD_COLOR:

      state.push(action.color);

      return [...state];
    //Cập Nhật Mau
    case types.UPDATE_COLOR:
      
      index = findIndex(state, action.color.id);
      if (index !== -1) {
        state[index] = color;
      }

      return [...state];
   
    default:
      return state;
  }
};

export default color;
