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
  faPalette,
  faDraftingCompass,
} from "@fortawesome/free-solid-svg-icons";
const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Trang Chủ',
     to: '/admin',
    icon: <FontAwesomeIcon icon={faStore} className="mr-2"/>
 
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Hệ Thống']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Đơn Hàng',
    route: '/admin/system/order',
    icon: <FontAwesomeIcon icon={faTasks} className="mr-2" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name:  'Tất Cả',
        to: '/admin/system/order/all',
        icon: <FontAwesomeIcon icon={faListUl} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  'Đã Xác Nhận',
        to: '/admin/system/order/confirmed',
        icon: <FontAwesomeIcon icon={faCheck} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Chưa Xác Nhận',
        to: '/admin/system/order/unconfirmed',
        
        icon: <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />,
      },
      
    ]

  },
  {
    _tag: 'CSidebarNavItem',
    name:  'Tin Tức',
    to: '/admin/system/news',
    icon: <FontAwesomeIcon icon={faNewspaper} className="mr-2" />,
    
  },
  {
    _tag: 'CSidebarNavItem',
    name:  'Khuyến Mãi',
    to: '/admin/system/discount',
    icon: <FontAwesomeIcon icon={faPercent} className="mr-2" />,
    
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản Lý']
  },
  {
    _tag: 'CSidebarNavItem',
    name:  'Thống Kê Doanh Số',
    to: '/admin/manage/statistical',
    icon: <FontAwesomeIcon icon={faChartLine} className="mr-2" />,
    
  },
  {
    _tag: 'CSidebarNavDropdown',
    name:  'Nhập/Xuất Kho',
    route: '/admin/manage',
    icon: <FontAwesomeIcon icon={faWarehouse} className="mr-2" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name:  'Đặt Hàng',
        to: '/admin/manage/order-product',
        icon: <FontAwesomeIcon icon={faPaperPlane} className="mr-2"  />,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  'Nhập Hàng',
        to: '/admin/manage/import-product',
        icon: <FontAwesomeIcon icon={faFileImport} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  'Thống Kê',
        to: '/admin/manage/statistical-order-import',
        icon: <FontAwesomeIcon icon={faChartBar} className="mr-2" />,
      },
    ]

  },
  {
    _tag: 'CSidebarNavDropdown',
    name:  'Quản Lý Menu',
    route: '/admin/manage/cate',
    icon: <FontAwesomeIcon icon={faGripHorizontal} className="mr-2" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name:  'Đối Tượng',
        to: '/admin/manage/objects',
        icon: <FontAwesomeIcon icon={faBars} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  'Loại Sản Phẩm',
        to: '/admin/manage/sectors',
        icon: <FontAwesomeIcon icon={faGripLines} className="mr-2" />,
      },
      {
        _tag: 'CSidebarNavItem',
        name:  'Danh Mục',
        to: '/admin/manage/categories',
        icon: <FontAwesomeIcon icon={faMinus} className="mr-2" />,
      },
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name:  'Sản Phẩm',
    to: '/admin/manage/products',
    icon: <FontAwesomeIcon icon={faTshirt} className="mr-2" size="lg"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Màu',
    to: '/admin/manage/color',
    icon: <FontAwesomeIcon icon={faPalette} className="mr-2" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name:  'Kích Cỡ',
    to: '/admin/manage/size',
    icon: <FontAwesomeIcon icon={faDraftingCompass} className="mr-2" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Nhân Viên',
    to: '/admin/manage/staffs',
    icon: <FontAwesomeIcon icon={faIdCard} className="mr-2" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Khách Hàng',
    to: '/admin/manage/customers',
    icon: <FontAwesomeIcon icon={faUsers} className="mr-2" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Phân Quyền',
    to: '/admin/account',
    icon: <FontAwesomeIcon icon={faUserCog} className="mr-2" />,
    
  },
  
  
]

export default _nav
