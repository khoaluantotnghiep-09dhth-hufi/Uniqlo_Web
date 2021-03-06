import React from "react";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import Call_API from "./../../utils/Callapi";

import * as actions from "../../../actions/index";
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
      redirect: false,
      txtConfirm: "",
    };
  }
  componentDidMount() {
    var { match } = this.props;
    var id_staff = match.params.id_staff;
    this.props.onEditItemStaff(match.params.id_staff);
    Call_API(`staffs/${id_staff}`, "GET", null)
      .then((response) => {
        var data = response.data[0];
        this.setState({
          idItem: id_staff,

          txtConfirm: data.role,
        });
      })

  }
  // componentWillReceiveProps(NextProps) {
  //   var { match } = this.props;
  //   var id_staff = match.params.id_staff;

  //   if (NextProps && NextProps.staff) {
  //     var { staff } = NextProps;
  //     const result = staff.find((o) => o.id === match.params.id_staff);
  
  //     if (match.params.id_staff) {
  //       this.setState({
  //         idItem: id_staff,

  //         txtConfirm: result.role,
  //       });
  //     }
  //   }
  // }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmitForm = (event) => {
    var { match, staff } = this.props;

    event.preventDefault();
    var { history } = this.props;
    var { idItem, txtConfirm } = this.state;
    var staffUpdate = {
      id: idItem,

      role: parseInt(txtConfirm),
    };

    if (match.params.id_staff) {
      this.props.onUpdatePositionStaff(staffUpdate);
      history.goBack();
    } else {
      toast.error("M???i B???n Nh???p D??? Li???u!");
    }
    
  };
  render() {

    return (
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="nf-password">V??? tr??</CLabel>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="txtConfirm"
                  // value={this.state.txtConfirm}
                  onChange={this.onChange}
                  required
                >
                  <option selected>---</option>
                  <option value="0">Qu???n L??</option>
                  <option value="1">Nh??n Vi??n B??n H??ng</option>
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
    staff: state.staff,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onEditItemStaff: (id) => {
      dispatch(actions.onEditStaffsResquest(id));
    },
    onUpdatePositionStaff: (staff) => {
      dispatch(actions.onUpdatePositionStaffsResquest(staff));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(updateOrder);
