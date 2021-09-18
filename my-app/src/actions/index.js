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
    return callApi("customers", "GET", null).then((response) => {
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
export const fetchProduct = (products_category) => {
  return {
    type: types.FETCH_PRODUCT_CATEGORY,
    products_category,
  };
};

export const fetchProductResquest = () => {
  return (dispatch) => {
    return callApi("products-category", "GET", null).then((response) => {
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
export const onAddObject = (objects) => {
  return {
    type: types.ADD_OBJECT,
    objects,
  };
};
export const onAddObjectResquest = (objects) => {
  return (dispatch) => {
    return callApi("objects", "POST", objects).then((response) => {
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


//Lấy tất cả danh sách  Bill
export const fetchBills = (bill) => {
  return {
    type: types.FETCH_BILL,
    bill,
  };
};

export const fetchBillResquest = () => {
  return (dispatch) => {
    return callApi("bills", "GET", null).then((response) => {
      dispatch(fetchBills(response.data));
    });
  };
};

//Xóa  Bill
export const onDeleteBill = (id) => {
  return {
    type: types.DELETE_BILL,
    id,
  };
};

export const onDeleteBillResquest = (id) => {
  return (dispatch) => {
    return callApi(`bills/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeleteBill(id));
    });
  };
};

//Cập  Bill
export const onUpdateBill = (bill) => {
  return {
    type: types.UPDATE_BILL,
    bill,
  };
};
export const onUpdateBillResquest = (bill) => {
  return (dispatch) => {
    return callApi(`bills/${bill.id}`, "PUT", bill).then(
      (response) => {
        console.log(response);
        dispatch(onUpdateBill(response.data));
      }
    );
  };
};

//Sửa Bill
export const onGetBill = (bill) => {
  return {
    type: types.EDIT_BILL,
    bill,
  };
};
export const onEditBillResquest = (id) => {
  return (dispatch) => {
    return callApi(`bills/${id}`, "GET", null).then((response) => {
      dispatch(onGetBill(response.data));
    });
  };
};

//news 
export const fetchNews = (news) => {
  return {
      type: types.FETCH_NEWS,
      news,
  };
};

export const fetchNewsResquest = () => {
  return (dispatch) => {
      return callApi("news", "GET", null).then((response) => {
          dispatch(fetchNews(response.data));
      });
  };
};

export const onAddNews = (news) => {
  return {
      type: types.ADD_NEWS,
      news,
  };
};
export const onAddNewsResquest = (news) => {
  return (dispatch) => {
      return callApi("news", "POST", news).then((response) => {
          dispatch(onAddNews(response.data));
          console.log(response.data);
      });
  };
};

export const onUpdateNews = (news) => {
  return {
      type: types.UPDATE_NEWS,
      news,
  };
};
export const onUpdateNewsResquest = (news) => {
  return (dispatch) => {
      return callApi(`news/${news.id}`, "PUT", news).then(
          (response) => {
              dispatch(onUpdateNews(response.data));
          }
      );
  };
};
export const onDeleteNews = (id) => {
  return {
      type: types.DELETE_NEWS,
      id,
  };
};

export const onDeleteNewsResquest = (id) => {
  return (dispatch) => {
      return callApi(`news/${id}`, "DELETE", null).then((response) => {
          dispatch(onDeleteNews(id));
      });
  };
};
export const onGetNew = (news) => {
  return {
    type: types.EDIT_NEWS,
    news,
  };
};
export const onEditNewsResquest = (id) => {
  return (dispatch) => {
    return callApi(`news/${id}`, "GET", null).then((response) => {
      dispatch(onGetNew(response.data));
    });
  };
};

//category =

export const onAddCategory = (category) => {
  return {
      type: types.ADD_CATEGORY,
      category,
  };
};
export const onAddCategoryResquest = (category) => {
  return (dispatch) => {
      return callApi("categories", "POST", category).then((response) => {
          dispatch(onAddCategory(response.data));
      });
  };
};

export const onUpdateCategory = (category) => {
  return {
      type: types.UPDATE_CATEGORY,
      category,
  };
};
export const onUpdateCategoryResquest = (category) => {
  return (dispatch) => {
      return callApi(`categories/${category.id}`, "PUT", category).then(
          (response) => {
              dispatch(onUpdateCategory(response.data));
          }
      );
  };
};
export const onDeleteCategory = (id) => {
  return {
      type: types.DELETE_CATEGORY,
      id,
  };
};

export const onDeleteCategoryResquest = (id) => {
  return (dispatch) => {
      return callApi(`categories/${id}`, "DELETE", null).then((response) => {
          dispatch(onDeleteCategory(id));
      });
  };
};
export const onGetCategory = (category) => {
  return {
    type: types.EDIT_CATEGORY,
    category,
  };
};
export const onEditCategoryResquest = (id) => {
  return (dispatch) => {
    return callApi(`categories/${id}`, "GET", null).then((response) => {
      dispatch(onGetCategory(response.data));
    });
  };
};
//customer
export const fetchCustomer = (customer) => {
  return {
      type: types.FETCH_CUSTOMER,
      customer,
  };
};

export const fetchCustomerResquest = () => {
  return (dispatch) => {
      return callApi("customers", "GET", null).then((response) => {
          dispatch(fetchCustomer(response.data));
      });
  };
};

export const onAddCustomer = (customer) => {
  return {
      type: types.ADD_CUSTOMER,
      customer,
  };
};
export const onAddCustomerResquest = (customer) => {
  return (dispatch) => {
      return callApi("customers", "POST", customer).then((response) => {
          dispatch(onAddCustomer(response.data));
      });
  };
};

export const onUpdateCustomer = (customer) => {
  return {
      type: types.UPDATE_CUSTOMER,
      customer,
  };
};

export const onUpdateCustomerResquest = (customer) => {
  return (dispatch) => {
      return callApi(`customers/${customer.id}`, "PUT", customer).then(
          (response) => {
              dispatch(onUpdateCustomer(response.data));
          }
      );
  };
};
export const onDeleteCustomer = (id) => {
  return {
      type: types.DELETE_CUSTOMER,
      id,
  };
};

export const onDeleteCustomerResquest = (id) => {
  return (dispatch) => {
      return callApi(`customers/${id}`, "DELETE", null).then((response) => {
          dispatch(onDeleteCustomer(id));
      });
  };
};
export const onGetCustomer = (customer) => {
  return {
    type: types.EDIT_CUSTOMER,
    customer,
  };
};
export const onEditCustomerResquest = (id) => {
  return (dispatch) => {
    return callApi(`customers/${id}`, "GET", null).then((response) => {
      dispatch(onGetCustomer(response.data));
    });
  };
};
//orders
export const fetchOrder = (order) => {
  return {
    type: types.FETCH_ORDER,
    order,
  };
};

export const fetchOrderResquest = () => {
  return (dispatch) => {
    return callApi("orders", "GET", null).then((response) => {
      dispatch(fetchOrder(response.data));
    });
  };
};

//Xóa Color
export const onDeleteOrder = (id) => {
  return {
    type: types.DELETE_ORDER,
    id,
  };
};

export const onDeleteOrderResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeleteOrder(id));
    });
  };
};
//Thêm Color
export const onAddOrder = (order) => {
  return {
    type: types.ADD_ORDER,
    order,
  };
};

export const onAddOrderResquest = (order) => {
  return (dispatch) => {
    return callApi("orders", "POST", order).then((response) => {
      dispatch(onAddOrder(response.data));
    });
  };
};
//Cập Color
export const onUpdateOrder = (order) => {
  return {
    type: types.UPDATE_ORDER,
    order,
  };
};
export const onUpdateOrderResquest = (order) => {
  return (dispatch) => {
    return callApi(`orders/${order.id}`, "PUT", order).then(
      (response) => {
        dispatch(onUpdateOrder(response.data));
      }
    );
  };
};

//Sửa Color
export const onGetOrder = (order) => {
  return {
    type: types.EDIT_ORDER,
    order,
  };
};
export const onEditOrderResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders/${id}`, "GET", null).then((response) => {
      dispatch(onGetOrder(response.data));
    });
  };
};

//order info
export const fetchOrderInfo = (orderInfo) => {
  return {
    type: types.FETCH_ORDERINFO,
    orderInfo,
  };
};

export const fetchOrderInfoResquest = (orderInfo) => {
  return (dispatch) => {
    return callApi(`orders-info/${orderInfo.id_order}`, "GET", null).then((response) => {
      dispatch(fetchOrderInfo(response.data));
    });
  };
};
//sector 


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






