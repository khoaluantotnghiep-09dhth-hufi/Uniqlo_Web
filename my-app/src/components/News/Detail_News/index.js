import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import "./Detail_News.scss";


class index extends Component {
  componentDidMount() {
    this.props.onGetAllNews();
  }
  showDetailNews = (news, id_news) => {
    var result = null;


    result = news
      .filter((item) => item.id === id_news)
      .map((item, index) => {

        return (
          <Container style={{ marginBottom: "5%", marginTop: "1%" }}>
            <Row>
              <Col>
                <h2 className="text-center mt-4">{item.title}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="font-weight-bold " style={{ color: "#3795C1" }}>
                  { <Moment format="DD/MM/YYYY">
                                                        {item.date}
                                                    </Moment>}
                </p>
              </Col>
            </Row>
            <Row className="mt-4">
              {/* <Col lg="2"></Col> */}
              {/* <Col>
                <Image className="Adjust_Image" src={item.image} rounded />
              </Col> */}
              {/* <Col lg="2"></Col> */}
            </Row>
            <Row className="mt-4">
              <Col>
                <p className="Adjust_Text_Body">
                  <span className="mr-4"></span>
                  <div>
                    <p dangerouslySetInnerHTML={{__html: item.descriptionHTML}} text-align="center" ></p>
                  </div>
                </p>
              </Col>
            </Row>
          </Container>
        );
      });
    return result;
  };
  render() {
    var { news, match } = this.props;
    var id_news = match.params.id_news;

    return (
      <React.Fragment>{this.showDetailNews(news, id_news)}</React.Fragment>
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
