import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";

export const fetchSector = (sector) => {
    return {
        type: types.FETCH_SECTOR,
        sector,
    };
};

export const fetchSectorResquest = () => {
    return (dispatch) => {
        return callApi("sectors", "GET", null).then((response) => {
            dispatch(fetchSector(response.data));
        });
    };
};

export const onAddSector = (sector) => {
    return {
        type: types.ADD_SECTOR,
        sector,
    };
};
export const onAddSectorResquest = (sector) => {
    return (dispatch) => {
        return callApi("sectors", "POST", sector).then((response) => {
            dispatch(onAddSector(response.data));
        });
    };
};

export const onUpdateSector = (sector) => {
    return {
        type: types.UPDATE_SECTOR,
        sector,
    };
};
export const onUpdateSectorResquest = (sector) => {
    return (dispatch) => {
        return callApi(`sectors/${sector.id}`, "PUT", sector).then(
            (response) => {
                dispatch(onUpdateSector(response.data));
            }
        );
    };
};
export const onDeleteSector = (id) => {
    return {
        type: types.DELETE_SECTOR,
        id,
    };
};

export const onDeleteSectorResquest = (id) => {
    return (dispatch) => {
        return callApi(`sectors/${id}`, "DELETE", null).then((response) => {
            dispatch(onDeleteSector(id));
        });
    };
};
export const onGetSector = (sector) => {
    return {
      type: types.EDIT_SECTOR,
      sector,
    };
  };
  export const onEditSectorResquest = (id) => {
    return (dispatch) => {
      return callApi(`sectors/${id}`, "GET", null).then((response) => {
        dispatch(onGetSector(response.data));
      });
    };
  };