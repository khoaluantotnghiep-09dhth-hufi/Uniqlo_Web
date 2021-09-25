import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
const sessionUser = JSON.parse(sessionStorage.getItem("user"));
class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtTitle: "",
      txtDate: "",
      txtDescription: "",
      id_staff: "",
      txtImage: "",
      txtImageBanner: "",
      ImgPrivewIMG: "",
      ImgPrivewSubTitle: "",
      isOpen: false,
    };
  }
  openPreviewIMG = () => {
    this.setState({
      isOpen: true
    })
  }
  onChangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];

    if (file) {
      let objectURL = URL.createObjectURL(file);
      this.setState({
        ImgPrivew: objectURL,
        txtImage: objectURL,
      })

    }
  }
  // onChangeImageSubTitle = (e) =>{ 
  //   let data = e.target.files;
  //   let file = data[0];

  //   if (file) {
  //     let objectURLTitle = URL.createObjectURL(file);
  //     this.setState({
  //       ImgPrivewSubTitle: objectURLTitle,
  //       txtImageBanner: objectURLTitle,
  //     })

  //   }
  // }
  componentDidMount() {
    var { match } = this.props;
    this.props.onEditItemNews(match.params.id_news);
  }
  //   componentDidUpdate(prevProps,prevState,snapshot) {
  //     if (prevProps.staff !== this.props.staff){
  //         let arrStaff = this.props.staff;
  //         this.setState({
  //           staffArr : arrStaff,
  //           id_staff : arrStaff && arrStaff.length > 0 ? arrStaff[0].id : ''
  //         })
  //     }
  // }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.news) {
      var { news } = NextProps;
      if (match.params.id_news) {
        const result = news.find((o) => o.id === match.params.id_news);
        console.log(result)
        this.setState({
          idItem: result.id,
          txtTitle: result.title,
          txtDate: result.date,
          txtDescription: result.description,
          id_staff: result.id_staff.id,
          txtImage: result.image,
          txtImageBanner: result.image_banner,
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
      console.log(this.state)
    })

  };
  onSubmitForm = (event) => {
    var { match } = this.props;

    event.preventDefault();
    var { history } = this.props;
    var {
      idItem,
      txtTitle,
      txtDate,
      txtDescription,
      id_staff,
      txtImage,
      txtImageBanner,
    } = this.state;

    var news = {
      id: uniqid("news-"),
      title: txtTitle,
      date: txtDate,
      description: txtDescription,
      id_staff: sessionUser.id_user,
      image: txtImage,
      image_banner: txtImageBanner,
    };
    var newsUpdate = {
      idItem: match.params.id_news,
      title: txtTitle,
      date: txtDate,
      description: txtDescription,
      id_staff: sessionUser.id_user,
      image: txtImage,
      image_banner: txtImageBanner,
    };

    if (idItem) {
      this.props.onUpdateItemNews(newsUpdate);
      history.goBack();
    }
    else {
      this.props.onAddItemNews(news);
      history.goBack();
    }
  };
  render() {
    let { txtTitle, txtDate, txtDescription, id_staff, txtImage, txtImageBanner } = this.state;
    return (
      <Container fluid>
        <Row sm="12">
          <Link to="/admin/system/news">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
            </Button>
          </Link>
          <Form onSubmit={this.onSubmitForm}>
            <Row>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="formBasicObject">
                  <Form.Label>Tiêu Đề</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nhập tiêu đề..."
                    name="txtTitle"
                    id="txtTitle"
                    value={txtTitle}
                    onChange={(e) => { this.onChange(e, 'txtTitle') }} />
                  <Form.Control.Feedback
                    type="invalid" >
                    Vui lòng nhập tên cần thêm !
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group className="mb-3" controlId="formBasicObject">
                  <Form.Label>Ngày Đăng</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Nhập tiêu đề..."
                    name="txtDate"
                    id="txtDate"
                    value={txtDate}
                    onChange={(e) => { this.onChange(e, 'txtDate') }} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicObject">
              <Form.Label>Nội Dung</Form.Label>
              <textarea
                className="form-control"
                id="txtDescription"
                name="txtDescription"
                value={txtDescription}
                placeholder="Mô tả..."
                onChange={(e) => { this.onChange(e, 'txtDescription') }}
                rows="8"
                required
              ></textarea>
            </Form.Group>
            <Row sm="12">
              <Col sm="2">
                <Form.Group >
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Image"
                    name="txtImage"
                    id="txtImage"
                    value={txtImage}
                    onChange={(e) => { this.onChange(e, 'txtImage') }} />
                </Form.Group>
              </Col>
              <Col sm="4">
                <div style={{ backgroundImage: `url(${this.state.ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                  onClick={() => this.openPreviewIMG()}
                ></div>
              </Col>
              {/* <Col sm="2"> */}
              {/* <Form.Group >
                  <Form.Label className="border border-dark" style={{ backgroundColor: "#ffe6e6", padding: "10px", marginTop: "100px", cursor: "pointer" }} htmlFor="txtImage"><FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />Tải Ảnh Tiêu Đề</Form.Label>
                  <Form.Control
                    type="file"
                    id="txtImage"
                    name="txtImageBanner"
                    hidden
                    onChange={(e) => { this.onChangeImageSubTitle(e) }}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm="4">
                <div style={{ backgroundImage: `url(${this.state.ImgPrivewSubTitle})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                  onClick={() => this.openPreviewIMG()}
                ></div> */}
              {/* </Col> */}
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Banner</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Image banner"
                  name="txtImageBanner"
                  id="txtImageBanner"
                  value={txtImageBanner}
                  onChange={(e) => { this.onChange(e, 'txtImageBanner') }} />

              </Form.Group>
            </Row>

            {/* <Link to="/admin/manage/objects" > */}
            <Button type="button"
              className="btn btn-danger"
              onClick={this.onSubmitForm}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="mr-2"
                size="lg" />Lưu
            </Button>
            {/* </Link> */}
          </Form>
        </Row>
        {
          this.state.isOpen === true &&
          <Lightbox
            mainSrc={this.state.ImgPrivew}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        }
      </Container>
    )
  }
}
var mapStateToProps = (state) => {
  return {
    news: state.news,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddItemNews: (news) => {
      dispatch(actions.onAddNewsResquest(news));
    },
    onEditItemNews: (id) => {
      dispatch(actions.onEditNewsResquest(id));
    },
    onUpdateItemNews: (news) => {
      dispatch(actions.onUpdateNewsResquest(news));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNews)