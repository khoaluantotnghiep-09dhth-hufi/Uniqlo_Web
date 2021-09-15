import React from "react";


const Home = React.lazy(() => import('../components/Home/index'));
const Order = React.lazy(() => import('../components/Order/order'));
const ConfirmedOrder = React.lazy(() => import('../components/Order/confirmedOrder'));
const UnConfirmedOrder = React.lazy(() => import('../components/Order/unconfimredOrder'));
const ListNews = React.lazy(() => import('../components/News/list_news'));
const AddNews = React.lazy(() => import('../components/News/add_news'));
const ListDiscount = React.lazy(() => import('../components/Discount/list_discount'));
const AddDiscount = React.lazy(() => import('../components/Discount/add_discount'));
const AddAccountAdmin = React.lazy(() => import('../components/Account_Admin/add_accountAdmin'));


const ListProducts = React.lazy(() => import('../components/Product/list_product'));
const AddProduct = React.lazy(() => import('../components/Product/add_product'));

const ListStaffs = React.lazy(() => import('../components/Staff/list_staff'));
const AddStaff = React.lazy(() => import('../components/Staff/add_staff'));

const ListCustomers = React.lazy(() => import('../components/Customers/list_customers'));
const AddCustomer = React.lazy(() => import('../components/Customers/add_customer'));

const ListOrderProduct = React.lazy(() => import('../components/OrderProduct/lis_order_product'));
const AddOrderProduct = React.lazy(() => import('../components/OrderProduct/add_order_product'));

const ListImportProduct = React.lazy(() => import('../components/ImportProduct/list_import_product'));
const AddImportProduct = React.lazy(() => import('../components/ImportProduct/add_import_product'));

const ListObject = React.lazy(() => import('../components/Object/list_object'));
const AddObject = React.lazy(() => import('../components/Object/add_object'));
const EditObject = React.lazy(() => import('../components/Object/edit_object'));

const ListSectors = React.lazy(() => import('../components/Sector/list_sectors'));
const AddSector = React.lazy(() => import('../components/Sector/add_sector'));
const EditSector = React.lazy(() => import('../components/Sector/edit_sector'));

const ListCategories = React.lazy(() => import('../components/Category/list_categories'));
const AddCategory = React.lazy(() => import('../components/Category/add_category'));

const ListStatistical = React.lazy(() => import('../components/Statistical/statistical_shop'));
const ListStatisticalOrderImport = React.lazy(() => import('../components/Statistical/statistical_order_import'));

const ListColor = React.lazy(() => import('../components/Color/list_color'));
const AddColor = React.lazy(() => import('../components/Color/add_color'));

const ListSize = React.lazy(() => import('../components/Size/list_size'));
const AddSize = React.lazy(() => import('../components/Size/add_size'));
// const Page404 = React.lazy(() => import('../screens/page404/Page404'));
const routes = [
    {
        path: '/admin',
        exact: true,
        name: 'Trang Chủ',
        component: Home
    },
    // { path: '', exact: true, component: Page404 },

    { path: '/admin/system/order/all', exact: true, name: 'Tất Cả Đơn Hàng', component: Order },
    { path: '/admin/system/order/confirmed', exact: true, name: 'Đơn Hàng Đã Xác Nhận', component: ConfirmedOrder },
    { path: '/admin/system/order/unconfirmed', exact: true, name: 'Đơn Hàng Chưa Xác Nhận', component: UnConfirmedOrder },

    { path: '/admin/system/news', exact: true, name: 'Danh Sách Tin Tức', component: ListNews },
    { path: '/admin/system/news/add', exact: true, name: 'Thêm Tin Tức Mới', component: AddNews },

    { path: '/admin/system/discount', exact: true, name: 'Danh Sách Khuyến Mãi', component: ListDiscount },

    { path: '/admin/system/discount/:id_promotion/edit', exact: true, name: 'Thêm Khuyến Mãi Mới', component: AddDiscount },
    { path: '/admin/system/discount/add', exact: true, name: 'Thêm Khuyến Mãi Mới', component: AddDiscount },

    { path: '/admin/account/add', exact: true, name: 'Thêm Tài Khoản Admin Mới', component: AddAccountAdmin },

    { path: '/admin/manage/products', exact: true, name: 'Danh Sách Sản Phẩm', component: ListProducts },
    { path: '/admin/manage/product/add', exact: true, name: 'Thêm Sản Phẩm Mới', component: AddProduct },

    { path: '/admin/manage/staffs', exact: true, name: 'Danh Sách Nhân Viên', component: ListStaffs },
    { path: '/admin/manage/staff/add', exact: true, name: 'Thêm Nhân Viên Mới', component: AddStaff },
    { path: '/admin/manage/staff/:id_staff/edit', exact: true, name: 'Thêm Nhân Viên Mới', component: AddStaff },
    { path: '/admin/manage/customers', exact: true, name: 'Danh Sách Khách Hàng', component: ListCustomers },
    { path: '/admin/manage/customer/add', exact: true, name: 'Thêm Khách Hàng Mới', component: AddCustomer },

    { path: '/admin/manage/order-product', exact: true, name: 'Danh Sách Đặt Hàng', component: ListOrderProduct },
    { path: '/admin/manage/order-product/add', exact: true, name: 'Lập Đơn Đặt Hàng', component: AddOrderProduct },

    { path: '/admin/manage/import-product', exact: true, name: 'Danh Sách Nhập Hàng', component: ListImportProduct },
    { path: '/admin/manage/import-product/add', exact: true, name: 'Lập Đơn Nhập Hàng', component: AddImportProduct },

    { path: '/admin/manage/objects', exact: true, name: 'Danh Sách Đối Tượng', component: ListObject },
    { path: '/admin/manage/object/add', exact: true, name: 'Thêm Đối Tượng Mới', component: AddObject },
    { path: '/admin/manage/object/:id/edit', exact: true, name: 'Sửa Đối Tượng Mới', component: AddObject },
    ///admin/system/discount/:id/edit
    { path: '/admin/manage/sectors', exact: true, name: 'Danh Sách Loại Sản Phẩm', component: ListSectors },
    { path: '/admin/manage/sector/add', exact: true, name: 'Thêm Loại Sản Phẩm Mới', component: AddSector },
    { path: '/admin/manage/sector/:id/edit', exact: true, name: 'Sửa Loại Sản Phẩm Mới', component: EditSector },

    { path: '/admin/manage/categories', exact: true, name: 'Danh Sách Danh Mục', component: ListCategories },
    { path: '/admin/manage/category/add', exact: true, name: 'Thêm Danh Mục Mới', component: AddCategory },
    { path: '/admin/manage/category/:id_color/edit', exact: true, name: 'Thêm Danh Mục Mới', component: AddCategory },

    { path: '/admin/manage/statistical', exact: true, name: 'Thống Kê Doanh Số', component: ListStatistical },
    { path: '/admin/manage/statistical-order-import', exact: true, name: 'Thống Kê Kho', component: ListStatisticalOrderImport },

    { path: '/admin/manage/color', exact: true, name: 'Danh Sách Màu', component: ListColor },
    { path: '/admin/manage/color/add', exact: true, name: 'Thêm Màu Mới', component: AddColor },

    { path: '/admin/manage/size', exact: true, name: 'Danh Sách Kích Cỡ', component: ListSize },
    { path: '/admin/manage/size/add', exact: true, name: 'Thêm Kích Cỡ Mới', component: AddSize },
]
///admin/manage/categories
export default routes