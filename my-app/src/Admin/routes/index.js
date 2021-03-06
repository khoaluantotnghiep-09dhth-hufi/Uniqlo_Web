import React from "react";

const Home = React.lazy(() => import('../components/Statistical/Home'));
const Notifications_Header = React.lazy(() => import('../components/Notifications_Header/listNotifications'));
const ListBanner = React.lazy(() => import('../components/Banner/listBanner'));
const AddBanner = React.lazy(() => import('../components/Banner/addBanner'));



const Order = React.lazy(() => import('../components/Order/order'));
const DetailOrder = React.lazy(() => import('../components/Order/detailOrder'));
const UpdateOrder = React.lazy(() => import('../components/Order/update_order'));
const ConfirmedOrder = React.lazy(() => import('../components/Order/confirmedOrder'));
const UnConfirmedOrder = React.lazy(() => import('../components/Order/waitconfimredOrder'));
const WaitTake = React.lazy(() => import('../components/Order/waitTake'));
const Delivering = React.lazy(() => import('../components/Order/delivering'));
const Delivered = React.lazy(() => import('../components/Order/delivered'));
const ExChangeRequest = React.lazy(() => import('../components/Order/exchangeRequest'));
const ExChange = React.lazy(() => import('../components/Order/exchange'));
const AddExChange = React.lazy(() => import('../components/Order/add_exchange'));

const ListNews = React.lazy(() => import('../components/News/list_news'));
const AddNews = React.lazy(() => import('../components/News/add_news'));

const ListDiscount = React.lazy(() => import('../components/Discount/list_discount'));
const AddDiscount = React.lazy(() => import('../components/Discount/add_discount'));

const ListAccountAdmin = React.lazy(() => import('../components/Account_Admin/list_accountadmin'));
const UpdateAccountAdmin = React.lazy(() => import('../components/Account_Admin/update_account'));
const AddAccountAdmin = React.lazy(() => import('../components/Account_Admin/add_accountAdmin'));
const AdminProfile = React.lazy(() => import('../components/Account_Admin/admin_profile'));
const ChangePassword = React.lazy(() => import('../components/Account_Admin/change_password'));
const ForgotPassword = React.lazy(() => import('../components/Login/forgotPassword'));
const ListProducts = React.lazy(() => import('../components/Product/list_product'));
const AddProduct = React.lazy(() => import('../components/Product/add_product'));
const AddProductInfo = React.lazy(() => import('../components/Product/add_prodcut_info'));
const EditProductInfo = React.lazy(() => import('../components/Product/edit_product_info.js'));

const ListStaffs = React.lazy(() => import('../components/Staff/list_staff'));
const AddStaff = React.lazy(() => import('../components/Staff/add_staff'));

const ListCustomers = React.lazy(() => import('../components/Customers/list_customers'));
const AddCustomer = React.lazy(() => import('../components/Customers/add_customer'));

const ListOrderProduct = React.lazy(() => import('../components/OrderProduct/lis_order_product'));
const AddOrderProduct = React.lazy(() => import('../components/OrderProduct/add_order_product'));
const OrderProductInfo = React.lazy(() => import('../components/OrderProduct/add_order_product_info'));
const EditOrderProductInfo = React.lazy(() => import('../components/OrderProduct/edit_order_product_info'));

const ListImportProduct = React.lazy(() => import('../components/ImportProduct/list_import_product'));
const AddImportProduct = React.lazy(() => import('../components/ImportProduct/add_import_product'));
const AddImportInfoProduct = React.lazy(() => import('../components/ImportProduct/list_import_info'));

const ListObject = React.lazy(() => import('../components/Object/list_object'));
const AddObject = React.lazy(() => import('../components/Object/add_object'));

const ListSectors = React.lazy(() => import('../components/Sector/list_sectors'));
const AddSector = React.lazy(() => import('../components/Sector/add_sector'));

const ListCategories = React.lazy(() => import('../components/Category/list_categories'));
const AddCategory = React.lazy(() => import('../components/Category/add_category'));

const ListStatistical = React.lazy(() => import('../components/Statistical/statistical_shop'));
const ListStatisticalOrderImport = React.lazy(() => import('../components/Statistical/statistical_order_import'));

const ListColor = React.lazy(() => import('../components/Color/list_color'));
const AddColor = React.lazy(() => import('../components/Color/add_color'));

