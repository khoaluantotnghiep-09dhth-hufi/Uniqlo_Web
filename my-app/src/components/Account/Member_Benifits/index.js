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
                
                <Image src="https://www.nopcommerce.com/images/thumbs/0005720_coming-soon-page_550.jpeg" />
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