import React from 'react';
import uniqid from "uniqid";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
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
    this.state = {
      idItem: "",
      txtDate: this.getCurrentDate(),
      txtHouse: "",
    }
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemOrder(match.params.id_order_product);

  }
  getCurrentDate(separator = '/') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.order) {
      var { order } = NextProps;
      if (match.params.id_order_product) {
        const result = order.find((o) => o.id === match.params.id_order_product);
        this.setState({
          idItem: result.id,
          txtDate: result.date_order,
          txtHouse: result.name_warehouse,
        });
      }
    }
  }
  onChange = (e, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = e.target.value;
    this.setState({
      ...coppyState
    }, () => {
      console.log(this.state);
    })


  }
  onSubmitForm = (event) => {
    var { match } = this.props;

    event.preventDefault();
    var { history } = this.props;
    var { idItem, txtDate, txtHouse } = this.state;

    var order = {
      id: uniqid("order-"),
      date_order: txtDate,
      name_warehouse: txtHouse,

    };
    var orderUpdate = {
      id: match.params.id_order_product,
      date_order: txtDate,
      name_warehouse: txtHouse,
    };

    if (match.params.id_order_product) {
      this.props.onUpdateItemOrder(orderUpdate);
      history.goBack();
    } else {
      this.props.onAddItemOrder(order);
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
    let { txtDate, txtHouse, txtStatus } = this.state;
    var { match } = this.props;
    return (
      <CContainer fluid>
        <CRow>
          <Link to="/admin/manage/order-product">
            <CButton type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />Trở về
            </CButton>
          </Link>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CRow sm="12">
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="exampleFormControlInput2">Kho</CLabel>
                    <CInput
                      type="text"
                      id="txtHouse"
                      name="txtHouse"
                      placeholder="Kho..."
                      value={txtHouse}
                      onChange={(e) => { this.onChange(e, 'txtHouse') }}
                    />
                  </CFormGroup>
                </CCol>

                <CFormGroup >
                  <CButton
                    color='danger'
                    className="m-2"
                    onClick={this.onSubmitForm}
                  >  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
                    Thêm
                  </CButton>
                </CFormGroup>

              </CRow>
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