import React from 'react'
import CIcon from '@coreui/icons-react'
// import {Route} from 'react-router-dom';
// import Home from '../components/Home/index';
const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Trang Chủ',
     to: '/admin',
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
    icon: 'cil-basket',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tất Cả Đơn Hàng',
        to: '/admin/system/order/all',
        icon: 'cil-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Đã Xác Nhận',
        to: '/admin/system/order/confirmed',
        icon: 'cil-task',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Chưa Xác Nhận',
        to: '/admin/system/order/unconfirmed',
        
        icon: 'cil-warning',
      },
      
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tin Tức',
    to: '/admin/system/news',
    icon: 'cil-pencil',
    // _children: [
    //   {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Danh Sách Tin Tưc',
    //     to: '/admin/system/news/list',
    //     icon: 'cil-list',
    //   },
    //   {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Thêm Tin Tức',
    //     to: '/admin/system/news/add',
    //     icon: 'cil-level-up',
    //   },
    // ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Khuyến Mãi',
    to: '/admin/system/discount',
    icon: 'cil-pencil',
    // _children: [
    //   {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Danh Sách Khuyến Mãi',
    //     to: '/admin/system/discount/list',
    //     icon: 'cil-list',
    //   },
    //   {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Thêm Khuyến Mãi',
    //     to: '/admin/system/discount/add',
    //     icon: 'cil-playlist-add',
    //   },
    // ]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Khách Hàng']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh Sách Khách Hàng',
    to: '/admin/customers/list',
    icon: 'cil-people',
    
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài Khoản Khách Hàng',
    to: '/admin/customers/account',
    icon: 'cil-user'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Để giành mốt xài =))',
    to: '/widgets',
    icon: 'cil-calculator',
    
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tài Khoản Admin']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tài Khoản',
    route: '/admin/account',
    icon: 'cil-pencil',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh Sách Tài Khoản',
        to: '/admin/account/list',
        icon: 'cil-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Thêm Tài Khoản Mới',
        to: '/admin/account/add',
        icon: 'cil-level-up',
      },
    ]
  },
  
  
  
  
]

export default _nav
