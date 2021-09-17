import * as types from "../../constants/ActionTypes";

var initialState = [];

var orderInfo = (state = initialState, action) => {
    var index = -1;
    var { id } = action;
    switch (action.type) {
        case types.FETCH_ORDERINFO:
            state = action.orderInfo;
            return [...state];

        case types.ADD_ORDERINFO:
            state.push(action.orderInfo);
            return [...state];
        default:
            return state;
    }
};

export default orderInfo;
