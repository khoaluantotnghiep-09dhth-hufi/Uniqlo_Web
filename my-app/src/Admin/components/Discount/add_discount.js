import React from "react";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ConvertIMG from "../../utils/getBase64";
import moment from 'moment';

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
import Lightbox from "react-image-lightbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import * as actions from "./../../../actions/index";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
class addDiscount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtNameDiscount: "",
      txtNameMota: "",
      dateStart: "",
      dateEnd: "",
      txtImage: "",
      ImgPrivew: "",
      isOpen: false,
    };
  }
  componentDidMount() {
    var { match } = this.props;
    this.props.onEditItemPromotion(match.params.id_promotion);
    var { promotion } = this.props;
    if (match.params.id_promotion) {


      this.setState({
        txtNameDiscount: promotion.name,
        txtNameMota: promotion.description,
        dateStart: promotion.date_start,
        dateEnd: promotion.date_end,
        txtImage: promotion.image,
      });
    }
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.promotion) {
      var { promotion } = NextProps;
      if (match.params.id_promotion) {
        const result = promotion.find(
          (o) => o.id === match.params.id_promotion
        );
        this.setState({
          txtNameDiscount: result.name,
          txtNameMota: result.description,
          dateStart: result.date_start,
          dateEnd: result.date_end,
          txtImage: result.image,
        });
      }
    }
  }
  // onChange = (e, id) => {
  //   let coppyState = { ...this.state };
  //   coppyState[id] = e.target.value;
  //   this.setState({
  //     ...coppyState
  //   })
  // }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onChangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];

    if (file) {
      let base64 = ConvertIMG.getBase64(file);

      let objectURL = URL.createObjectURL(file);
      this.setState({
        ImgPrivew: objectURL,
        txtImage: objectURL,
      });
    }
  };
  onSubmitForm = (event) => {
    var { match } = this.props;

    event.preventDefault();
    var { history } = this.props;
    var { idItem, txtNameDiscount, txtNameMota, dateStart, dateEnd, txtImage } =
      this.state;
    let dateNow = new Date().toISOString().slice(0, 10);
    var promotion = {
      id: uniqid("promotion-"),
      name: txtNameDiscount,
      description: txtNameMota,
      date_start: dateStart,
      date_end: dateEnd,
      image: txtImage,
    };

    var promotionUpdate = {
      id: match.params.id_promotion,
      name: txtNameDiscount,
      description: txtNameMota,
      date_start: dateStart,
      date_end: dateEnd,
      image: txtImage,
    };

    if (match.params.id_promotion) {
      if (dateEnd >= dateStart) {
        this.props.onUpdateItemPromotion(promotionUpdate);
        history.goBack();
      } else {
        toast.error("Ngày Bắt Đầu Phải Nhỏ Hơn Ngày Kết Thúc!");
      }
    } else {

      if (dateEnd >= dateStart) {
        this.props.onAddItemPromotion(promotion);
        history.goBack();
      } else {
        toast.error("Ngày Bắt Đầu Phải Nhỏ Hơn Ngày Kết Thúc!");
      }
    }
  };
  render() {
    let { txtNameDiscount, txtNameMota, dateStart, dateEnd, txtImage, } = this.state;
    return (
      <CContainer fluid>
        <CRow>
          <Link to="/admin/system/discount">
            <CButton type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
              Trở về
            </CButton>
          </Link>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">
                  Tên Khuyến Mãi
                </CLabel>
                <CInput
                  required
                  type="text"
                  name="txtNameDiscount"
                  placeholder="Tên Khuyến Mãi..."
                  autoComplete="name"
                  value={txtNameDiscount}
                  onChange={this.onChange}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="exampleFormControlTextarea1">
                  Phần Trăm Khuyến Mãi
                </CLabel>

                <CInput
                  required
                  type="number"
                  className="form-control"
                  name="txtNameMota"
                  placeholder="10,25,50...(%)"
                  rows="5"
                  value={txtNameMota}
                  onChange={this.onChange}
                ></CInput>
              </CFormGroup>
              <CFormGroup>
                <CCol sm="8">
                  <CLabel
                    className="border border-dark"
                    style={{
                      backgroundColor: "#ffe6e6",
                      padding: "10px",
                      marginTop: "100px",
                      cursor: "pointer",
                    }}
                    htmlFor="txtImage"
                  >
                    <FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />
                    Tải Ảnh
                  </CLabel>
                  <CInput
                    type="file"
                    id="txtImage"
                    name="txtImage"
                    hidden
                    onChange={(e) => {
                      this.onChangeImage(e);
                    }}

                    required
                  />
                </CCol>
                <CCol sm="4">
                  <div
                    style={{
                      backgroundImage: `url(${this.state.ImgPrivew})`,
                      height: "200px",
                      width: "300px",
                      align: "center",
                      background: "center center no-repeat",
                      backgroundSize: "contain",
                      cursor: "pointer",
                      margin: "30px",
                    }}
                    value={txtImage}
                    onClick={() => this.openPreviewIMG()}
                  ></div>
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ngày Bắt Đầu</CLabel>
                <CInput
                  required
                  type="date"
                  name="dateStart"
                  autoComplete="current-password"
                  value={dateStart}
                  onChange={e => this.setState({ dateStart: e.target.value })}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ngày Kết Thúc</CLabel>
                <CInput
                  required
                  type="date"
                  name="dateEnd"
                  value={dateEnd}
                  min={moment(dateStart).format("YYYY-MM-DD")}
                  onChange={e => this.setState({ dateEnd: e.target.value })}
                />
              </CFormGroup>
              <CFormGroup>
                <CButton color="danger" className="m-2" type="submit">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
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
    edditPromotion: state.edditPromotion,
    promotion: state.promotion,
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
