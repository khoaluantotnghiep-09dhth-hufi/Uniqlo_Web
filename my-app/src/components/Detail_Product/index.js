import React, { Component } from "react";
import {  Row, Col, Image } from "react-bootstrap";

class index extends Component {
  render() {
      var{match}=this.props;
     

      var paramUrl = match.params.name;
   
    return (
      <Row className="mt-4">
        <h4 className="text-center mb-4">CHI TIẾT SẢN PHẨM</h4>
        <Col lg="3" style={{ backgroundColor: "red" }}>
          <Row>
            <Col><h3>{paramUrl}</h3></Col>
            <Col>299.000VND</Col>
          </Row>
        </Col>
        <Col lg="6">
          <Image src="https://im.uniqlo.com/images/common/pc/goods/441001/item/09_441001.jpg"></Image>
        </Col>

        <Col lg="3" style={{ backgroundColor: "red" }}>
          <Row>
            <Col><h3>{paramUrl}</h3></Col>
            <Col>299.000VND</Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default index;
