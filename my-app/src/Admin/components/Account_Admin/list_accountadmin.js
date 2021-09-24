import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { faPlus, faTimes, faTools } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fields = [
  "STT",
  { key: "id", label: "Mã Nhân Viên" },
  { key: "name", label: "Tên" },
  { key: "phone", label: "SĐT" },
  { key: "postion", label: "Vị Trí" },
  { key: "password", label: "Mật Khẩu" },

  "Hành Động",
];

class List_Customers extends React.Component {
  componentDidMount() {
    this.props.fetchStaffs();
  }
  

  render() {
    var { staff } = this.props;

    var dataStaff = staff.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Tài Khoản Admin</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataStaff}
                  fields={fields}
                  itemsPerPage={8}
                  pagination
                  scopedSlots={{
                    
                    "STT":
                      (item, index) => (
                        <td>
                          {index + 1}
                        </td>
                      ),
                  
                    "Hành Động": (item) => (
                      <td>
                        <Link to={`/admin/account/${item.id}/edit`}>
                          <CButton type="button" className="btn btn-primary">
                            <FontAwesomeIcon
                              icon={faTools}
                              className="mr-2"
                              size="lg"
                            />
                            Cập Nhật
                          </CButton>
                        </Link>
                      </td>
                    ),
                    postion: (item) => (
                      <td>
                        {item.postion === "1" ? "Quản Lý" : "Nhân Viên Bán Hàng"}
                      </td>
                    ),
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    staff: state.staff,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchStaffs: () => {
      return dispatch(actions.fetchStaffsResquest());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(List_Customers);
