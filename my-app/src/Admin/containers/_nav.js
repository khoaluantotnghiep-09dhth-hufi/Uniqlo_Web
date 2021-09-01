import React from 'react'
import CIcon from '@coreui/icons-react'
// import {Route} from 'react-router-dom';
// import Home from '../components/Home/index';
const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Trang Chủ',
     to: '/admin/home',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
 
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Hệ Thống']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Đơn Hàng',
    to: '/admin/system/order',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tin Tức',
    to: '/admin/system/news',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Khuyến Mãi',
    to: '/admin/system/discount',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Khách Hàng']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Danh Sách Khách Hàng',
    route: '/admin/customers/list',
    icon: 'cil-puzzle',
    
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tài Khoản Khách Hàng',
    to: '/admin/customers/account',
    icon: 'cil-chart-pie'
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
