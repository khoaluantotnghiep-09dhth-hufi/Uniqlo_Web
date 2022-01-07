import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import { Alert } from "react-bootstrap";
import Moment from "react-moment";
import Call_API from "./../../utils/Callapi";

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
import {
  faCheck,
  faTimes,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
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
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "id",
    label: "Mã HD",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "order_date",
    label: "Ngày Đặt Hàng",
  },
  {
    key: "delivery_date",
    label: "Ngày Giao Hàng",
  },
  {
    key: "name_customer",
    label: "Tên Khách Hàng",
  },
  {
    key: "address",
    label: "Địa Chỉ",
  },
  {
    key: "phone",
    label: "SDT",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "total_quantity",
    label: "Tổng Số Lượng",
    _style: { width: "1%" },
  },
  {
    key: "total",
    label: "Tổng Tiền",
  },
  {
    key: "note",
    label: "Ghi Chú",
  },
  {
    key: "status",
    label: "Tình Trạng",
    _style: { width: "1%" },
    filter: false,
  },
  {
    key: "Hành Động",
    label: "Hành Động",
    _style: { width: "1%" },
    filter: true,
  },
];

class ListOrder extends React.Component {
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
  // componentWillUnmount() {
  //   var { bill } = this.props;

  //   this.props.onResetOrder(bill);
  // }
  onDeleteBill = (item) => {
    this.props.onDeleteItemBill(item);
  };
  getBadge = (status) => {
    switch (status) {
      case 0:
        return "danger";
      case 1:
        return "success";
      case 2:
        return "secondary";
      case 3:
        return "info";
      case 4:
        return "white";
      case 5:
        return "warning";
      case 6:
        return "warning";
      default:
        return "primary";
    }
  };
  render() {
    var { dataBills, isLoading } = this.state;
    // if (dataBills === undefined) {
    //   var dataBill = [];
    // } else {
      
    // }
    var dataBill = dataBills.map((item, index) => {
   
      return { ...item, index};
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
    ) : (
      <>
        {/* <Link to="/admin/system/news/add">
                  <CButton type="button" className="btn btn-danger">
                      Thêm Mới
                  </CButton>
              </Link> */}
        <CSVLink className="btn btn-success" data={dataBill} headers={headers}>
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
                        <Link to={`/admin/system/order/${item.id}/detail`}>
                          <CButton type="button" className="btn btn-info">
                            Chi Tiết
                          </CButton>
                        </Link>
                        {item.status === 4 ? (
                          ""
                        ) : (
                          <Link
                            to={`/admin/system/order/${item.id}/${item.status}/edit`}
                          >
                            <CButton type="button" className="btn btn-primary">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="mr-2"
                                size="lg"
                              />
                              Cập Nhật
                            </CButton>
                          </Link>
                        )}

                        {item.status === 0 ? (
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
                        ) : (
                          ""
                        )}
                      </td>
                    ),
                    status: (item) => (
                      <td>
                        <Alert variant={this.getBadge(item.status)}>
                          {item.status === 0
                            ? "Chưa Xác Nhận"
                            : item.status === 1
                            ? "Đã Xác Nhận"
                            : item.status === 2
                            ? "Chờ Lấy Hàng"
                            : item.status === 3
                            ? "Chờ Giao"
                            : item.status === 4
                            ? "Đã Giao"
                            : item.status === 5
                            ? "Yêu Cầu Đổi/Trả"
                            : item.status === 6
                            ? "Đã Hủy"
                            : "Trạng Thái Không Tồn Tại"}
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
    
    onDeleteItemBill: (id) => {
      return dispatch(actions.onDeleteBillResquest(id));
    },
    onResetOrder: (order) => {
      return dispatch(actions.onRestOrder(order));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
