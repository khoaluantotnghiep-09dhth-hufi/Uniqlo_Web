import React, { Component } from "react";

import "./Item_News.scss";

import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";


class index extends Component {
  render() {
    var { itemNew } = this.props;
    return (
      <React.Fragment>
        <NavLink to={`/Tin Tức/${itemNew.id}`}>
          <Card className="Adjust_Image" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={itemNew.image} />
            <Card.Body className="text-left">
              <Card.Text className="font-weight-bold " style={{ color: "#3795C1" }}>{ <Moment format="DD/MM/YYYY">
                                                        {itemNew.date}
                                                    </Moment>}</Card.Text>
              <Card.Title className="Adjust_Text">{itemNew.title}</Card.Title>
              {/* <Card.Text className="Adjust_Text_Detail">
                <div dangerouslySetInnerHTML={{__html: itemNew.descriptionHTML}}></div>
              </Card.Text> */}
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </NavLink>
      </React.Fragment>
    );
  }
}


export default index;




