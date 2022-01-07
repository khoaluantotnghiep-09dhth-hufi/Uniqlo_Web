import React from "react";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Moment from "react-moment";
import moment from "moment";
import { compareAsc, format } from "date-fns";
import * as actions from "./../../../actions/index";
import Call_API from "./../../utils/Callapi";

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
      txtDateOrder: "",
      txtConfirm: "",
      totalMoney:0,
      id_customer:""
    };
  }
  componentDidMount() {
    var { match, bill } = this.props;

    

    
    Call_API(`bills-confirm/${match.params.id_order}`, "GET", null)
    .then((response) => {
      var data = response.data[0];
      this.setState({
        idItem: data.id,
        txtDate: data.delivery_date,
        txtDateOrder: data.order_date,
        txtConfirm: data.status,
        totalMoney: data.total,
        id_customer: data.id_customer,
      });
    })
    .catch((error) => console.log(error));

  }
  componentWillReceiveProps(NextProps) {
    // var { match } = this.props;
    // if (NextProps && NextProps.bill) {
    //   var { bill } = NextProps;
    //   if (match.params.id_order) {
    //     this.setState({
    //       idItem: bill.id,
    //       txtDate: bill.delivery_date,
    //       txtDateOrder: bill.order_date,
    //       txtConfirm: bill.status,
    //     });
    //   }
    // }
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
    var { match } = this.props;
    event.preventDefault();
    var { history } = this.props;
    var { idItem, txtDate, txtConfirm,totalMoney,id_customer } = this.state;
    var sessionUser = JSON.parse(sessionStorage.getItem("user"));
    var convertDate = moment(txtDate).format("YYYY-MM-DD");
    var dateNow = moment().format("YYYY-MM-DD");
    if (txtConfirm && txtConfirm === undefined) {
      toast.error("Vui lòng chọn trạng thái !");
    }
    var billUpdate = {
      id: match.params.id_order,
      id_staff: sessionUser.id_user,
      delivery_date: convertDate,
      status: txtConfirm,
    };
    console.log(billUpdate);
    if (txtDate >= dateNow || txtDate === dateNow) {
      if (match.params.status === "3") {
      console.log("Id cis "+id_customer)
       var scoreCustomer= Math.ceil(totalMoney/10000);
       var objectScore={score:scoreCustomer,}
        console.log("Money Bill "+ scoreCustomer );
        Call_API(`customer-score/${id_customer}`, "PUT", objectScore).then(res=>  toast.success("Đã Tích Điểm")).catch(error=> toast.error("Tích Điểm Thất Bại, Yêu Cầu Kiểm Tra Hệ Thống"))
        
      }
      this.props.onUpdateItemBill(billUpdate);
      history.goBack();
    } else {
      toast.error("Ngày Giao Phải Lớn Hơn Hoặc Bằng Ngày Hiện Tại !");
    }
  };
  render() {
    var { match } = this.props;
    var { txtDate, txtDateOrder, txtConfirm } = this.state;
    var formatDate = moment(txtDateOrder).format("DD-MM-YYYY");
    return (
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ngày Đặt Hàng</CLabel>
                <CInput
                  id="txtDateOrder"
                  type="date"
                  name="txtDateOrder"
                  value={txtDateOrder}
                  disabled
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ngày Giao</CLabel>
                <CInput
                  id="txtDate"
                  min={formatDate}
                  type="date"
                  name="txtDate"
                  onChange={this.onChange}
                  value={txtDate}
                  required
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-password">Trạng Thái</CLabel>
                <select
                  id="txtConfirm"
                  class="form-select"
                  aria-label="Default select example"
                  name="txtConfirm"
                  value={txtConfirm}
                  onChange={this.onChange}
                  required
                >
                  <option selected>Vui lòng chọn...</option>
                  {match.params.status === "0" ? (
                    <>
                      <option value="1">Xác Nhận</option>
                      <option value="2">Chờ Lấy Hàng</option>
                      <option value="3">Đang Giao</option>
                      <option value="4">Đã Giao</option>
                    </>
                  ) : match.params.status === "1" ? (
                    <>
                      <option value="2">Chờ Lấy Hàng</option>
                      <option value="3">Đang Giao</option>
                      <option value="4">Đã Giao</option>
                    </>
                  ) : match.params.status === "2" ? (
                    <>
                      <option value="3">Đang Giao</option>
                      <option value="4">Đã Giao</option>
                    </>
                  ) : match.params.status === "3" ? (
                    <>
                      <option value="4">Đã Giao</option>
                    </>
                  ) : match.params.status === "4" ? (
                    ""
                  ) : (
                    ""
                  )}
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
