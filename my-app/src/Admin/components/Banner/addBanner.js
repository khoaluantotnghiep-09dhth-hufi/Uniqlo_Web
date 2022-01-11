import React from "react";
import uniqid from "uniqid";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import ConvertIMG from "../../utils/getBase64";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowLeft,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
class addBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtImage: "",
      txtActive: "",

      ImgPrivew: "",
      isOpen: false,
    };
  }
  componentDidMount() {
    var { match } = this.props;
    this.props.onEditItemBanner(match.params.id_banner);
    var { banner } = this.props;
    if (match.params.id_banner) {
      const result = banner[0];
      this.setState({
        txtImage: result.image,
        txtActive: result.is_active,
      });
    }
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.banner) {
      var { banner } = NextProps;
    
      if (match.params.id_banner) {
        const result = banner.find((o) => o.id === match.params.id_banner);
        this.setState({
          txtImage: result.image,
          txtActive: result.is_active,
        });
      }
    }
  }
  onChangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      ConvertIMG.getBase64(file).then((res) => {
        let objectURL = URL.createObjectURL(file);

        this.setState({
          ImgPrivew: objectURL,
          txtImage: res,
        });
      });
    }
  };
  onChange = (e, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = e.target.value;
    this.setState({
      ...coppyState,
    });
  };
  openPreviewIMG = () => {
    this.setState({
      isOpen: true,
    });
  };
  checkValidate = () => {
    let check = ["txtActive"];
    let isValid = true;
    if (!this.state[check[0]]) {
      isValid = false;
      toast.error("Vui lòng nhập tên trạng thái");
    }

    return isValid;
  };
  onSubmitForm = (event) => {
    event.preventDefault();
    let isValid = this.checkValidate();
    if (isValid === false) return;
    var { match, history } = this.props;

    var { txtImage, txtActive } = this.state;

    var banner = {
      id: uniqid("banner- "),
      image: txtImage,

      is_active: parseInt(txtActive),
    };
    var bannerUpdate = {
      id: match.params.id_banner,
      image: txtImage,

      is_active: parseInt(txtActive),
    };
    console.log("Banner Update :"+bannerUpdate)
    
    if (match.params.id_banner) {
    console.log("Banner Update :"+bannerUpdate)

      this.props.onUpdateItemBanner(bannerUpdate);
      history.goBack();
    } else {
      this.props.onAddItemBanner(banner);
      history.goBack();
    }
  };
  render() {
    let { txtName, ImgPrivew, txtImage } = this.state;
    return (
      <CContainer fluid>
        <CRow>
          <Link to="/admin/manage/banner">
            <CButton type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
              Trở về
            </CButton>
          </Link>
          <CCol sm="12">
            <CForm onSubmit={this.onSubmitForm}>
              <CFormGroup>
                <Row sm="12" className="d-flex justify-content-center">
                  <Col sm="4">
                    <Form.Group>
                      <Form.Label
                        className="border border-dark"
                        style={{
                          backgroundColor: "#ffe6e6",
                          padding: "10px",
                          marginTop: "100px",
                          cursor: "pointer",
                        }}
                        htmlFor="txtImage"
                      >
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="mr-2 fa-3x"
                        />
                        Tải Ảnh
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="txtImage"
                        name="txtImage"
                     
                        hidden
                        onChange={(e) => {
                          this.onChangeImage(e);
                        }}
                      
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="8">
                    <div
                      style={{
                        backgroundImage: `url(${ImgPrivew})`,
                        height: "200px",
                        width: "300px",
                        align: "center",
                        background: "center center no-repeat",
                        backgroundSize: "contain",
                        cursor: "pointer",
                        margin: "30px",
                      }}
                      onClick={() => this.openPreviewIMG()}
                    ></div>
                  </Col>
                </Row>

                <CFormGroup>
                  <CLabel htmlFor="nf-password">Trạng Thái</CLabel>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="txtActive"
                    // value={this.state.txtConfirm}
                    onChange={(e) => {
                      this.onChange(e, "txtActive");
                    }}
                    required
                  >
                    <option selected>---</option>
                    <option value="0">Hoạt Động</option>
                    <option value="1">Ngưng Hoạt Động</option>
                  </select>
                </CFormGroup>
              </CFormGroup>

              <CFormGroup>
                <CButton type="submit" color="danger" className="m-2">
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
    banner: state.banner,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemBanner: (banner) => {
      dispatch(actions.onAddBannerResquest(banner));
    },
    onEditItemBanner: (id) => {
      dispatch(actions.onEditBannerResquest(id));
    },
    onUpdateItemBanner: (banner) => {
      dispatch(actions.onUpdateBannerResquest(banner));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(addBanner);
