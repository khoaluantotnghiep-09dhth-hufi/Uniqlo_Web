import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import { Alert } from "react-bootstrap";
import Moment from "react-moment";

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
import { faCheck, faTimes, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
const headers = [
  { label: "Mã", key: "id" },
  { key: "name_customer", label: "Khách Hàng" },
  { key: "order_date", label: "Ngày Đặt" },
  { key: "delivery_date", label: "Ngày Giao" },
  { key: "address", label: "Địa Chỉ" },
  { key: "phone", label: "Số Điện Thoại" },
  { key: "email", label: "Email" },
  { key: "total_quantity", label: "Tổng Số Lượng" },
  { key: "total", label: "Tổng Tiền" },
  { key: "status", label: "Trạng Thái" },
];
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});
const options = { dateStyle: "short" };
const fields = [
  {
    key: "index",
    label: "STT",
    _style: { width: '1%' },
    sorter: false,
    filter: false

  },
  {
    key: "id",
    label: "Mã HD",
    _style: { width: '1%' },
    sorter: false,
    filter: false

  },
  {
    key: "order_date",
    label: "Ngày Đặt Hàng"

  },
  {
    key: "delivery_date",
    label: "Ngày Giao Hàng"
  },
  {
    key: "name_customer",
    label: "Tên Khách Hàng"
  },
  {
    key: "address",
    label: "Địa Chỉ"
  },
  {
    key: "phone",
    label: "SDT"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "total_quantity",
    label: "Tổng Số Lượng",
    _style: { width: '1%' },
  },
  {
    key: "total",
    label: "Tổng Tiền"
  },
  {
    key: "note",
    label: "Ghi Chú"
  },
  {
    key: "status",
    label: "Tình Trạng",
    _style: { width: '1%' },
    filter: false

  },
  {
    key: "Hành Động",
    label: "Hành Động",
    _style: { width: '1%' },
    filter: false

  },
];

class ListOrder extends React.Component {
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

    var dataBill = bill.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        {/* <Link to="/admin/system/news/add">
                    <CButton type="button" className="btn btn-danger">
                        Thêm Mới
                    </CButton>
                </Link> */}
        <CSVLink
          className="btn btn-success"
          data={dataBill} headers={headers}>
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
          Xuất Excel
        </CSVLink>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Đơn Hàng</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataBill}
                  fields={fields}
                  itemsPerPage={5}
                  sorter
                  columnFilter
                  pagination
                  scopedSlots={{
                    "Hành Động": (item) => (
                      <td>
                        {item.status === 0 ?
                          <Link to={`/admin/system/order/${item.id}/edit`}>
                            <CButton type="button" className="btn btn-primary">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="mr-2"
                                size="lg"
                              />
                              Xác Nhận Đơn
                            </CButton>
                          </Link>
                          : ''}
                        {item.status === 0 ?
                          <CButton
                            type="button"
                            className="btn btn-warning"
                            onClick={() => {
                              this.onDeleteBill(item.id);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="mr-2"
                              size="lg"
                            />
                            Hủy Đơn
                          </CButton>
                          : ''}
                      </td>
                    ),
                    status: (item) => (
                      <td>
                        <Alert variant={this.getBadge(item.status)}>
                          {item.status === 0 ? "Chưa Xác Nhận" : "Đã Xác Nhận"}
                        </Alert>
                      </td>
                    ),

                    total: (item) => <td>{formatter.format(item.total)}</td>,

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
                ></CDataTable>
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
export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
