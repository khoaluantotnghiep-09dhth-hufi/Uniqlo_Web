import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (objects, id) => {
  var rs = -1;
  objects.forEach((object2, index) => {
    if (objects.id === id) {
      rs = index;
    }
  });
  return rs;
}
var objects = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Đối tượng

    case types.FETCH_OBJECT:
      state = action.objects;
      return [...state];
    case types.DELETE_OBJECT:
      index = findIndex(state, id);
      state.slice(index, 1);
      return [...state];
    case types.FETCH_SECTOR_BY_ID:
      return action.objects;
    case types.ADD_OBJECT:
      console.log(action.objects);
      state.push(action.objects);
      return [...state];
    case types.UPDATE_OBJECT:
      index = findIndex(state, action.objects.id);
      if (index !== -1) {
        state[index] = objects;
      }
      return [...state];
    case types.EDIT_OBJECT:
      return action.objects;
    default:
      return state;
  }
};

export default objects;
