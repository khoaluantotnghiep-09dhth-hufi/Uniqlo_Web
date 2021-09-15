import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
//Giỏ Hàng
export const listAll = () => {
  return {
    type: types.LIST_ALL,
  };
};

export const addItem = (cart) => {
  return {
    type: types.ADD_ITEM,
    cart,
  };
};

export const deleteItem = (id) => {
  return {
    type: types.DELETE_ITEM,
    id,
  };
};
//Thêm sản phẩm vào giỏ hàng
export const addToCart = (product, quantity) => {
  return {
    type: types.ADD_TO_CART,
    product,
    quantity,
  };
};
//Xóa sản phẩm trong giỏ hàng
export const removeToCart = (product) => {
  return {
    type: types.REMOVE_TO_CART,
    product,
  };
};
//Cập nhật giỏ hàng
export const updateQuantity = (product, quantity) => {
  return {
    type: types.UPDATE_QUANTITY_CART,
    product,
    quantity,
  };
};

//Rest Cart
export const onRestCart = (product) => {
  return {
    type: types.RESET_CART,
    product,
  };
};

//Lấy tất cả danh sách Khách hàng
export const fetchUser = (user) => {
  return {
    type: types.FETCH_USER,
    user,

  };
};
export const onDeleteUser=(id)=>{
  return{
    type : types.DELETE_USER,
    id,

  };
};
export const fetchUserRequest = () => {
  return (dispatch) => {
    return callApi("users", "GET", null).then((response) => {
      dispatch(fetchUser(response.data));

    });

        
      };
    };
export const onDeleteUserResquest=(id)=>{
  return(dispatch)=>{
    return callApi(`customers/${id}`, "DELETE", null).then((response)=>{
      dispatch(onDeleteUserResquest(id));
    });
  };
}
// Lấy tất cả danh sách sản phẩm
export const fetchProduct = (products) => {
  return {
    type: types.FETCH_PRODUCT,
    products,
  };
};

export const fetchProductResquest = () => {
  return (dispatch) => {
    return callApi("products", "GET", null).then((response) => {
      dispatch(fetchProduct(response.data));
    });
  };
};

//Xóa Sản Phẩm
export const onDeleteProduct = (id) => {
  return {
    type: types.DELETE_PRODUCT,
    id,
  };
};

