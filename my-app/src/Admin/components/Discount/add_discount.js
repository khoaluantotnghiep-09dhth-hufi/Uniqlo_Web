import React from "react";
import uniqid from "uniqid";
import { connect } from "react-redux";
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
import * as actions from "./../../../actions/index";

class addDiscount extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      idItem: "",
      txtNameDiscount: "",
      txtNameMota: "",
      dateStart: "",
      dateEnd: "",
    });
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemPromotion(match.params.id_promotion);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.edditPromotion) {
      var { edditPromotion } = NextProps;
      if (match.params.id_promotion) {
        const result = edditPromotion.find(
          (o) => o.id === match.params.id_promotion
        );

        this.setState({
          idItem: result.id,
          txtNameDiscount: result.name,
          txtNameMota: result.desciption,
          dateStart: result.date_start,
          dateEnd: result.date_end,
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
    var { idItem, txtNameDiscount, txtNameMota, dateStart, dateEnd } =
      this.state;
    console.log(idItem);
    var promotion = {
      id: uniqid("promotion-"),
      namePromotion: txtNameDiscount,
      nameDescription: txtNameMota,
      dateStart: dateStart,
      dateEnd: dateEnd,
    };
    var promotionUpdate = {
      id: match.params.id_promotion,
      namePromotion: txtNameDiscount,
      nameDescription: txtNameMota,
      dateStart: dateStart,
      dateEnd: dateEnd,
    };
    if (idItem) {
      this.props.onUpdateItemPromotion(promotionUpdate);
      history.goBack();
    } else {
      this.props.onAddItemPromotion(promotion);
      history.goBack();
    }
  };
  render() {
    return (
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">
                  Tên Khuyến Mãi
                </CLabel>
                <CInput
                  type="text"
                  name="txtNameDiscount"
                  placeholder="Tên Khuyến Mãi..."
                  autoComplete="name"
                  onChange={this.onChange}
                />
              </CFormGroup>
              {/* <CFormGroup>
              <CLabel htmlFor="exampleFormControlInput1">Mã Khuyến Mãi</CLabel>
              <CInput
                type="text"
                id="txtIDDiscount"
                name="txtIDDiscount"
                placeholder="Mã Khuyến Mãi..."
                autoComplete="name"
              />
             
            </CFormGroup> */}
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlTextarea1">
                  Nội Dung Khuyến Mãi
                </CLabel>

                <textarea
                  className="form-control"
                  name="txtNameMota"
                  placeholder="Nội Dung..."
                  rows="5"
                  onChange={this.onChange}
                ></textarea>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ngày Bắt Đầu</CLabel>
                <CInput
                  type="date"
                  name="dateStart"
                  autoComplete="current-password"
                  onChange={this.onChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ngày Kết Thúc</CLabel>
                <CInput
                  type="date"
                  name="dateEnd"
                  autoComplete="current-password"
                  onChange={this.onChange}
                />
              </CFormGroup>
              <CFormGroup>
                <CButton color="danger" className="m-2" type="submit">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
                  Thêm
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
    edditPromotion: state.edditPromotion,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemPromotion: (promotion) => {
      dispatch(actions.onAddPromotionResquest(promotion));
    },
    onEditItemPromotion: (id) => {
      dispatch(actions.onEditPromotionResquest(id));
    },
    onUpdateItemPromotion: (promotion) => {
      dispatch(actions.onUpdatePromotionResquest(promotion));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addDiscount);
