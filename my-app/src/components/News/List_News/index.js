import React, { Component } from "react";
import {  Col } from "react-bootstrap";
import Item_News from "../Item_News/index";


class index extends Component {
  showListNews = (news) => {
    var result = null;

    result = news.map((item, index) => {
      return (
        <Col lg="3"  className="mt-4 mr-2" style={{padding:"0",margin:"0"}}>
          <Item_News key={item.id} itemNew={item} />
        </Col>
      );
    });
    return result;
  };
  render() {
    var { news } = this.props;

    return <React.Fragment>{this.showListNews(news)}</React.Fragment>;
  }
}

export default index;
