import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faTools } from "@fortawesome/free-solid-svg-icons";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
};

const fields = [
  'STT',
  { key: 'id', label: 'Mã Khách Hàng' },
  { key: 'name', label: 'Tên' },
  { key: 'address', label: 'Địa Chỉ' },
  { key: 'phone', label: 'SĐT' },
  { key: 'image', label: 'Ảnh' },
  { key: 'password', label: 'Mật Khẩu' },
  { key: 'email', label: 'Gmail' },
  "Thao Tác",
];

class ListCustomers extends React.Component {
  componentDidMount() {
    this.props.fetchCustomers();
  }
  onDeleteCustomer = (item) => {
    this.props.onDeleteItemCustomer(item);
  }


  render() {
    var { customer } = this.props;
    var dataCustomer = customer.map((item, index) => {
      return item;
    });
    return (
      <>
        {/* <Route to="/admin/system/discount/add"><CButton className="btn btn-danger" >Thêm Khuyến Mãi Mới</CButton></Route> */}
        <Link to="/admin/manage/customer/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
          </CButton>
        </Link>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>
                Danh Sách Khách Hàng
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataCustomer}
                  fields={fields}
                  itemsPerPage={8}
                  pagination
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  }}
                  scopedSlots={{
                    "Thao Tác":
                      (item) => (
                        <td>
                          <Link to={`/admin/manage/customer/${item.id}/edit`}>
                            <CButton type="button" className="btn btn-primary">
                              <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                            </CButton>
                          </Link>

                          <CButton type="button"
                            onClick={() => {
                              this.onDeleteCustomer(item.id);
                            }}
                            className="btn btn-warning">
                            <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                          </CButton>

                        </td>
                      ),
                    "STT":
                      (item, index) => (
                        <td>
                          {index + 1}
                        </td>
                      ),
                    'image':
                      (item, index) => (
                        <td>
                          <Image src={item.image} thumbnail />
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
    customer: state.customer,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCustomers: () => {
      return dispatch(actions.fetchCustomerResquest());
    },
    onDeleteItemCustomer: (id) => {
      return dispatch(actions.onDeleteCustomerResquest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCustomers);
