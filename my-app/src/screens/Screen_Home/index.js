import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "./App.scss";

import { connect } from "react-redux";
import * as actions from "./../../actions/productActions";

import Banner from "../../components/Banner/index";
import Slider from "../../components/Slider/index";
import Slider_UT from "../../components/Slider_UT/index";

class test extends Component {


  componentDidMount() {
    //  this.showListProduct();
    this.props.onGetAllProduct();
  }
  render() {
    // var ListimagesLifeWear = [
    //     {
    //       id: 1,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210317_1551_gl8634.jpg',
    //       status: true
    //     },
    //     {
    //       id: 2,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210401_0847_gl9968.jpg',
    //       status: true
    //     },
    //     {
    //       id: 3,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210708_1719_gl8991.jpg',
    //       status: true
    //     },
    //     {
    //       id: 4,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210610_1055_gl2843.jpg',
    //       status: true
    //     },
    //   ]

    //  var ListimagesNewStyle = [
    //     {
    //       id: 1,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl8340.jpg',
    //       status: true
    //     },
    //     {
    //       id: 2,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl5261.jpg',
    //       status: true
    //     },
    //     {
    //       id: 3,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl0393.jpg',
    //       status: true
    //     },
    //     {
    //       id: 4,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl2679.jpg',
    //       status: true
    //     },
    //   ]

    //   var ListimagesSummer = [
    //     {
    //       id: 1,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl6041.jpg',
    //       status: true
    //     },
    //     {
    //       id: 2,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl8847.jpg',
    //       status: true
    //     },
    //     {
    //       id: 3,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl9122.jpg',
    //       status: true
    //     },
    //     {
    //       id: 4,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl8835.jpg',
    //       status: true
    //     },
    //   ]
    //   var ListimagesStylingBook = [
    //     {
    //       id: 1,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/210305_VN_PC_stylingbook_women.jpg',
    //       status: true
    //     },
    //     {
    //       id: 2,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/210305_VN_PC_stylingbook_men.jpg',
    //       status: true
    //     },
    //     {
    //       id: 3,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/210305_VN_PC_stylingbook_kids.jpg',
    //       status: true
    //     },
    //     {
    //       id: 4,

    //       image: 'https://www.uniqlo.com/vn/top/img/topic/210305_VN_PC_stylingbook_baby.jpg',
    //       status: true
    //     },
    //   ]
    var { category, products } = this.props;
    var data = category.sort(() => Math.random() - Math.random()).slice(0, 4);
    var data1 = category.sort(() => Math.random() - Math.random()).slice(0, 4);
    var data2 = category.sort(() => Math.random() - Math.random()).slice(0, 4);
    var data3 = category.sort(() => Math.random() - Math.random()).slice(0, 4);
    var dataRandomMen = data.map((item, index) => {
      return {
        id: index,
        image: item.image,
      };
    });
    var dataRandomWomen = data1.map((item, index) => {
      return {
        id: index,
        image: item.image,
      };
    });
    var dataRandomBaby = data2.map((item, index) => {
      return {
        id: index,
        image: item.image,
      };
    });

    console.log(products)
    return (
      <div className="App">
        <Banner />
        <Slider chooseSize="mr-2" name="NAM" arrayList={dataRandomMen} />

        <Slider chooseSize="mr-2" name="NỮ" arrayList={dataRandomWomen} />
        <Slider chooseSize="mr-2" name="TRẺ EM" arrayList={dataRandomBaby} />
        <Image src="https://www.uniqlo.com/vn/top/img/topic/20210715_1636_gl5593.jpg" />
        <Slider
          className="slider--repair"
          chooseSize="maxmax"
          name="TRẺ SƠ SINH"
          arrayList={dataRandomBaby}
        />
      </div>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    sector: state.sector,
    category: state.category,
    products: state.products,


  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllProduct: () => {
      dispatch(actions.fetchProductResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(test);
