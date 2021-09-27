import React, { useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullseye,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Login from "../screens/Login/index";
import { useHistory, Route, Link, Redirect } from 'react-router-dom';
const TheHeaderDropdown = () => {
  let isLogOut = false;
  const history = useHistory();
  var sessionUser = JSON.parse(sessionStorage.getItem("user"));
  function adminProfile() {
    if (sessionStorage.length !== 0) {
      return <Route to='/admin/manage/categories' />
    }
  }
  function onSignOut() {
    sessionStorage.clear();
    // if (sessionStorage.length === 0) {
    //   return <Redirect push to={{ path: "/admin" }} />;
    // }

    window.location.href = "/admin";
  };
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="mr-5 c-avatar">
          <CImg
            src={'https://cdn2.iconfinder.com/data/icons/soleicons-solid-vol-2/64/admin_system_sysadmin_administrator_manager_supervisor-512.png'}
            className="c-avatar-img"
            alt="adminuniqlo@gmail.com"

          />
          <p> {sessionUser && sessionUser.name}</p>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Cá Nhân</strong>
        </CDropdownItem>
        <CDropdownItem onClick={adminProfile}>
          <Link to="/admin/profile">
            <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />Thông Tin Tài Khoản
          </Link>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={onSignOut}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
          Đăng Xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
