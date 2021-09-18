import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (sector, id) => {
  var rs = -1;
  sector.forEach((item, index) => {
    if (item.id === id) {
      rs = index;
    }
  });
  return rs;
}
var sector = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Danh Mục
    case types.FETCH_SECTOR:
      state = action.sector;
      return [...state];

    case types.DELETE_SECTOR:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case types.ADD_SECTOR:
      state.push(action.sector);
      return [...state];
    case types.UPDATE_SECTOR:
      index = findIndex(state, action.sector.id);
      if (index !== -1) {
        state[index] = sector;
      }
      return [...state];
    case types.EDIT_SECTOR:
      return action.sector;
    default:
      return state;
  }
};

export default sector;
