import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (object, id) => {
  var rs = -1;
  object.forEach((item, index) => {
    if (item.id === id) {
      rs = index;
    }
  });
  return rs;
}
var object = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    case types.FETCH_OBJECT:
      state = action.object;
      return [...state];

    case types.DELETE_OBJECT:
      index = findIndex(state, id);
      state.slice(index, 1);
      return [...state];

    case types.FETCH_SECTOR_BY_ID:
      return action.object;

    case types.ADD_OBJECT:
      state.push(action.object);
      return [...state];

    case types.UPDATE_OBJECT:
      index = findIndex(state, action.object.id);
      if (index !== -1) {
        state[index] = object;
      }
      return [...state];
      
    case types.EDIT_OBJECT:
      return action.object;
    default:
      return state;
  }
};

export default object;
