import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import logo from '../assets/logo_uq_01.jpg';
// sidebar nav config
import navigation from './_nav';
import navigationStaff from './_navStaff';
const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  var sessionUser = JSON.parse(sessionStorage.getItem("user"));
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none " to="/">
        <img src={logo} className="c-sidebar-brand-full mr-2" height={35} />
        <h3 className="c-sidebar-brand-full text-danger font-weight-bolder" height={35} >Uniqlo Admin</h3>
        <img src={logo} className="c-sidebar-brand-minimized" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={sessionUser.role === 0 ? navigation : navigationStaff}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
