import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
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
  "index",
  "id",
  "date",
  "address",
  "email",
  "phone",
  "total",
  "status",
  "Hành Động",
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
      case 0:
        return "success";
      case 1:
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
                  itemsPerPage={8}
                  pagination
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        <Alert variant={this.getBadge(item.status)}>
                          {item.status === 0 ? "Đã Xác Nhận" : "Chưa Xác Nhận"}
                        </Alert>
                      </td>
                    ),
                    "Hành Động": (item) => (
                      <td>
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
                          Xóa
                        </CButton>
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
