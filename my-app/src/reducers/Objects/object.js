import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (object_menu, id) => {
  var result = -1;
  object_menu.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
}
var object_menu= (state = initialState, action) => {
  var index = -1;
  var { id,object_menu } = action;
  switch (action.type) {
    //Lấy Danh Sách Khách Hàng
    case types.FETCH_OBJECT:
      state = action.object_menu;
      return [...state];
    //Xoá Khách Hàng
    case types.DELETE_OBJECT:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    //Thêm Khách Hàng
    case types.ADD_OBJECT:
     
      console.log(state)
      state.push(object_menu);
      return [...state];
    //Cập Nhập Nhân Viên
    case types.UPDATE_OBJECT:
      index = findIndex(state, action.object_menu.id);
      if (index !== -1) {
        state[index] = object_menu;
      }
      return [...state];
    //Chỉnh Sửa Nhân Viên
    case types.EDIT_OBJECT:
      return action.object_menu;
    default:
      return state;
  }
};

export default object_menu;
