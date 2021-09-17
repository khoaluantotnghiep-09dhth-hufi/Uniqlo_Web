import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

import { connect } from "react-redux";
import List_News from "./List_News/index";
import * as actions from "./../../actions/newsAction";
class index extends Component {
  componentDidMount() {
    this.props.onGetAllNews();
  }
  render() {
    var { news } = this.props;
    return (
      <Container>
        <h2
          className="font-weight-normal text-center"
          style={{ marginTop: "10%", marginBottom: "5%" }}
        >
          Tin Tức
        </h2>
        <Row style={{justifyContent: "center"}}>
          <List_News news={news} />
        </Row>
      </Container>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    news: state.news,
  };
};

var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllNews: () => {
      dispatch(actions.fetchNewsResquest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
