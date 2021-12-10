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
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ConvertIMG from '../../utils/getBase64';
const mdParser = new MarkdownIt(/* Markdown-it options */);


const sessionUser = JSON.parse(sessionStorage.getItem("user"));
class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      txtTitle: "",
      txtDate: this.getCurrentDate(),
      txtDescriptionHTML: "",
      txtDescriptionText: "",
      id_staff: "",
      txtImage: "",
      ImgPrivew: "",
      isOpen: false,
    };
  }
  handleEditorChange = ({ html, text }) => {

    this.setState({
      txtDescriptionHTML: html,
      txtDescriptionText: text,
    })
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
      ConvertIMG.getBase64(file).then(res => {
        let objectURL = URL.createObjectURL(file);
        console.log(res);
        this.setState({
          ImgPrivew: objectURL,
          txtImage: res
        })
      });

    }
  }
  componentDidMount() {
 
    var { match,news } = this.props;
    this.props.onEditItemNews(match.params.id_news);
    if (match.params.id_news) {
      const result = news.find((o) => o.id === match.params.id_news);
      console.log("result nè", result);
      this.setState({
        txtTitle: result.title,
        txtDate: this.getCurrentDate(),
        txtDescriptionHTML: result.descriptionHTML,
        txtDescriptionText: result.descriptionText,
        id_staff: sessionUser.id_staff,
        txtImage: result.image,
        ImgPrivew: result.image,
      });
    }
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.news) {
      var { news } = NextProps;
      if (match.params.id_news) {
        // const result = news.find((o) => o.id === match.params.id_news);
        this.setState({
          txtTitle: news.title,
          txtDate: news.date,
          txtDescriptionHTML: news.descriptionHTML,
          txtDescriptionText: news.descriptionText,
          id_staff: news.id_staff,
          txtImage: news.image,
        });
      }
    }
  }
  getCurrentDate(separator = '/') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
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
    console.log("state nè", this.state);
    var {
      idItem,
      txtTitle,
      txtDate,
      txtDescriptionHTML,
      txtDescriptionText,
      txtImage,
    } = this.state;
    var news = {
      id: uniqid("news-"),
      title: txtTitle,
      date: txtDate,
      descriptionHTML: txtDescriptionHTML,
      descriptionText: txtDescriptionText,
      id_staff: sessionUser.id_user,
      image: txtImage,
    };
    var newsUpdate = {
      id: match.params.id_news,
      title: txtTitle,
      date: txtDate,
      descriptionHTML: txtDescriptionHTML,
      descriptionText: txtDescriptionText,
      id_staff: sessionUser.id_user,
      image: txtImage,
    };

    if (match.params.id_news) {
      this.props.onUpdateItemNews(newsUpdate);
      history.goBack();
    }
    else {
      this.props.onAddItemNews(news);
     
      history.goBack();
    }
  };
  render() {
    let { txtTitle, txtDate, txtDescriptionHTML, txtDescriptionText, id_staff, txtImage, ImgPrivew } = this.state;
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
              <Col sm="12">
                <Form.Group className="mb-3" controlId="formBasicObject">
                  <Form.Label>Tiêu Đề</Form.Label>
                  <textarea
                    className="form-control"
                    id="txtTitle"
                    name="txtTitle"
                    value={txtTitle}
                    placeholder="Tiêu đề..."
                    onChange={(e) => { this.onChange(e, 'txtTitle') }}
                    rows="5"
                    required
                  ></textarea>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicObject">
              <Form.Label>Nội Dung</Form.Label>
              <MdEditor 
              style={{ height: '500px' }} 
              renderHTML={text => mdParser.render(text)} 
              value={this.state.txtDescriptionText}
              onChange={this.handleEditorChange} />
            </Form.Group>
            <Row sm="12">
              <Col sm="2" className="d-flex justify-content-center">
                <Form.Group >
                  <Form.Label className="border border-dark" style={{ backgroundColor: "#ffe6e6", padding: "10px", marginTop: "100px", cursor: "pointer" }} htmlFor="txtImage"><FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />Tải Ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    id="txtImage"
                    name="txtImage"
                    hidden
                    onChange={(e) => { this.onChangeImage(e) }}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm="6" className="d-flex justify-content-center">
                <div style={{ backgroundImage: `url(${ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                  onClick={() => this.openPreviewIMG()}
                ></div>
              </Col>
            </Row>
            <Button type="button"
              className="btn btn-danger"
              onClick={this.onSubmitForm}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="mr-2"
                size="lg" />Lưu
            </Button>
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