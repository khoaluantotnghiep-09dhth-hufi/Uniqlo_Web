import React, { Component } from "react";
import "./App.scss";
import { connect } from "react-redux";
import * as actionsProduct from "./../../actions/productActions";
import * as actions from "./../../actions/index";
import Banner from "../../components/Banner/index";
import Slider from "../../components/Slider_UT/index";
import Call_API from "./../../Admin/utils/Callapi";

class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      topMen: [],
      topWomen: [],
      topChild: [],
      topBaby: [],
      bannerAPI: [],
      isLoadingNam: true,
      isLoadingNu: true,
      isLoadingTreEm: true,
      isLoadingSoSinh: true,
      isLoadingBanner: true,

    };
  }

  componentDidMount() {
    //  this.showListProduct();
    this.props.onGetAllProduct();

    try {
      this.props.fetchBanners();
      Call_API("banners", "GET", null).then((response) => {
        this.setState({
          bannerAPI: response.data,
          isLoadingBanner: false,
        });
      });
      Call_API("products-top4-men", "GET", null).then((response) => {
        this.setState({
          topMen: response.data,
          isLoadingNam: false,
        });
      });
      Call_API("products-top4-women", "GET", null).then((response) => {
        this.setState({
          topWomen: response.data,
          isLoadingNu: false,
        });
      });
      Call_API("products-top4-child", "GET", null).then((response) => {
        this.setState({
          topChild: response.data,
          isLoadingTreEm: false,
        });
      });
      Call_API("products-top4-baby", "GET", null).then((response) => {
        this.setState({
          topBaby: response.data,
          isLoadingSoSinh: false,
        });
      });
      this.setState({ isLoading: false });
    } catch (e) {
      this.setState({ isLoading: false });
    }
    this.setState({ isLoading: true });
  }
  render() {
    var { banner } = this.props;
    var {
      isLoading,
      topMen,
      topWomen,
      topBaby,
      topChild,
      isLoadingNam,
      isLoadingNu,
      isLoadingTreEm,
      isLoadingSoSinh,
      isLoadingBanner,
      bannerAPI
    } = this.state;

    var banner =isLoadingNam ? (
      <div className="adjust_Loading">
        <button class="btn btn-danger" type="button" disabled>
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    ) :( <Banner arrayList={bannerAPI}  className="mb-4"/>);

    var nam = isLoadingNam ? (
      <div className="adjust_Loading">
        <button class="btn btn-danger" type="button" disabled>
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    ) : (
      <Slider chooseSize="mr-2 pt-4 px-2" name="NAM" arrayList={topMen} />
    );

    var nu = isLoadingNu ? (
      <div className="adjust_Loading">
        <button class="btn btn-danger" type="button" disabled>
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    ) : (
      <Slider chooseSize="mr-2 pt-4 px-2" name="NỮ" arrayList={topWomen} />
    );
    var treem = isLoadingTreEm ? (
      <div className="adjust_Loading">
        <button class="btn btn-danger" type="button" disabled>
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    ) : (
      <Slider chooseSize="mr-2 pt-4 px-2" name="TRẺ EM" arrayList={topChild} />
    );
    var sosinh = isLoadingSoSinh ? (
      <div className="adjust_Loading">
        <button class="btn btn-danger" type="button" disabled>
          <span
            class="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    ) : (
      <Slider
        chooseSize="mr-2 pt-4 px-2"
        name="TRẺ SƠ SINH"
        arrayList={topBaby}
      />
    );
    if (isLoading === false) {
      return (
        <div className="adjust_Loading">
          <button class="btn btn-danger" type="button" disabled>
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
      );
    }
    return (
      <div className="App">
       {banner}
        {nam}
        {nu}
        {treem}
        {sosinh}

        {/* <Image src="https://www.uniqlo.com/vn/top/img/topic/20210715_1636_gl5593.jpg" /> */}
        {/* <Slider
          className="slider--repair"
          chooseSize="maxmax"
          name="TRẺ SƠ SINH"
          arrayList={dataRandomBaby}
        /> */}
      </div>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    sector: state.sector,
    category: state.category,
    products: state.products,
    banner: state.banner,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllProduct: () => {
      dispatch(actionsProduct.fetchProductResquest());
    },
    fetchBanners: () => {
      return dispatch(actions.fetchBannersResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(test);
