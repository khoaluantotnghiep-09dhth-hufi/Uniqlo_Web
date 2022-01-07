import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { CSVLink } from "react-csv";
import Call_API from "./../../utils/Callapi";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});
const headers = [
  { label: "Mã", key: "id" },
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
  "Hành Động",
];



class WaitConfirmedOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBills: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    Call_API("bills", "GET", null)
      .then((response) => {
        console.log(response.data);
        this.setState({
          dataBills: response.data,
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
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
    var { dataBills, isLoading } = this.state;


    var dataBill = dataBills
      .filter((bill) => bill.status === 0)
      .map((item, index) => {
        return { ...item, index };
      });
    return isLoading ? (
      <div className="adjust_Loading">
        <button class="btn btn-danger" type="button" disabled>
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    ) :(
      <>
        <CSVLink
          className="btn btn-success"
          data={dataBill} headers={headers}>
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
          Xuất Excel
        </CSVLink>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Đơn Hàng Chưa Xác Nhận</CCardHeader>
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
                    "Hành Động": (item) => (
                      <td>
                        <Link to={`/admin/system/order/${item.id}/detail`}>
                          <CButton type="button" className="btn btn-info">
                            Chi Tiết
                          </CButton>
                        </Link>
                        {item.status === 0 ?
                        <Link to={`/admin/system/order/${item.id}/${item.status}/edit`}>
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
                    order_date: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.order_date}</Moment>
                      </td>
                    ),
                    total: (item) => <td>{formatter.format(item.total)}</td>,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitConfirmedOrder);
