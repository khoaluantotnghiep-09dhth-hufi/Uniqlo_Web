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
  faKey,
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
  function onChangePassword() {
    <Route to="/admin/change-password" />

  }


  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={true}>
        <div className="mr-5 c-avatar">
          <CImg
            src={sessionUser.image}
            className="c-avatar-img"
          />
          <p className="mt-3 ml-2"> {sessionUser && sessionUser.name}</p>
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
        <CDropdownItem  >
          <Link to="/admin/profile" style={{ color: 'black' }}>
            <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />Thông Tin
          </Link>
        </CDropdownItem>
        <CDropdownItem onClick={onChangePassword}>
          <Link to="/admin/change-password" style={{ color: 'black' }}>
            <FontAwesomeIcon icon={faKey} size="lg" className="mr-2" />Đổi Mật Khẩu
          </Link>
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
