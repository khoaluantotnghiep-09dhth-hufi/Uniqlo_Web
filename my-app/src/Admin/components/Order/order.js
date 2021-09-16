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


const fields = [
  "index",
  "id",
  "date",
  "address",
  "email",
  "phone",
  "total",
   'status',
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