const ListSize = React.lazy(() => import('../components/Size/list_size'));
const AddSize = React.lazy(() => import('../components/Size/add_size'));

const routes = [
    { path: '/admin/home', exact: true, name: 'Trang Chủ', component: Home },
    { path: '/admin/notifications', exact: true, name: 'Thông Báo', component: Notifications_Header },

    { path: '/admin/profile', exact: true, name: 'Thông Tin Cá Nhân', component: AdminProfile },
    { path: '/admin/change-password', exact: true, name: 'Đổi Mật Khẩu', component: ChangePassword },
    { path: '/admin/forgot-password', exact: true, name: 'Quên Mật Khẩu', component: ForgotPassword },

    { path: '/admin/system/order/all', exact: true, name: 'Tất Cả Đơn Hàng', component: Order },
    { path: '/admin/system/order/:id_order/:status/edit', exact: true, name: 'Xác Nhận Đơn Hàng', component: UpdateOrder },
    { path: '/admin/system/order/:id_order/detail', exact: true, name: 'Chi Tiết Đơn Hàng', component: DetailOrder },

    { path: '/admin/system/order/confirmed', exact: true, name: 'Đơn Hàng Đã Xác Nhận', component: ConfirmedOrder },
    { path: '/admin/system/order/unconfirmed', exact: true, name: 'Đơn Hàng Chưa Xác Nhận', component: UnConfirmedOrder },
    { path: '/admin/system/order/wait-take', exact: true, name: 'Chờ Láy Hàng', component: WaitTake },
    { path: '/admin/system/order/delivering', exact: true, name: 'Đang Giao', component: Delivering },
    { path: '/admin/system/order/delivered', exact: true, name: 'Đã Giao', component: Delivered },
    { path: '/admin/system/order/exchange-request', exact: true, name: 'Yêu Cầu Đổi/Trả', component: ExChangeRequest },
    { path: '/admin/system/order/exchange', exact: true, name: 'Đổi Trả', component: ExChange },
    { path: '/admin/system/order/exchange/add', exact: true, name: 'Đổi Trả', component: AddExChange },

    { path: '/admin/manage/news', exact: true, name: 'Danh Sách Tin Tức', component: ListNews },
    { path: '/admin/manage/news/add', exact: true, name: 'Thêm Tin Tức Mới', component: AddNews },
    { path: '/admin/manage/news/:id_news/edit', exact: true, name: 'Chỉnh Sửa Tin Tức', component: AddNews },



    { path: '/admin/system/discount', exact: true, name: 'Danh Sách Khuyến Mãi', component: ListDiscount },

    { path: '/admin/system/discount/:id_promotion/edit', exact: true, name: 'Thêm Khuyến Mãi Mới', component: AddDiscount },
    { path: '/admin/system/discount/add', exact: true, name: 'Thêm Khuyến Mãi Mới', component: AddDiscount },

    { path: '/admin/account', exact: true, name: 'Thêm Tài Khoản Admin Mới', component: ListAccountAdmin },
    { path: '/admin/account/:id_staff/edit', exact: true, name: 'Thêm Tài Khoản Admin Mới', component: UpdateAccountAdmin },
    { path: '/admin/account/add', exact: true, name: 'Thêm Tài Khoản Admin Mới', component: AddAccountAdmin },

    { path: '/admin/manage/products', exact: true, name: 'Danh Sách Sản Phẩm', component: ListProducts },
    { path: '/admin/manage/product/add', exact: true, name: 'Thêm Sản Phẩm Mới', component: AddProduct },
    { path: '/admin/manage/product/:id_product/edit', exact: true, name: 'Sửa Sản Phẩm', component: AddProduct },
    { path: '/admin/manage/product-info/add/:id_product/:status', exact: true, name: 'Thêm Chi Tiết Sản Phẩm Mới', component: AddProductInfo },
    { path: '/admin/manage/product-info/:id_product_info/edit', exact: true, name: 'Sửa Chi Tiết Sản Phẩm', component: EditProductInfo },

    { path: '/admin/manage/staffs', exact: true, name: 'Danh Sách Nhân Viên', component: ListStaffs },
    { path: '/admin/manage/staff/add', exact: true, name: 'Thêm Nhân Viên Mới', component: AddStaff },
    { path: '/admin/manage/staff/:id_staff/edit', exact: true, name: 'Chỉnh Sửa Thông Tin Nhân Viên', component: AddStaff },

    { path: '/admin/manage/customers', exact: true, name: 'Danh Sách Khách Hàng', component: ListCustomers },
    { path: '/admin/manage/customer/add', exact: true, name: 'Thêm Khách Hàng Mới', component: AddCustomer },
    { path: '/admin/manage/customer/:id_customer/edit', exact: true, name: 'Chỉnh Sửa Thông Tin Khách Hàng', component: AddCustomer },

    { path: '/admin/manage/order-product', exact: true, name: 'Danh Sách Đặt Hàng', component: ListOrderProduct },
    { path: '/admin/manage/order-product/add', exact: true, name: 'Lập Đơn Đặt Hàng', component: AddOrderProduct },
    { path: '/admin/manage/order-product/:id_order_product/edit', exact: true, name: 'Sửa Đơn Đặt Hàng', component: AddOrderProduct },
    { path: '/admin/manage/order-info/:id_order/:status', exact: true, name: 'Chi Tiết Đơn Đặt Hàng', component: OrderProductInfo },
    { path: '/admin/manage/order-info-edit/:id_order_info/edit', exact: true, name: 'Sửa Chi Tiết Đơn Đặt Hàng', component: EditOrderProductInfo },

    { path: '/admin/manage/import-product', exact: true, name: 'Danh Sách Nhập Hàng', component: ListImportProduct },
    { path: '/admin/manage/import-product/add', exact: true, name: 'Lập Đơn Nhập Hàng', component: AddImportProduct },
    { path: '/admin/manage/import-product/:id_import/edit', exact: true, name: 'Chỉnh Sửa Đơn Nhập Hàng', component: AddImportProduct },
    { path: '/admin/manage/import-info/:id_import/:id_order/:status', exact: true, name: 'Chi Tiết Đơn Nhập Hàng', component: AddImportInfoProduct },

    { path: '/admin/manage/objects', exact: true, name: 'Danh Sách Đối Tượng', component: ListObject },
    { path: '/admin/manage/object/add', exact: true, name: 'Thêm Đối Tượng Mới', component: AddObject },
    { path: '/admin/manage/object/:id_object_menu/edit', exact: true, name: 'Sửa Đối Tượng', component: AddObject },

    { path: '/admin/manage/sectors', exact: true, name: 'Danh Sách Loại Sản Phẩm', component: ListSectors },
    { path: '/admin/manage/sector/add', exact: true, name: 'Thêm Loại Sản Phẩm Mới', component: AddSector },
    { path: '/admin/manage/sector/:id_sector/edit', exact: true, name: 'Sửa Loại Sản Phẩm', component: AddSector },

    { path: '/admin/manage/categories', exact: true, name: 'Danh Sách Danh Mục', component: ListCategories },
    { path: '/admin/manage/category/add', exact: true, name: 'Thêm Danh Mục Mới', component: AddCategory },
    { path: '/admin/manage/category/:id_category/edit', exact: true, name: 'Sửa Danh Mục', component: AddCategory },


    { path: '/admin/manage/statistical', exact: true, name: 'Thống Kê Doanh Số', component: ListStatistical },
    { path: '/admin/manage/statistical-order-import', exact: true, name: 'Thống Kê Kho', component: ListStatisticalOrderImport },

    { path: '/admin/manage/color', exact: true, name: 'Danh Sách Màu', component: ListColor },
    { path: '/admin/manage/color/add', exact: true, name: 'Thêm Màu Mới', component: AddColor },
    { path: '/admin/manage/color/:id_color/edit', exact: true, name: 'Thêm Màu Mới', component: AddColor },

    { path: '/admin/manage/size', exact: true, name: 'Danh Sách Kích Cỡ', component: ListSize },
    { path: '/admin/manage/size/add', exact: true, name: 'Thêm Kích Cỡ Mới', component: AddSize },
    { path: '/admin/manage/size/:id_size/edit', exact: true, name: 'Thêm Kích Cỡ Mới', component: AddSize },

    { path: '/admin/manage/banner', exact: true, name: 'Danh Sách Banner', component: ListBanner },
    { path: '/admin/manage/banner/add', exact: true, name: 'Thêm Banner Mới', component: AddBanner },
    { path: '/admin/manage/banner/:id_banner/edit', exact: true, name: 'Sửa Banner ', component: AddBanner },
]

export default routes