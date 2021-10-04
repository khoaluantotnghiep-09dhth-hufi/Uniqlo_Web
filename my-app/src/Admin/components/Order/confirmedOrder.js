import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

const fields = [

  { key: "index", label: "STT" },
  { key: "order_date", label: "Ngày Đặt Hàng" },
  { key: "delivery_date", label: "Ngày Giao Hàng" },
  { key: "name_customer", label: "Tên Khách Hàng" },
  { key: "address", label: "Địa Chỉ" },
  { key: "phone", label: "SDT" },
  { key: "email", label: "Email" },
  { key: "total_quantity", label: "Tổng Số Lượng" },
  { key: "total", label: "Tổng Tiền" },
  { key: "note", label: "Ghi Chú" },
  { key: "status", label: "Tình Trạng" },
];



class OrderConfirmed extends React.Component {
  componentDidMount() {
    this.props.fetchBills();
  }
  onDeleteBill = (item) => {
    this.props.onDeleteItemBill(item);
  };
  getBadge = (status) => {
    switch (status) {
      case 1:
        return "success";
      case 0:
        return "danger";
      default:
        return "primary";
    }
  };
  render() {
    var { bill } = this.props;

    var dataBill = bill
      .filter((bill) => bill.status === 1)
      .map((item, index) => {
        return { ...item, index };
      });
    return (
      <>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Đơn Hàng Đã Xác Nhận</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataBill}
                  fields={fields}
                  itemsPerPage={5}
                  sorter
                  pagination
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        <Alert variant={this.getBadge(item.status)}>
                          {item.status === 0 ? 'Chưa Xác Nhận' : 'Đã Xác Nhận'}
                        </Alert>
                      </td>
                    ),
                    order_date: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.order_date}</Moment>
                      </td>
                    ),

                    delivery_date: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {item.delivery_date}
                        </Moment>
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
    bill: state.bill,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBills: () => {
      return dispatch(actions.fetchBillResquest());
    },
    onDeleteItemBill: (id) => {
      return dispatch(actions.onDeleteBillResquest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmed);
