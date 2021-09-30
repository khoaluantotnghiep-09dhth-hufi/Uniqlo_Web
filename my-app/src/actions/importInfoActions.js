import * as types from "../constants/ActionTypes";
import callApi from "../Admin/utils/Callapi";
import { toast } from 'react-toastify';
export const fetchImportInfo = (importInfo) => {
  return {
    type: types.FETCH_IMPORTINFO,
    importInfo,
  };
};

export const fetchImportInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`import-info/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchImportInfo(response.data));
      }
    });
  };
};
export const onAddImportInfo = (importInfo) => {
  return {
    type: types.ADD_IMPORTINFO,
    importInfo,
  };
};

export const onAddImportInfoResquest = (importInfo) => {
  return (dispatch) => {
    return callApi("import-info", "POST", importInfo).then((response) => {
      if (response === undefined) {
        toast.error("Sửa thất bại, vui lòng thử lại !");
      }
      else {
        toast.success("Nhập hàng thành công !");
        dispatch(onAddImportInfo(response.data));
      }
    });
  };
};
export const onDeleteImportInfo = (id) => {
  return {
    type: types.DELETE_IMPORTINFO,
    id,
  };
};

export const onDeleteImportInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`import-info/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteImportInfo(id));
    });
  };
};

export const onUpdateImportInfo = (importInfo) => {
  return {
    type: types.UPDATE_IMPORTINFO,
    importInfo,
  };
};
export const onUpdateOrderInfoResquest = (importInfo) => {
  return (dispatch) => {
    return callApi(`import-info/${importInfo.id}`, "PUT", importInfo).then(
      (response) => {
        if (response === undefined) {
          toast.error("Sửa thất bại, vui lòng thử lại !");
        }
        else {
          toast.success("Sửa thành công !");
          dispatch(onUpdateImportInfo(response.data));
        }
      }
    );
  };
};

export const onGetImportInfo = (importInfo) => {
  return {
    type: types.EDIT_IMPORTINFO,
    importInfo,
  };
};
export const onEditImportInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`import-info/${id}`, "GET", null).then((response) => {
      dispatch(onGetImportInfo(response.data));
    });
  };
};