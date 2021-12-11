import * as types from "./../../constants/ActionTypes";

var initialState = [];


var sectorEdit = (state = initialState, action) => {
  var index = -1;
  var { id, sector } = action;
  switch (action.type) {
   
    case types.EDIT_SECTOR:
      return action.sector;
    default:
      return state;
  }
};

export default sectorEdit;
