import * as types from "../../constants/ActionTypes";
var initialState = [];
var findIndex = (importInfo, id) => {
  var result = -1;
  importInfo.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var importInfo = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    case types.FETCH_IMPORTINFO:
      state = action.importInfo;
      return [...state];
    case types.ADD_IMPORTINFO:
      state.push(action.importInfo);
      return [...state];
    case types.DELETE_IMPORTINFO:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    default:
      return state;
  }
};
export default importInfo;