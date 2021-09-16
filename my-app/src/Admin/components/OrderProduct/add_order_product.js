import React from 'react';
import uniqid from "uniqid";
import { connect } from "react-redux";
import * as actions from "./../../../actions/orderActions";
import { Link } from "react-router-dom";
import {
  CForm,
  CLabel,
  CContainer,
  CInput,
  CCol,

  CRow,
  CFormGroup,
  CButton,

} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
class addOrderProduct extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      idItem: "",
      txtDate: "",
      txtHouse: "",
      txtStatus: "",

    });
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemOrder(match.params.id_order);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.order) {
      var { order } = NextProps;
      if (match.params.id_order) {
        const result = order.find(
          (o) => o.id === match.params.id_order
        );

        this.setState({
          idItem: result.id,
          txtDate: result.date_order,
          txtHouse: result.name_warehouse,
          txtStatus: result.status,
        });
      }
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmitForm = (event) => {
    var { match } = this.props;

    event.preventDefault();
    var { history } = this.props;
    var { idItem, txtDate, txtHouse, txtStatus } = this.state;

    var order = {
      id: uniqid("order-"),
      date: txtDate,
      house: txtHouse,
      status: txtStatus,

    };
    var orderUpdate = {
      id: idItem,
      date: txtDate,
      house: txtHouse,
      status: txtStatus,
    };

    if (idItem) {
      this.props.onUpdateItemOrder(orderUpdate);
      history.goBack();
    } else {
      this.props.onAddItemOrder(order);
      alert("Thêm thành công !");
      history.goBack();
    }
  };
  state = {
    datetime: `${new Date().getFullYear()}-${`${new Date().getMonth() +
      1}`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
        2,
        0
      )}T${`${new Date().getHours()}`.padStart(
        2,
        0
      )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`
  };

  render() {
    return (
      <CContainer fluid>
        <CRow>
        <Link to="/admin/manage/order-product">
                  <CButton type="button" className="btn btn-primary" size="sm">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg"/>Trở về
                  </CButton>
                </Link>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">Ngày Lập</CLabel>
                <CInput
                  type="datetime-local"
                  id="txtDate"
                  name="txtDate"
                 onChange={this.onChange}
                />

              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput2">Kho</CLabel>
                <CInput
                  type="text"
                  id="txtHouse"
                  name="txtHouse"
                  placeholder="Kho..."
                  onChange={this.onChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Trạng Thái</CLabel>
                <CInput
                  type="number"
                  id="txtStatus"
                  name="txtStatus"
                  placeholder="Trạng thái..."
                  onChange={this.onChange}
                />
                <CLabel htmlFor="nf-password">0 = Chưa Giao</CLabel>
              </CFormGroup>
              <CFormGroup >
                <CButton 
                color='danger' 
                className="m-2" 
                onClick={this.onSubmitForm}
                >  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" /> Thêm</CButton>
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    )
  }
}
var mapStateToProps = (state) => {
  return {
    order: state.order,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemOrder: (order) => {
      dispatch(actions.onAddOrderResquest(order));
    },
    onEditItemOrder: (id) => {
      dispatch(actions.onEditOrderResquest(id));
    },
    onUpdateItemOrder: (order) => {
      dispatch(actions.onUpdateOrderResquest(order));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addOrderProduct)