export const onDeleteProductResquest = (id) => {
  return (dispatch) => {
    return callApi(`products/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeleteProduct(id));
    });
  };
};
//Thêm sản phẩm
export const onAddProduct = (product) => {
  return {
    type: types.ADD_PRODUCT,
    product,
  };
};

export const onAddProductResquest = (product) => {
  return (dispatch) => {
    return callApi("products", "POST", product).then((response) => {
      dispatch(onAddProduct(response.data));
    });
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
    return callApi(`products/${product.id}`, "PUT", product).then(
      (response) => {
        dispatch(onUpdateProduct(response.data));
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
    return callApi(`products/${id}`, "GET", null).then((response) => {
      dispatch(onGetProduct(response.data));
    });
  };
};

//Lấy tất cả danh sách Object

export const fetchObject = (object) => {
  return {
    type: types.FETCH_OBJECT,
    object,
  };
};

export const fetchObjectResquest = () => {
  return (dispatch) => {
    return callApi("objects", "GET", null).then((response) => {
      dispatch(fetchObject(response.data));
    });
  };
};

//Lấy tất cả danh sách Sector
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

//Lấy tất cả danh sách Categories
export const fetchCategory = (category) => {
  return {
    type: types.FETCH_CATEGORY,
    category,
  };
};

export const fetchCategoryResquest = () => {
  return (dispatch) => {
    return callApi("categories", "GET", null).then((response) => {
      dispatch(fetchCategory(response.data));
    });
  };
};
//Lấy tất cả danh sách Bills_Customer
export const fetchBillsCustomer = (bills_customer) => {
  return {
    type: types.FETCH_BILLS_CUSTOMER,
    bills_customer,
  };
};

export const fetchBillsCustomerResquest = () => {
  return (dispatch) => {
    return callApi("bill-customer", "GET", null).then((response) => {
      dispatch(fetchBillsCustomer(response.data));
    });
  };
};
//Lấy tất cả danh sách Promotion
export const fetchPromotions = (promotion) => {
  return {
    type: types.FETCH_PROMOTION,
    promotion,
  };
};

export const fetchPromotionsResquest = () => {
  return (dispatch) => {
    return callApi("promotions", "GET", null).then((response) => {
      dispatch(fetchPromotions(response.data));
    });
  };
};

//Xóa Promotion
export const onDeletePromotion = (id) => {
  return {
    type: types.DELETE_PROMOTION,
    id,
  };
};

export const onDeletePromotionResquest = (id) => {
  return (dispatch) => {
    return callApi(`promotions/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeletePromotion(id));
    });
  };
};
//Thêm Promotion
export const onAddPromotion = (promotion) => {
  return {
    type: types.ADD_PROMOTION,
    promotion,
  };
};
export const onAddObject = (object) => {
  return {
    type: types.ADD_OBJECT,
    object,
  };
};
export const onAddObjectResquest = (object) => {
  return (dispatch) => {
    return callApi("objects", "POST", object).then((response) => {
      dispatch(onAddObject(response.data));
    });
  };
};
export const onAddPromotionResquest = (promotion) => {
  return (dispatch) => {
    return callApi("promotions", "POST", promotion).then((response) => {
      dispatch(onAddPromotion(response.data));
    });
  };
};
//Cập Promotion
export const onUpdatePromotion = (promotion) => {
  return {
    type: types.UPDATE_PROMOTION,
    promotion,
  };
};
export const onUpdatePromotionResquest = (promotion) => {
  return (dispatch) => {
    return callApi(`promotions/${promotion.id}`, "PUT", promotion).then(
      (response) => {
        dispatch(onUpdatePromotion(response.data));
      }
    );
  };
};
//cập nhật object
export const onUpdateObject = (object) => {
  return {
    type: types.UPDATE_OBJECT,
    object,
  };
};
export const onUpdateObjectResquest = (object) => {
  return (dispatch) => {
    return callApi(`objects/${object.id}`, "PUT", object).then(
      (response) => {
        dispatch(onUpdateObject(response.data));
      }
    );
  };
};

//Sửa Promotion
export const onGetPromotion = (promotion) => {
  return {
    type: types.EDIT_PROMOTION,
    promotion,
  };
};
export const onEditPromotionResquest = (id) => {
  return (dispatch) => {
    return callApi(`promotions/${id}`, "GET", null).then((response) => {
      dispatch(onGetPromotion(response.data));
    });
  };
};
//xóa object 
export const onDeleteObject = (id) => {
  return {
    type: types.DELETE_OBJECT,
    id,
  };
};

export const onDeleteObjectResquest = (id) => {
  return (dispatch) => {
    return callApi(`objects/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeleteObject(id));
    });
  };
};
//sửa object 
export const onGetObject = (object) => {
  return {
    type: types.EDIT_OBJECT,
    object,
  };
};
export const onEditObjectResquest = (id) => {
  return (dispatch) => {
    return callApi(`objects/${id}`, "GET", null).then((response) => {
      dispatch(onGetObject(response.data));
    });
  };
};
//Lấy tất cả danh sách Staff
export const fetchStaffs = (staff) => {
  return {
    type: types.FETCH_STAFF,
    staff,
  };
};

export const fetchStaffsResquest = () => {
  return (dispatch) => {
    return callApi("staffs", "GET", null).then((response) => {
      dispatch(fetchStaffs(response.data));
    });
  };
};

//Xóa Staff
export const onDeleteStaffs = (id) => {
  return {
    type: types.DELETE_STAFF,
    id,
  };
};

export const onDeleteStaffsResquest = (id) => {
  return (dispatch) => {
    return callApi(`staffs/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeleteStaffs(id));
    });
  };
};
//Thêm Staff
export const onAddStaffs = (staff) => {
  return {
    type: types.ADD_STAFF,
    staff,
  };
};

