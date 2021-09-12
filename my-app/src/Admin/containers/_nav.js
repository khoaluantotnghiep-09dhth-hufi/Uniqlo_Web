import React from 'react'

// import {Route} from 'react-router-dom';
// import Home from '../components/Home/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  
  faListUl,
  faCheck,
  faExclamationCircle,
  faTasks,
  faNewspaper,
  faPercent,
  faIdCard,
  faWarehouse,
  faPaperPlane,
  faFileImport,
  faTshirt,
  faUserCog,
  faBars,
  faGripHorizontal,
  faGripLines,
  faMinus,
  faStore,
  faUsers,
  faChartBar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: <h4>Trang Chủ</h4>,
     to: '/admin',
    // icon: <Fon name="cil-home" customClasses="c-sidebar-nav-icon"/>,
    icon: <FontAwesomeIcon icon={faStore} className="mr-2" size="2x"/>
 
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Hệ Thống']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: <h5>Đơn Hàng</h5>,
    route: '/admin/system/order',
    icon: <FontAwesomeIcon icon={faTasks} className="mr-2" size="lg"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name:  <h5>Tất Cả</h5>,
        to: '/admin/system/order/all',
        icon: <FontAwesomeIcon icon={faListUl} className="mr-2" size="lg"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  <h5>Đã Xác Nhận</h5>,
        to: '/admin/system/order/confirmed',
        icon: <FontAwesomeIcon icon={faCheck} className="mr-2" size="lg"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: <h5>Chưa Xác Nhận</h5>,
        to: '/admin/system/order/unconfirmed',
        
        icon: <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" size="lg"/>,
      },
      
    ]

  },
  {
    _tag: 'CSidebarNavItem',
    name:  <h5>Tin Tức</h5>,
    to: '/admin/system/news',
    icon: <FontAwesomeIcon icon={faNewspaper} className="mr-2" size="lg"/>,
    
  },
  {
    _tag: 'CSidebarNavItem',
    name:  <h5>Khuyến Mãi</h5>,
    to: '/admin/system/discount',
    icon: <FontAwesomeIcon icon={faPercent} className="mr-2" size="lg"/>,
    
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản Lý']
  },
  {
    _tag: 'CSidebarNavItem',
    name:  <h5>Thống Kê Doanh Số</h5>,
    to: '/admin/manage/statistical',
    icon: <FontAwesomeIcon icon={faChartLine} className="mr-2" size="lg"/>,
    
  },
  {
    _tag: 'CSidebarNavDropdown',
    name:  <h5>Nhập/Xuất Kho</h5>,
    route: '/admin/manage',
    icon: <FontAwesomeIcon icon={faWarehouse} className="mr-2" size="lg"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name:  <h5>Đặt Hàng</h5>,
        to: '/admin/manage/order-product',
        icon: <FontAwesomeIcon icon={faPaperPlane} className="mr-2"  size="lg"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  <h5>Nhập Hàng</h5>,
        to: '/admin/manage/import-product',
        icon: <FontAwesomeIcon icon={faFileImport} className="mr-2" size="lg"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  <h5>Thống Kê</h5>,
        to: '/admin/manage/statistical-order-import',
        icon: <FontAwesomeIcon icon={faChartBar} className="mr-2" size="lg"/>,
      },
    ]

  },
  {
    _tag: 'CSidebarNavDropdown',
    name:  <h5>Danh Sách</h5>,
    route: '/admin/manage/cate',
    icon: <FontAwesomeIcon icon={faGripHorizontal} className="mr-2" size="lg"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name:  <h5>Đối Tượng</h5>,
        to: '/admin/manage/objects',
        icon: <FontAwesomeIcon icon={faBars} className="mr-2" size="lg"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  <h5>Loại Sản Phẩm</h5>,
        to: '/admin/manage/sectors',
        icon: <FontAwesomeIcon icon={faGripLines} className="mr-2" size="lg"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  <h5>Danh Mục</h5>,
        to: '/admin/manage/categories',
        icon: <FontAwesomeIcon icon={faMinus} className="mr-2" size="lg"/>,
      },
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name:  <h5>Sản Phẩm</h5>,
    to: '/admin/manage/products',
    icon: <FontAwesomeIcon icon={faTshirt} className="mr-2" size="lg"/>,
  },
 
  
  {
    _tag: 'CSidebarNavItem',
    name:  <h5>Nhân Viên</h5>,
    to: '/admin/manage/staffs',
    icon: <FontAwesomeIcon icon={faIdCard} className="mr-2" size="lg"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name:  <h5>Khách Hàng</h5>,
    to: '/admin/manage/customers',
    icon: <FontAwesomeIcon icon={faUsers} className="mr-2" size="lg"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: <h5>Phân Quyền</h5>,
    to: '/admin/account',
    icon: <FontAwesomeIcon icon={faUserCog} className="mr-2" size="lg"/>,
    
  },
  
  
]

export default _nav
