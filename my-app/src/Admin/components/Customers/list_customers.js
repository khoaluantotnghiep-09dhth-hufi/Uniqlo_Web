import React from 'react'
import Call_API from "./../../utils/Callapi";

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
import { faPlus, faTimes, faTools, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";
const headers = [
  { label: "Mã", key: "id" },
  { label: "Tên Nhân Viên", key: "name" },
  { label: "Giới Tính", key: "gender" },
  { label: "Email", key: "email" },
  { label: "Số Điện Thoại", key: "phone" },
  { label: "Địa Chỉ", key: "address" },
];
const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
};
const getBadgeGender = (status) => {
  switch (status) {
    case 0: return 'Nam'
    case 1: return 'Nữ'
    case 2: return 'Khác'
    default: return 'Khác'
  }
};
const fields = [
  {
    key: 'STT',
    label: 'STT',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  {
    key: 'name',
    label: 'Tên',
    _style: { width: '15%' },
  },
  { key: "address", label: "Địa Chỉ", filter: false },
  { key: "phone", label: "SĐT", _style: { width: '8%' } },
  { key: "email", label: "Gmail" },
  {
    key: "gender",
    label: "Giới Tính",
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
  { key: "image", label: "Ảnh", filter: false, sorter: false, },

  {
    key: 'Thao Tác',
    label: 'Thao Tác',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  },
];

class ListCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.props.fetchCustomers();
    // Call_API("customers", "GET", null)
    //   .then((response) => {
       
    //     this.setState({
    //       data: response.data,
    //       isLoading: false,
    //     });
    //   })
    //   .catch((error) => console.log(error));
  }
  onDeleteCustomer = (item) => {
    if (confirm("Bạn chắc chắn muốn xóa ?")) {  //eslint-disable-line
      this.props.onDeleteItemCustomer(item);
    }
  };
  render() {
    var { data } = this.state;
    var { customer } = this.props;

    var dataCustomer = customer.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        {/* <Route to="/admin/system/discount/add"><CButton className="btn btn-danger" >Thêm Khuyến Mãi Mới</CButton></Route> */}
        <Link to="/admin/manage/customer/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
          </CButton>
        </Link>
        <CSVLink
          className="btn btn-success"
          data={dataCustomer} headers={headers}>
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
          Xuất Excel
        </CSVLink>
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
                  itemsPerPage={5}
                  sorter
                  columnFilter
                  itemsPerPageSelect
                  pagination
                  footer
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
                      ),
                    'gender':
                      (item, index) => (
                        <td>
                          {getBadgeGender(item.gender)}
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
