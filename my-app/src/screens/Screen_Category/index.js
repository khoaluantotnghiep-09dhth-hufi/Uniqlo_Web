import React, { Component } from "react";
import * as actions from "./../../actions/index";
import { connect } from "react-redux";
import Category_Product_Container from "../../components/Category_Product/index";
import Banner from "../../components/Banner/index";
import Call_API from "./../../Admin/utils/Callapi";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,

      data: [],
    };
  }
  componentDidMount() {
    this.props.fetchBanners();
  }
  render() {
    var { match, location, history, banner } = this.props;

    return (
      <div>
        <Banner arrayList={banner} className="mb-4" />

        <Category_Product_Container
          match={match}
          location={location}
          history={history}
        />
      </div>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    banner: state.banner,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBanners: () => {
      return dispatch(actions.fetchBannersResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
