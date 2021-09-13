import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import {connect} from 'react-redux';
import Item_Table from './../Item_Table/index';
class index extends Component {
    render() {
        return (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Ngày</th>
                <th>Chuyển đến</th>
                <th>Giá trị đơn hàng</th>
                <th>Tình trạng thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>1</td>
                <td>20/4/2021</td>
                <td>20,Phường 12, Quận Gò Vấp, Tp.HCM</td>
                <td>400.000đ</td>
                <td>Đã Thanh Toán</td>
              </tr> */}
              <Item_Table></Item_Table>
            </tbody>
          </Table>
        );
    }
}
var mapStateToProps = (state) => {
  return {
    bills_customer: state.bills_customer,
  }
}
var mapDispatchToProps = (dispatch, props)=>{
  return {
    fetchBillsCustomer: ()=>{
      dispatch(actions.fetchBillsCustomerResquest());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);