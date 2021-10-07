import React, { Component } from 'react';
import './Member_Benifits.scss';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    FloatingLabel,
    Form,
    Image
  } from "react-bootstrap";
  
  import { toast } from "react-toastify";
  import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
class index extends Component {
    render() {
        return (
           <React.Fragment>
  <Container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
  <Row>
              <Col>
                {" "}
                <h3>QUYỀN LỢI THÀNH VIÊN UNIQLO</h3>
                {/* <Image src="https://st3.depositphotos.com/2497303/31685/v/950/depositphotos_316852660-stock-illustration-favorable-collaboration-mutual-benefit-vector.jpg" thumbnail/> */}
              </Col>
              <Col>
               
                <Image></Image>
              </Col>
            </Row>
  </Container>
           </React.Fragment>
        );
    }
}

export default index;