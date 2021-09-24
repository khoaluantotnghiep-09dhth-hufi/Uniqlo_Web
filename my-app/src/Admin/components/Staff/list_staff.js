import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faTools } from "@fortawesome/free-solid-svg-icons";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const fields = [
  "STT",
  { key: "id", label: "Mã Nhân Viên" },
  { key: "name", label: "Tên" },
  { key: "email", label: "Gmail" },
  { key: "phone", label: "SĐT" },
  { key: "address", label: "Địa Chỉ" },

  { key: "postion", label: "Chức Vụ" },
  "Hành Động",
];

class ListStaffs extends React.Component {
  componentDidMount() {
    this.props.fetchStaffs();
  }
  onDeleteStaff = (item) => {
    this.props.onDeleteItemStaff(item);
  };
  render() {
    var { staff } = this.props;

    var dataStaff = staff.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        {/* <Route to="/admin/system/discount/add"><CButton className="btn btn-danger" >Thêm Khuyến Mãi Mới</CButton></Route> */}
        <Link to="/admin/manage/staff/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
            Thêm Mới
          </CButton>
        </Link>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Nhân Viên</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataStaff}
                  fields={fields}
                  itemsPerPage={8}
                  pagination
                  scopedSlots={{
                    "Hành Động": (item) => (
                      <td>
                        <Link to={`/admin/manage/staff/${item.id}/edit`}>
                          <CButton type="button" className="btn btn-primary">
                            <FontAwesomeIcon
                              icon={faTools}
                              className="mr-2"
                              size="lg"
                            />
                            Sửa
                          </CButton>
                        </Link>

                        <CButton
                          type="button"
                          className="btn btn-warning"
                          onClick={() => {
                            this.onDeleteStaff(item.id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="mr-2"
                            size="lg"
                          />
                          Xóa
                        </CButton>
                      </td>
                    ),
                    STT: (item, index) => <td>{index + 1}</td>,
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
    },
    onDeleteItemStaff: (id) => {
      return dispatch(actions.onDeleteStaffsResquest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListStaffs);
