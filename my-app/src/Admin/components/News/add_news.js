import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      idItem: "",
      txtTitle: "",
      txtDate: "",
      txtDescription: "",
      id_staff: "",
      txtImage: "",
      txtSubtitle: "",
    };
  }
  componentDidMount() {
    var { match } = this.props;

    this.props.onEditItemNews(match.params.id_news);
  }
  componentWillReceiveProps(NextProps) {
    var { match } = this.props;
    if (NextProps && NextProps.news) {
      var { news } = NextProps;
      if (match.params.id_news) {
        const result = news.find((o) => o.id === match.params.id_news);
        console.log(result);
        this.setState({
          idItem: result.id,
          txtTitle: result.title,
          txtDate: result.date,
          txtDescription: result.description,
          id_staff: result.id_staff,
          txtImage: result.image,
          txtSubtitle: result.subtitle,
        });
      }
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState = {
      [name]: value,
    };
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
      txtSubtitle, 
    } = this.state;

    var news = {
      id: uniqid("news-"),
      titleName: txtTitle,
      date: txtDate,
      description: txtDescription,
      id_staff: id_staff,
      image: txtImage,
      subtitle: txtSubtitle,
    };
    var newsUpdate = {
      idItem: match.params.id_news,
      titleName: txtTitle,
      date: txtDate,
      description: txtDescription,
      id_staff: id_staff,
      image: txtImage,
      subtitle: txtSubtitle,
    };

    if (match.params.id_news) {
      this.props.onUpdateItemNews(newsUpdate);
      alert('Sửa thành công');
      history.goBack();
    } 
    else {
      this.props.onAddItemNews(news);
      alert('Thêm thành công');
      history.goBack();
    }
  };
  render() {

    return (
      <Container fluid>
        <Row>
          <Link to="/admin/system/news">
            <Button type="button" className="btn btn-primary" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
            </Button>
          </Link>
          <Col sm="12">
            <Form onSubmit={this.onSubmitForm}>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Tiêu Đề</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập tiêu đề..."
                  name="txtTitle"
                  id="txtTitle"
                  onChange={this.onChange} />
                <Form.Control.Feedback
                  type="invalid" >
                  Vui lòng nhập tên cần thêm !
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Ngày Đăng</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Nhập tiêu đề..."
                  name="txtDate"
                  id="txtDate"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Nội Dung</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập nội dung..."
                  name="txtDescription"
                  id="txtDescription"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Nhân Viên</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhân viên..."
                  name="id_staff"
                  id="id_staff"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Ảnh</Form.Label>
                <Form.Control
                  required
                  type="file"
                  placeholder="ảnh..."
                  name="txtImage"
                  id="txtImage"
                  onChange={this.onChange} />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicObject">
                <Form.Label>Phụ đề</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="phụ đề..."
                  name="txtSubtitle"
                  id="txtSubtitle"
                  onChange={this.onChange} />

              </Form.Group>
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
          </Col>
        </Row>
      </Container>
    )
  }

}
var mapStateToProps = (state) => {
  return {
    news:state.news,
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