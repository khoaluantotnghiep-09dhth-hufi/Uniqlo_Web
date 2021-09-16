import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
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
import { Link } from "react-router-dom";
import usersData from "../User/UserData";

// const getBadge = status => {
//     switch (status) {
//         case 'Active': return 'success'
//         case 'Inactive': return 'secondary'
//         case 'Pending': return 'warning'
//         case 'Banned': return 'danger'
//         default: return 'primary'
//     }
// }
const fields = [
  "STT",
  { key: 'id', label: 'Mã' },
  { key: 'name', label: 'Tên' },
   "Hành Động"
  ];

class ListColor extends React.Component {
  componentDidMount() {
    this.props.fetchSizes();
  }
  onDeleteSize = (item) => {
    this.props.onDeleteItemSize(item);
  };
  render() {
    var { size } = this.props;

    var dataSize = size.map((item, index) => {
      return {...item,index};
    });
    return (
      <>
        <Link to="/admin/manage/size/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
            Thêm Mới
          </CButton>
        </Link>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Kích Cỡ</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataSize}
                  fields={fields}
                  itemsPerPage={8}
                  pagination
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        {/* <CBadge color={getBadge(item.status)}>
                                                        {item.status}
                                                    </CBadge> */}
                      </td>
                    ),
                  }}
                  scopedSlots={{
                    "Hành Động": (item) => (
                      <td>
                     <Link to={`/admin/manage/size/${item.id}/edit`}>
                          <CButton type="button" className="btn btn-primary">
                            <FontAwesomeIcon
                              icon={faTools}
                              className="mr-2"
                              size="lg"
                            />
                            Sửa
                          </CButton>
                        </Link>
                      
                          <CButton type="button" className="btn btn-warning"
                            onClick={()=>{this.onDeleteSize(item.id)}}
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
                    "STT":
                      (item, index) => (
                        <td>
                          {index + 1}
                        </td>
                      )
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
    size: state.size,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchSizes: () => {
      return dispatch(actions.fetchSizeResquest());
    },
    onDeleteItemSize: (id) => {
      return dispatch(actions.onDeleteSizeResquest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListColor);
