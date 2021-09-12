import * as types from "./../constants/ActionTypes";

var initialState = [];
// var findIndex = (products, id) => {
//   var result = -1;
//   products.forEach((product, index) => {
//     if (product.id === id) {
//       result = index;
//     }
//   });
//   return result;
// };

var object = (state = initialState, action) => {
  // var index = -1;
  // var { users } = action;
  switch (action.type) {

    case types.FETCH_OBJECT:
      state = action.object;
     
      return [...state];
      case types.FETCH_SECTOR_BY_ID:
      
        return action.object;
    default:
      return state;
  }
};

export default object;
