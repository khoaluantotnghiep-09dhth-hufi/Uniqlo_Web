import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (news, id) => {
  var rs = -1;
  news.forEach((news, index) => {
    if (news.id === id) {
      rs = index;

    }
  });
  return rs;
}
var news = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {

    case types.FETCH_NEWS:
      state = action.news;
      return [...state];
    case types.DELETE_NEWS:
      index = findIndex(state, id);
      state.slice(index, 1);
      return [...state];
    case types.ADD_NEWS:
      state.push(action.news);
      return [...state];
    case types.UPDATE_NEWS:
      index = findIndex(state, action.news.id);
      if (index !== -1) {
        state[index] = news;
      }
      return [...state];
    case types.EDIT_NEWS:
      return action.news;
    default:
      return state;
  }
};

export default object;
