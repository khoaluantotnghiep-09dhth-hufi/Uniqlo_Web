import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import {Alert} from 'react-bootstrap'
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
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});
const options = { dateStyle: 'short' };
const fields = [
  
  { key: "index", label:"STT" },
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

class ListOrder extends React.Component {
  componentDidMount() {
    this.props.fetchBills();
  }
  onDeleteBill = (item) => {
    this.props.onDeleteItemBill(item);
  };
    getBadge=(status) => {
      switch (status) {
          case 1: return 'success'
          case 0: return 'danger'
          default: return 'primary'

        }
    }
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
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Đơn Hàng</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataBill}
                  fields={fields}
                  itemsPerPage={8}
                  pagination
                
                  scopedSlots={{
                    "Hành Động": (item) => (
                      <td>
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
                      </td>
                    ),
                    "status": (item) => (
                      <td>
                        <Alert  variant={this.getBadge(item.status)}>
                       
                        {  item.status===0?'Chưa Xác Nhận':'Đã Xác Nhận'}
                        </Alert>

                       
                      </td>
                    ),
                    
                    "total": (item) => (
                      <td>
                       {formatter.format(item.total)}
                       
                      </td>
                    ),
                    
                    "order_date": (item) => (
                      <td>
                       {item.order_date.toLocaleString("en-NZ",options)}
                       
                      </td>
                    ),
                    
                    "delivery_date": (item) => (
                      <td>
                       {item.delivery_date.toLocaleString("en-NZ",options)}
                       
                      </td>
                    ),
                  }}
                >

                    
                </CDataTable>
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
