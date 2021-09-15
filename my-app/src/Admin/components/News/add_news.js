import React from 'react';
import {
  CForm,
  CLabel,
  CContainer,
  CInput,
  CCol,

  CRow,
  CFormGroup,
  CButton,

} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,

} from "@fortawesome/free-solid-svg-icons";
import uniqid from 'uniqid';
import CallAPI from '../../utils/Callapi';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
let data = [];
export default class addNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      date: '',
      description: '',
      id_staff: '',
      image: '',
    }
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'dropdown' ? target.value : target.value;
    this.setState({
      [name]: value,
    });

  }
  onAdd = (e) => {
    e.preventDefault();
    var { id, title, date, description, id_staff, image } = this.state;
    var { history } = this.props;
    const news = {
      id: uniqid('news-'),
      title: title,
      date: date,
      description: description,
      id_staff: id_staff,
      image: image,
    }
    CallAPI('/news', 'POST', news).then(res => {
      alert('Thêm thành công !');
      history.goBack();
    });

  }
  componentDidMount() {
    CallAPI('news', 'GET', null).then(res => {
      data = res.data;
      console.log(data);
    });
  }
  render() {
    var { id, title, date, description, id_staff, image } = this.state;
    return (
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post" onSubmit={this.onAdd}>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlInput1">Tên Tin Tức</CLabel>
                <CInput
                  type="text"

                  name="title"
                  placeholder="Tên Tin Tức..."
                  autoComplete="name"
                />

              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="file-uploader">Hình Ảnh</CLabel>
                <CInput
                  type="file"

                  name="image"
                  placeholder="Hình Ảnh..."
                  autoComplete="img"
                />
                <img src="..." className="img-fluid" alt="..."></img>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="exampleFormControlTextarea1">Nội Dung</CLabel>

                <textarea className="form-control" name="description" placeholder="Nội Dung..." rows="10"></textarea>

              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Ngày Đăng</CLabel>
                <CInput
                  type="date"

                  name="date"
                  placeholder="Ngày Đăng..."
                  autoComplete="current-password"
                />

              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Nhân Viên</CLabel>
                <Form.Select aria-label="Default select example" name="idObject"
                  onChange={this.onChange}

                >
                  <option optionDisable="true">Nhân Viên</option>
                  {data.map((option, i) => (

                    <option value={option.id} key={i}>{option.name}</option>
                  ))}
                </Form.Select>
              </CFormGroup>
              <CFormGroup >
                <CButton color='danger' className="m-2" >  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" /> Thêm</CButton>

              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    )
  }
}