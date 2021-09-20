import * as types from "../../constants/ActionTypes";

var initialState = [];

var color_by_size = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_COLOR_BY_SIZE:
      state = action.color_by_size;
      return [...state];

    default:
      return state;
  }
};

export default color_by_size;
