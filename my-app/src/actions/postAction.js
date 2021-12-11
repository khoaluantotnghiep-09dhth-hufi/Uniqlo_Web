import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import { toast } from 'react-toastify';
export const fetchPosts = (post) => {
  return {
    type: types.FETCH_POST,
    post,
  };
};

export const fetchPostResquest = () => {
  return (dispatch) => {
    return callApi("news", "GET", null).then((response) => {
      try {
        dispatch(fetchPosts(response.data));
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

export const onAddPost = (post) => {
  return {
    type: types.ADD_POST,
    post,
  };
};

export const onAddPostResquest = (post) => {
  return (dispatch) => {
    return callApi("news", "POST", post).then((response) => {
      if (response !== undefined) {
        toast.success("Thêm thành công !");
        dispatch(onAddPost(response.data));
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
export const onUpdatePost = (post) => {
  return {
    type: types.UPDATE_POST,
    post,
  };
};
export const onUpdatePostResquest = (post) => {
  return (dispatch) => {
    return callApi(`news/${post.id}`, "PUT", post).then(
      (response) => {
        if (response === undefined) {
          toast.error("Sửa thất bại, vui lòng thử lại !");
        }
        else {
          toast.success("Sửa thành công !");
          dispatch(onUpdatePost(response.data));
        }
      }
    );
  };
};

//Sửa sản phẩm
export const onGetPost = (postEdit) => {
  return {
    type: types.EDIT_POST,
    postEdit,
  };
};
export const onEditPostResquest = (id) => {
  return (dispatch) => {
    return callApi(`news/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(onGetPost(response.data));
      }
    });
  };
};
export const onDeletePost = (id) => {
  return {
    type: types.DELETE_POST,
    id,
  };
};

export const onDeletePostResquest = (id) => {
  return (dispatch) => {
    return callApi(`news/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeletePost(id));
    });
  };
};
