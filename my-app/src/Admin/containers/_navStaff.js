import React from 'react'

// import {Route} from 'react-router-dom';
// import Home from '../components/Home/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchangeAlt,
  faListUl,
  faCheck,
  faExclamationCircle,
  faTasks,
  faNewspaper,
  faBell,
  faWarehouse,
  faPaperPlane,
  faFileImport,
  faStore,
  faImage,
  faUsers,
  faChartBar,
  faChartLine,
  faTruck,
  faPeopleCarry,
  faSyncAlt,
  faBusinessTime
} from "@fortawesome/free-solid-svg-icons";
var sessionUser = JSON.parse(sessionStorage.getItem("userAccountAdmin"));

const _navStaff = [

  {
    _tag: 'CSidebarNavItem',
    name: 'Trang Chủ',
    to: '/admin',
    icon: <FontAwesomeIcon icon={faStore} className="mr-2" />
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Hệ Thống']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Thông Báo',
    to: '/admin/notifications',
    icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,

  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Đơn Hàng',
    route: '/admin/system/order',
    icon: <FontAwesomeIcon icon={faTasks} className="mr-2" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tất Cả',
        to: '/admin/system/order/all',
        icon: <FontAwesomeIcon icon={faListUl} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Chờ Xác Nhận',
        to: '/admin/system/order/unconfirmed',
        icon: <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Đã Xác Nhận',
        to: '/admin/system/order/confirmed',
        icon: <FontAwesomeIcon icon={faCheck} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Chờ Lấy Hàng',
        to: '/admin/system/order/wait-take',
        icon: <FontAwesomeIcon icon={faBusinessTime} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Đang Giao',
        to: '/admin/system/order/delivering',
        icon: <FontAwesomeIcon icon={faTruck} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Đã Giao',
        to: '/admin/system/order/delivered',
        icon: <FontAwesomeIcon icon={faPeopleCarry} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Yêu Cầu Đổi',
        to: '/admin/system/order/exchange-request',
        icon: <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Đổi Trả',
        to: '/admin/system/order/exchange',
        icon: <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />,
      },

    ]

  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tin Tức',
    to: '/admin/manage/news',
    icon: <FontAwesomeIcon icon={faNewspaper} className="mr-2" />,

  },
  // ,
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'POST',
  //   to: '/admin/manage/post',
  //   icon: <FontAwesomeIcon icon={faNewspaper} className="mr-2" />,

  // },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản Lý']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quản Lý Banner',
    to: '/admin/manage/banner',
    icon: <FontAwesomeIcon icon={faImage} className="mr-2" />,

  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Thống Kê Doanh Số',
    to: '/admin/manage/statistical',
    icon: <FontAwesomeIcon icon={faChartLine} className="mr-2" />,

  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Nhập/Xuất Kho',
    route: '/admin/manage',
    icon: <FontAwesomeIcon icon={faWarehouse} className="mr-2" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Đặt Hàng',
        to: '/admin/manage/order-product',
        icon: <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Nhập Hàng',
        to: '/admin/manage/import-product',
        icon: <FontAwesomeIcon icon={faFileImport} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Thống Kê',
        to: '/admin/manage/statistical-order-import',
        icon: <FontAwesomeIcon icon={faChartBar} className="mr-2" />,
      },
    ]

  },




]

export default _navStaff
