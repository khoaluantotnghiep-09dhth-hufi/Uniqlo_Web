import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import { toast } from 'react-toastify';
export const fetchProduct = (products) => {
  return {
    type: types.FETCH_PRODUCT,
    products,
  };
};

export const fetchProductResquest = () => {
  return (dispatch) => {
    return callApi("products-admin", "GET", null).then((response) => {
      try {
        dispatch(fetchProduct(response.data));
      } catch (error) {
        toast.error("Lỗi server");
      }

    });
    // try {
    //   let res = await callApi("products-admin", "GET", null);
    //   dispatch(fetchProduct(res.data));
    // } catch (error) {
    //   toast.error("Lỗi server");
    // }
  };
};

export const onAddProduct = (product) => {
  return {
    type: types.ADD_PRODUCT,
    product,
  };
};

export const onAddProductResquest = (product) => {
  return (dispatch) => {
    return callApi("products-admin", "POST", product).then((response) => {
      if (response !== undefined) {
        toast.success("Thêm thành công !");
        dispatch(onAddProduct(response.data));
      }
      else {
        toast.error("Thêm thất bại !");
      }
    });
    // try {
    //   let res = await callApi("products-admin", "POST", product);
    //   dispatch(onAddProduct(res.data));
    // } catch (error) {
    //   toast.error("Thêm thất bại")
    // }
  };
};
//Cập nhật sản phẩm
export const onUpdateProduct = (product) => {
  return {
    type: types.UPDATE_PRODUCT,
    product,
  };
};
export const onUpdateProductResquest = (product) => {
  return (dispatch) => {
    return callApi(`products-admin/${product.id}`, "PUT", product).then(
      (response) => {
        if (response === undefined) {
          toast.error("Sửa thất bại, vui lòng thử lại !");
        }
        else {
          toast.success("Sửa thành công !");
          dispatch(onUpdateProduct(response.data));
        }
      }
    );
  };
};

//Sửa sản phẩm
export const onGetProduct = (product) => {
  return {
    type: types.EDIT_PRODUCT,
    product,
  };
};
export const onEditProductResquest = (id) => {
  return (dispatch) => {
    return callApi(`products-admin/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(onGetProduct(response.data));
      }
    });
  };
};
export const onDeleteProduct = (id) => {
  return {
    type: types.DELETE_PRODUCT,
    id,
  };
};

export const onDeleteProductResquest = (id) => {
  return (dispatch) => {
    return callApi(`products-admin/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteProduct(id));
    });
  };
};
