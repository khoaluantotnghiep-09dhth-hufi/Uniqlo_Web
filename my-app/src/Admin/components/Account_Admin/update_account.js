import React from "react";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { toast } from "react-toastify";

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

      txtConfirm: "",
    };
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemStaff(match.params.id_staff);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    var id_staff = match.params.id_staff;
  

    if (NextProps && NextProps.staff) {
      var { staff } = NextProps;
      const result = staff.find((o) => o.id === match.params.id_staff);
      if (match.params.id_staff) {
        this.setState({
          idItem: id_staff,

          txtConfirm: result.role,
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
      toast.error("Mời Bạn Nhập Dữ Liệu!");
    }
  };
  render() {
    return (
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Vị trí</CLabel>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="txtConfirm"
                  // value={this.state.txtConfirm}
                  onChange={this.onChange}
                  required
                >
                  <option selected>---</option>
                  <option value="0">Quản Lý</option>
                  <option value="1">Nhân Viên Bán Hàng</option>
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