export const onAddStaffsResquest = (staff) => {
  return (dispatch) => {
    return callApi("staffs", "POST", staff).then((response) => {
      dispatch(onAddStaffs(response.data));
    });
  };
};
//Cập Staff
export const onUpdateStaffs = (staff) => {
  return {
    type: types.UPDATE_STAFF,
    staff,
  };
};
export const onUpdateStaffsResquest = (staff) => {
  return (dispatch) => {
    return callApi(`staffs/${staff.id}`, "PUT", staff).then(
      (response) => {
        dispatch(onUpdateStaffs(response.data));
      }
    );
  };
};

//Sửa Staff
export const onGetStaffs = (staff) => {
  return {
    type: types.EDIT_STAFF,
    staff,
  };
};
export const onEditStaffsResquest = (id) => {
  return (dispatch) => {
    return callApi(`staffs/${id}`, "GET", null).then((response) => {
      dispatch(onGetStaffs(response.data));
    });
  };
};

//Lấy tất cả danh sách Color
export const fetchColors = (color) => {
  return {
    type: types.FETCH_COLOR,
    color,
  };
};

export const fetchColorResquest = () => {
  return (dispatch) => {
    return callApi("color", "GET", null).then((response) => {
      dispatch(fetchColors(response.data));
    });
  };
};

//Xóa Color
export const onDeleteColor = (id) => {
  return {
    type: types.DELETE_COLOR,
    id,
  };
};

export const onDeleteColorResquest = (id) => {
  return (dispatch) => {
    return callApi(`color/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeleteColor(id));
    });
  };
};
//Thêm Color
export const onAddColor = (color) => {
  return {
    type: types.ADD_COLOR,
    color,
  };
};

export const onAddColorResquest = (color) => {
  return (dispatch) => {
    return callApi("color", "POST", color).then((response) => {
      console.log(response);
      dispatch(onAddColor(response.data));
    });
  };
};
//Cập Color
export const onUpdateColor = (color) => {
  return {
    type: types.UPDATE_COLOR,
    color,
  };
};
export const onUpdateColorResquest = (color) => {
  return (dispatch) => {
    return callApi(`color/${color.id}`, "PUT", color).then(
      (response) => {
        dispatch(onUpdateColor(response.data));
      }
    );
  };
};

//Sửa Color
export const onGetColor = (color) => {
  return {
    type: types.EDIT_COLOR,
    color,
  };
};
export const onEditColorResquest = (id) => {
  return (dispatch) => {
    return callApi(`color/${id}`, "GET", null).then((response) => {
      dispatch(onGetColor(response.data));
    });
  };
};

//Lấy tất cả danh sách  Size
export const fetchSizes = (size) => {
  return {
    type: types.FETCH_SIZE,
    size,
  };
};

export const fetchSizeResquest = () => {
  return (dispatch) => {
    return callApi("size", "GET", null).then((response) => {
      dispatch(fetchSizes(response.data));
    });
  };
};

//Xóa  Size
export const onDeleteSize = (id) => {
  return {
    type: types.DELETE_SIZE,
    id,
  };
};

export const onDeleteSizeResquest = (id) => {
  return (dispatch) => {
    return callApi(`size/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeleteSize(id));
    });
  };
};
//Thêm  Size
export const onAddSize = (size) => {
  return {
    type: types.ADD_SIZE,
    size,
  };
};

export const onAddSizeResquest = (size) => {
  return (dispatch) => {
    return callApi("size", "POST", size).then((response) => {
     
      dispatch(onAddSize(response.data));
    });
  };
};
//Cập  Size
export const onUpdateSize = (size) => {
  return {
    type: types.UPDATE_SIZE,
    size,
  };
};
export const onUpdateSizeResquest = (size) => {
  return (dispatch) => {
    return callApi(`size/${size.id}`, "PUT", size).then(
      (response) => {
        console.log(response);
        dispatch(onUpdateSize(response.data));
      }
    );
  };
};

//Sửa Size
export const onGetSize = (size) => {
  return {
    type: types.EDIT_SIZE,
    size,
  };
};
export const onEditSizeResquest = (id) => {
  return (dispatch) => {
    return callApi(`size/${id}`, "GET", null).then((response) => {
      dispatch(onGetSize(response.data));
    });
  };
};
