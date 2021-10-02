import React from "react";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import * as actions from "./../../../actions/index";
import {
  CForm,
  CLabel,
  CContainer,
  CInput,
  CCol,
  CRow,
  CFormGroup,
  CButton,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
class updateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtDate: "",
      txtConfirm: "",
    };
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemBill(match.params.id_order);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.bill) {
      var { bill } = NextProps;
      if (match.params.id_order) {
        this.setState({
          idItem: bill.id,
          txtDate: bill.date,
          txtConfirm: bill.status,
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
  isCheckForm = () => {
    var data = ["txtDate", "txtConfirm"];
    var isCheckForm = true;
    for (var i = 0; i <= data.length; i++) {
      if (!this.state[!data[0]]) {
        isCheckForm = false;
        toast.error("Vui Lòng Nhập Dữ Liệu!");
        break;
      }
    }
    return isCheckForm;
  };
  onSubmitForm = (event) => {
    var { match, bill } = this.props;

    event.preventDefault();
    var { history } = this.props;
    var { idItem, txtDate, txtConfirm } = this.state;
    // let dateNow = new Date().toISOString().slice(0, 10);
    var today = new Date();
    var date =
      today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));
    var convertDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();
  var billUpdate = {
    id: match.params.id_order,
    id_staff: sessionUser.id_user,
    delivery_date: convertDate,
    status: txtConfirm,
  };
  console.log(billUpdate);
    if (match.params.id_order && txtDate >= date) {
     
      this.props.onUpdateItemBill(billUpdate);
      history.goBack();
    } else {
      toast.error("Ngày Giao Phải Lớn Hơn Ngày Hiện Tại !");
    }
  };
  render() {
    return (
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ngày Giao</CLabel>
                <CInput
                  type="date"
                  name="txtDate"
                  autoComplete="current-password"
                  onChange={this.onChange}
                  required
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-password">Trạng Thái</CLabel>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="txtConfirm"
                  // value={this.state.txtConfirm}
                  onChange={this.onChange}
                  required
                >
                  <option selected>---</option>
                  <option value="1">Đã Xác Nhận</option>
                  <option value="0">Chưa Xác Nhận</option>
                </select>
              </CFormGroup>

              <CFormGroup>
                <CButton type="submit" color="danger" className="m-2">
                  {" "}
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="mr-2"
                    size="lg"
                  />{" "}
                  Lưu
                </CButton>
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
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
    onEditItemBill: (id) => {
      dispatch(actions.onEditBillResquest(id));
    },
    onUpdateItemBill: (bill) => {
      dispatch(actions.onUpdateBillResquest(bill));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(updateOrder);
