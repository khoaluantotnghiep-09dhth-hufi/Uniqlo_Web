import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item_News from "../Item_News/index";
import { connect } from "react-redux";

class index extends Component {
  showListNews = (news) => {
    var result = null;

    result = news.map((item, index) => {
      return (
        <Col lg="4" className="mt-4">
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
