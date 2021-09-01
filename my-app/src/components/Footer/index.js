import React, { Component } from 'react';
import { Container, Row, Col, Image, Nav } from 'react-bootstrap';



import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import './Footer.scss'


class index extends Component {

  render() {

    return (
      <header  className="footer-main">
        <Container>
          <Row className="footer">

            <Col xl={1} className="img-tran"> <Image src="https://www.uniqlo.com/vn/explorer/img/logo_uq_01.gif" rounded /></Col>

            <Col>
              <Nav className="justify-content-around ">
                <Nav.Link className="font-nav" href="#action1" >Liên hệ chúng tôi</Nav.Link>                   
                <Nav.Link className="font-nav" href="#" >Chính sách đổi trả</Nav.Link>               
                <Nav.Link className="font-nav" href="#" >Điều khoản sử dụng</Nav.Link>
                <Nav.Link className="font-nav" href="#" >Khả năng truy cập</Nav.Link>               
                 <Nav.Link className="font-nav" href="#">Chính sách bảo mật</Nav.Link>
              </Nav>


            </Col>

            <Col xl={1} className="img-tran">
            <Image src="https://www.uniqlo.com/vn/explorer/img/logo_uq_01.gif" rounded />

            </Col>

          </Row>
          <p className="mt-4">Tên doanh nghiệp: Công ty TNHH UNIQLO Việt Nam<br></br>
          Giấy chứng nhận đăng ký doanh nghiệp số: 0315304731, đăng ký lần đầu ngày 02/10/2018, đăng ký thay đổi lần thứ ba ngày 23/09/2019<br></br>
          Địa chỉ trụ sở doanh nghiệp: Tầng 26, Tòa nhà Trụ Sở Điều Hành Và Trung Tâm Thương Mại Viettel, 285 Cách Mạng Tháng Tám, Phường 12, Quận 10, Thành phố Hồ Chí Minh<br></br>
          Điện thoại: 028 6284 6667<br></br>
          Email: customerservices@uniqlo.vn<br></br>
          Giờ Làm Việc: 8:00 – 17:00 (Thứ Hai – Thứ Sáu, không bao gồm ngày lễ)
          </p>
          <Image className="d-flex justify-content-start" src="https://www.uniqlo.com/vn/explorer/img/logoSaleNoti.png" rounded />
        </Container>
      </header>
    );
  }
}

export default index;