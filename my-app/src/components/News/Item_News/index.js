import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Item_News.scss";
import { connect } from "react-redux";
import {Card,Button} from "react-bootstrap";

class index extends Component {
  render() {
      var{ itemNew }=this.props;
    return (
      <React.Fragment>
        <Card className="Adjust_Image" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={itemNew.image} />
          <Card.Body className="text-left">
          <Card.Text className="font-weight-bold " style={{color: "#3795C1"}}>{itemNew.date}</Card.Text>
            <Card.Title className="Adjust_Text">{itemNew.title}</Card.Title>
            <Card.Text className="Adjust_Text">
             {itemNew.description}
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}


export default index;


    
   
    