import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Call_API from "./../../utils/Callapi";
import { Image } from 'react-bootstrap';
import './detailOrder.scss'
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
const headers = [
  { key: "index", label: "STT" },
  { key: "order_date", label: "Ngày Đặt Hàng" },
  { key: "delivery_date", label: "Ngày Giao Hàng" },
  { key: "name", label: "Tên  Phẩm" },
  { key: "image", label: "Hình Ảnh" },
  { key: "nameColor", label: "Màu" },
  { key: "nameSize", label: "Kích Cỡ" },
  { key: "quantity", label: "Tổng Số Lượng" },
  { key: "priceProduct", label: "Giá Sản Phẩm" },

  { key: "into_money", label: "Tổng Tiền" },
];
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});
const fields = [

  { key: "index", label: "STT" },
  { key: "order_date", label: "Ngày Đặt Hàng" },
  { key: "delivery_date", label: "Ngày Giao Hàng" },
  { key: "name", label: "Tên  Phẩm" },
  { key: "image", label: "Hình Ảnh" },
  { key: "nameColor", label: "Màu" },
  { key: "nameSize", label: "Kích Cỡ" },
  { key: "quantity", label: "Tổng Số Lượng" },
  { key: "priceProduct", label: "Giá Sản Phẩm" },

  { key: "into_money", label: "Tổng Tiền" },

];



class detailOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDetailOrder: []
    }
  }
  componentDidMount() {
    var { match } = this.props;

    Call_API(`bills-detail/${match.params.id_order}`, "GET", null).then((response) => {
      this.setState({
        arrDetailOrder: response.data,
      })
    })
  }


  render() {
    var { arrDetailOrder } = this.state;
    var data = arrDetailOrder.map((item, index) => {
      return { ...item, index };
    });

    return (
      <>
        <CSVLink
          className="btn btn-success"
          data={data} headers={headers}>
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
          Xuất Excel
        </CSVLink>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Chi Tiết Đơn Hàng</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={data}
                  fields={fields}
                  itemsPerPage={5}
                  sorter
                  pagination
                  scopedSlots={{
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
                    "image":
                      (item, index) => (
                        <td>
                          <Image  src={item.image} thumbnail />
                        </td>
                      ),
                      "priceProduct":(item, index) => (
                        <td>{formatter.format(item.priceProduct)}</td>
                      ),
                    "into_money":(item, index) => (
                        <td>{formatter.format(item.into_money)}</td>
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

// var mapDispatchToProps = (dispatch, props) => {
//   return {
//     fetchBills: () => {
//       return dispatch(actions.fetchBillResquest());
//     },
//     onDeleteItemBill: (id) => {
//       return dispatch(actions.onDeleteBillResquest(id));
//     },
//   };
// };
export default connect(null, null)(detailOrder);
