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
    { path: '/admin/home', exact: true, name: 'Trang Ch???', component: Home },
    { path: '/admin/notifications', exact: true, name: 'Th??ng B??o', component: Notifications_Header },

    { path: '/admin/profile', exact: true, name: 'Th??ng Tin C?? Nh??n', component: AdminProfile },
    { path: '/admin/change-password', exact: true, name: '?????i M???t Kh???u', component: ChangePassword },
    { path: '/admin/forgot-password', exact: true, name: 'Qu??n M???t Kh???u', component: ForgotPassword },

    { path: '/admin/system/order/all', exact: true, name: 'T???t C??? ????n H??ng', component: Order },
    { path: '/admin/system/order/:id_order/:status/edit', exact: true, name: 'X??c Nh???n ????n H??ng', component: UpdateOrder },
    { path: '/admin/system/order/:id_order/detail', exact: true, name: 'Chi Ti???t ????n H??ng', component: DetailOrder },

    { path: '/admin/system/order/confirmed', exact: true, name: '????n H??ng ???? X??c Nh???n', component: ConfirmedOrder },
    { path: '/admin/system/order/unconfirmed', exact: true, name: '????n H??ng Ch??a X??c Nh???n', component: UnConfirmedOrder },
    { path: '/admin/system/order/wait-take', exact: true, name: 'Ch??? L??y H??ng', component: WaitTake },
    { path: '/admin/system/order/delivering', exact: true, name: '??ang Giao', component: Delivering },
    { path: '/admin/system/order/delivered', exact: true, name: '???? Giao', component: Delivered },
    { path: '/admin/system/order/exchange-request', exact: true, name: 'Y??u C???u ?????i/Tr???', component: ExChangeRequest },
    { path: '/admin/system/order/exchange', exact: true, name: '?????i Tr???', component: ExChange },
    { path: '/admin/system/order/exchange/add', exact: true, name: '?????i Tr???', component: AddExChange },

    { path: '/admin/manage/news', exact: true, name: 'Danh S??ch Tin T???c', component: ListNews },
    { path: '/admin/manage/news/add', exact: true, name: 'Th??m Tin T???c M???i', component: AddNews },
    { path: '/admin/manage/news/:id_news/edit', exact: true, name: 'Ch???nh S???a Tin T???c', component: AddNews },



    { path: '/admin/system/discount', exact: true, name: 'Danh S??ch Khuy???n M??i', component: ListDiscount },

    { path: '/admin/system/discount/:id_promotion/edit', exact: true, name: 'Th??m Khuy???n M??i M???i', component: AddDiscount },
    { path: '/admin/system/discount/add', exact: true, name: 'Th??m Khuy???n M??i M???i', component: AddDiscount },

    { path: '/admin/account', exact: true, name: 'Th??m T??i Kho???n Admin M???i', component: ListAccountAdmin },
    { path: '/admin/account/:id_staff/edit', exact: true, name: 'Th??m T??i Kho???n Admin M???i', component: UpdateAccountAdmin },
    { path: '/admin/account/add', exact: true, name: 'Th??m T??i Kho???n Admin M???i', component: AddAccountAdmin },

    { path: '/admin/manage/products', exact: true, name: 'Danh S??ch S???n Ph???m', component: ListProducts },
    { path: '/admin/manage/product/add', exact: true, name: 'Th??m S???n Ph???m M???i', component: AddProduct },
    { path: '/admin/manage/product/:id_product/edit', exact: true, name: 'S???a S???n Ph???m', component: AddProduct },
    { path: '/admin/manage/product-info/add/:id_product/:status', exact: true, name: 'Th??m Chi Ti???t S???n Ph???m M???i', component: AddProductInfo },
    { path: '/admin/manage/product-info/:id_product_info/edit', exact: true, name: 'S???a Chi Ti???t S???n Ph???m', component: EditProductInfo },

    { path: '/admin/manage/staffs', exact: true, name: 'Danh S??ch Nh??n Vi??n', component: ListStaffs },
    { path: '/admin/manage/staff/add', exact: true, name: 'Th??m Nh??n Vi??n M???i', component: AddStaff },
    { path: '/admin/manage/staff/:id_staff/edit', exact: true, name: 'Ch???nh S???a Th??ng Tin Nh??n Vi??n', component: AddStaff },

    { path: '/admin/manage/customers', exact: true, name: 'Danh S??ch Kh??ch H??ng', component: ListCustomers },
    { path: '/admin/manage/customer/add', exact: true, name: 'Th??m Kh??ch H??ng M???i', component: AddCustomer },
    { path: '/admin/manage/customer/:id_customer/edit', exact: true, name: 'Ch???nh S???a Th??ng Tin Kh??ch H??ng', component: AddCustomer },

    { path: '/admin/manage/order-product', exact: true, name: 'Danh S??ch ?????t H??ng', component: ListOrderProduct },
    { path: '/admin/manage/order-product/add', exact: true, name: 'L???p ????n ?????t H??ng', component: AddOrderProduct },
    { path: '/admin/manage/order-product/:id_order_product/edit', exact: true, name: 'S???a ????n ?????t H??ng', component: AddOrderProduct },
    { path: '/admin/manage/order-info/:id_order/:status', exact: true, name: 'Chi Ti???t ????n ?????t H??ng', component: OrderProductInfo },
    { path: '/admin/manage/order-info-edit/:id_order_info/edit', exact: true, name: 'S???a Chi Ti???t ????n ?????t H??ng', component: EditOrderProductInfo },

    { path: '/admin/manage/import-product', exact: true, name: 'Danh S??ch Nh???p H??ng', component: ListImportProduct },
    { path: '/admin/manage/import-product/add', exact: true, name: 'L???p ????n Nh???p H??ng', component: AddImportProduct },
    { path: '/admin/manage/import-product/:id_import/edit', exact: true, name: 'Ch???nh S???a ????n Nh???p H??ng', component: AddImportProduct },
    { path: '/admin/manage/import-info/:id_import/:id_order/:status', exact: true, name: 'Chi Ti???t ????n Nh???p H??ng', component: AddImportInfoProduct },

    { path: '/admin/manage/objects', exact: true, name: 'Danh S??ch ?????i T?????ng', component: ListObject },
    { path: '/admin/manage/object/add', exact: true, name: 'Th??m ?????i T?????ng M???i', component: AddObject },
    { path: '/admin/manage/object/:id_object_menu/edit', exact: true, name: 'S???a ?????i T?????ng', component: AddObject },

    { path: '/admin/manage/sectors', exact: true, name: 'Danh S??ch Lo???i S???n Ph???m', component: ListSectors },
    { path: '/admin/manage/sector/add', exact: true, name: 'Th??m Lo???i S???n Ph???m M???i', component: AddSector },
    { path: '/admin/manage/sector/:id_sector/edit', exact: true, name: 'S???a Lo???i S???n Ph???m', component: AddSector },

    { path: '/admin/manage/categories', exact: true, name: 'Danh S??ch Danh M???c', component: ListCategories },
    { path: '/admin/manage/category/add', exact: true, name: 'Th??m Danh M???c M???i', component: AddCategory },
    { path: '/admin/manage/category/:id_category/edit', exact: true, name: 'S???a Danh M???c', component: AddCategory },


    { path: '/admin/manage/statistical', exact: true, name: 'Th???ng K?? Doanh S???', component: ListStatistical },
    { path: '/admin/manage/statistical-order-import', exact: true, name: 'Th???ng K?? Kho', component: ListStatisticalOrderImport },

    { path: '/admin/manage/color', exact: true, name: 'Danh S??ch M??u', component: ListColor },
    { path: '/admin/manage/color/add', exact: true, name: 'Th??m M??u M???i', component: AddColor },
    { path: '/admin/manage/color/:id_color/edit', exact: true, name: 'Th??m M??u M???i', component: AddColor },

    { path: '/admin/manage/size', exact: true, name: 'Danh S??ch K??ch C???', component: ListSize },
    { path: '/admin/manage/size/add', exact: true, name: 'Th??m K??ch C??? M???i', component: AddSize },
    { path: '/admin/manage/size/:id_size/edit', exact: true, name: 'Th??m K??ch C??? M???i', component: AddSize },

    { path: '/admin/manage/banner', exact: true, name: 'Danh S??ch Banner', component: ListBanner },
    { path: '/admin/manage/banner/add', exact: true, name: 'Th??m Banner M???i', component: AddBanner },
    { path: '/admin/manage/banner/:id_banner/edit', exact: true, name: 'S???a Banner ', component: AddBanner },
]

export default routes