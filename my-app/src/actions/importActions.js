import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import {  toast } from 'react-toastify';
export const fetchImport = (import_product) => {
  return {
    type: types.FETCH_IMPORTPRODUCT,
    import_product,
  }
}

export const fetchImportResquest = () => {
  return (dispatch) => {
    return callApi("import-product", "GET", null).then((response) => {
      console.log(response.data);
      dispatch(fetchImport(response.data));
    });
  };
};

export const onAddImport = (import_product) => {
  return {
    type: types.ADD_IMPORTPRODUCT,
    import_product,
  };
};

export const onAddImportResquest = (import_product) => {
  return (dispatch) => {
    return callApi("import-product", "POST", import_product).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddImport(response.data));
    });
  };
};
//Cập nhật sản phẩm
export const onUpdateImport = (import_product) => {
  return {
    type: types.UPDATE_IMPORTPRODUCT,
    import_product,
  };
};
export const onUpdateImportResquest = (import_product) => {
  return (dispatch) => {
    return callApi(`import-product/${import_product.id}`, "PUT", import_product).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateImport(response.data));
      }
    );
  };
};

//Sửa sản phẩm
export const onGetImport = (import_product) => {
  return {
    type: types.EDIT_IMPORTPRODUCT,
    import_product,
  };
};
export const onEditImportResquest = (id) => {
  return (dispatch) => {
    return callApi(`import-product/${id}`, "GET", null).then((response) => {
      dispatch(onGetImport(response.data));
    });
  };
};
export const onDeleteImport = (id) => {
  return {
    type: types.DELETE_IMPORTPRODUCT,
    id,
  };
};

export const onDeleteImportResquest = (id) => {
  return (dispatch) => {
    return callApi(`import-product/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteImport(id));
    });
  };
};
