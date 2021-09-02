import React from "react";


const Home = React.lazy(() => import('../components/Home/index'));
const Order = React.lazy(() => import('../components/Order/order'));
const ConfirmedOrder = React.lazy(() => import('../components/Order/confirmedOrder'));
const UnConfirmedOrder = React.lazy(() => import('../components/Order/unconfimredOrder'));
const ListCustomers = React.lazy(() => import('../components/List_Customers/listCustomers'));
const AccountCustomers = React.lazy(() => import('../components/Account_Customers/accountCustomers'));
const ListNews = React.lazy(() => import('../components/News/list_news'));
const AddNews = React.lazy(() => import('../components/News/add_news'));
const ListDiscount = React.lazy(() => import('../components/Discount/list_discount'));
const AddDiscount = React.lazy(() => import('../components/Discount/add_discount'));

const routes = [
    { path: '/admin/home', exact: true, name: 'Trang Chủ', component: Home },
    { path: '/admin/system/order/all', exact: true, name: 'Tất Cả Đơn Hàng', component: Order },
    { path: '/admin/system/order/confirmed', exact: true, name: 'Đơn Hàng Đã Xác Nhận', component: ConfirmedOrder },
    { path: '/admin/system/order/unconfirmed', exact: true, name: 'Đơn Hàng Chưa Xác Nhận', component: UnConfirmedOrder },
    { path: '/admin/customers/list', exact: true, name: 'Danh Sách Khách Hàng', component: ListCustomers },
    { path: '/admin/customers/account', exact: true, name: 'Tài Khoản Khách Hàng', component: AccountCustomers },
    { path: '/admin/system/news/list', exact: true, name: 'Danh Sách Tin Tức', component: ListNews },
    { path: '/admin/system/news/add', exact: true, name: 'Thêm Tin Tức Mới', component: AddNews },
    { path: '/admin/system/discount/list', exact: true, name: 'Danh Sách Khuyến Mãi', component: ListDiscount },
    { path: '/admin/system/discount/add', exact: true, name: 'Thêm Khuyến Mãi Mới', component: AddDiscount },
]

export default routes