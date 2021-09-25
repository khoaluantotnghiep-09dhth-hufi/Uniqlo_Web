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
const isCheckSignOut = false;
const [check, setCheck] = useState({isCheckSignOut : false});
const onSignOut = () => {
  sessionStorage.clear("user");
  localStorage.clear();
  setCheck(true);
};
const TheHeaderDropdown = () => {
  var sessionUser = JSON.parse(sessionStorage.getItem("user"));
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
          <p> {sessionUser.name}</p>
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
        <CDropdownItem>
          <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />Thông Tin Tài Khoản
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
        <CDropdownItem>
          <CButton
            type="submit"
            variant="outline-secondary"
            size="sm"
            style={{ margin: 0 }}
            onClick={onSignOut}
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
            Đăng Xuất
          </CButton>{" "}

        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
