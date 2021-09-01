import React from 'react'
import CIcon from '@coreui/icons-react'
// import {Route} from 'react-router-dom';
// import Home from '../components/Home/index';
const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Trang Chủ',
     to: '/admin/home',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon"/>,
 
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Hệ Thống']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Đơn Hàng',

    route: '/admin/system/order',
    icon: 'cil-list',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tất Cả Đơn Hàng',
        to: '/admin/system/order/all',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Đã Xác Nhận',
        to: '/admin/system/order/confirmed',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Chưa Xác Nhận',
        to: '/admin/system/order/unconfimred',
      },
      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tin Tức',
    route: '/admin/system/news',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh Sách Tin Tưc',
        to: '/admin/system/news/list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Thêm Tin Tức',
        to: '/admin/system/news/add',
      },
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Khuyến Mãi',
    route: '/admin/system/discount',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh Sách Khuyến Mãi',
        to: '/admin/system/discount/list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Thêm Khuyến Mãi',
        to: '/admin/system/discount/add',
      },
    ]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Khách Hàng']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh Sách Khách Hàng',
    to: '/admin/customers/list',
    icon: 'cil-list',
    
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài Khoản Khách Hàng',
    to: '/admin/customers/account',
    icon: 'cil-user'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  
  
  
  
]

export default _nav
