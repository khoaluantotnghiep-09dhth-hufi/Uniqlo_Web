import React from "react";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Moment from "react-moment";
import moment from "moment";
import { compareAsc, format } from "date-fns";
import * as actions from "./../../../actions/index";
import Call_API from "./../../utils/Callapi";
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
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
class updateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtDate: "",
      txtDateOrder: "",
      txtConfirm: "",
      totalMoney: 0,
      id_customer: ""
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
        toast.error("Vui L??ng Nh???p D??? Li???u!");
        break;
      }
    }
    return isCheckForm;
  };
  onSubmitForm = (event) => {
    var { match } = this.props;
    event.preventDefault();
    var { history } = this.props;
    var { idItem, txtDate, txtConfirm, totalMoney, id_customer } = this.state;
    var sessionUser = JSON.parse(sessionStorage.getItem("admin"));
    var convertDate = moment(txtDate).format("YYYY-MM-DD");
    var dateNow = moment().format("YYYY-MM-DD");
    if (txtConfirm && txtConfirm === undefined) {
      toast.error("Vui l??ng ch???n tr???ng th??i !");
    }
    var billUpdate = {
      id: match.params.id_order,
      id_staff: sessionUser.id_user,
      delivery_date: convertDate,
      status: txtConfirm,
    };

    if (txtDate >= dateNow || txtDate === dateNow) {
      if (txtConfirm && txtConfirm !== undefined && txtConfirm === "4") {


        var scoreCustomer = Math.ceil(totalMoney / 10000);
        var objectScore = { score: scoreCustomer, }

        Call_API(`customer-score/${id_customer}`, "PUT", objectScore).then(res => toast.success("???? T??ch ??i???m")).catch(error => toast.error("T??ch ??i???m Th???t B???i, Y??u C???u Ki???m Tra H??? Th???ng"))

        history.goBack();
      }
          this.props.onUpdateItemBill(billUpdate);
          history.goBack();
    } else {
      toast.error("Ng??y Giao Ph???i L???n H??n Ho???c B???ng Ng??y Hi???n T???i !");
    }
  };
  render() {
    var { match } = this.props;
    var { txtDate, txtDateOrder, txtConfirm } = this.state;
    var formatDate = moment(txtDateOrder).format("DD-MM-YYYY");
    return (
      <CContainer fluid>
        <Link to="/admin/system/order/delivered">
          <CButton type="button" className="btn btn-primary" size="sm">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Tr??? v???
          </CButton>
        </Link>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ng??y ?????t H??ng</CLabel>
                <CInput
                  id="txtDateOrder"
                  type="date"
                  name="txtDateOrder"
                  value={txtDateOrder}
                  disabled
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ng??y Giao</CLabel>
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
                <CLabel htmlFor="nf-password">Tr???ng Th??i</CLabel>
                <select
                  id="txtConfirm"
                  class="form-select"
                  aria-label="Default select example"
                  name="txtConfirm"
                  value={txtConfirm}
                  onChange={this.onChange}
                  required
                >
                  <option selected>Vui l??ng ch???n...</option>
                  {match.params.status === "0" ? (
                    <>
                      <option value="1">X??c Nh???n</option>
                      <option value="2">Ch??? L???y H??ng</option>
                      <option value="3">??ang Giao</option>
                      <option value="4">???? Giao</option>
                    </>
                  ) : match.params.status === "1" ? (
                    <>
                      <option value="2">Ch??? L???y H??ng</option>
                      <option value="3">??ang Giao</option>
                      <option value="4">???? Giao</option>
                    </>
                  ) : match.params.status === "2" ? (
                    <>
                      <option value="3">??ang Giao</option>
                      <option value="4">???? Giao</option>
                    </>
                  ) : match.params.status === "3" ? (
                    <>
                      <option value="4">???? Giao</option>
                    </>
                  ) : match.params.status === "4" ? (
                    <>
                      <option value="5">Y??u C???u ?????i/Tr???</option>
                    </>
                  ) : match.params.status === "5" ? (
                    <>
                      <option value="6">X??c Nh???n ?????i</option>
                      <option value="7">T??? Ch???i ?????i</option>
                    </>
                  ) : 
                  ("")
                  }
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
                  L??u
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
