import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import { connect } from 'react-redux';
class index extends Component {
  componentDidMount() {
    this.props.fetchBillsCustomer();
  }
  showItemTable = (bills_customer) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
    var result = null;
    result = bills_customer.map((item, index) => {
      return <tr>
        <td>{index}</td>
        <td>{item.date}</td>
        <td>{item.address}</td>
        <td>{formatter.format(item.total)}</td>
        <td>{item.status == 0 ? 'Chưa Nhận Hàng' : 'Đã Nhận Hàng'}</td>
      </tr>
    })
    return result;
  }
  render() {
    var { bills_customer } = this.props;
    return (
      <React.Fragment>

        {this.showItemTable(bills_customer)}
      </React.Fragment>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    bills_customer: state.bills_customer,
  }
}
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBillsCustomer: () => {
      dispatch(actions.fetchBillsCustomerResquest());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);