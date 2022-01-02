import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "./App.scss";

import { connect } from "react-redux";
import * as actionsProduct from "./../../actions/productActions";
import * as actions from "./../../actions/index";
import Spinner from 'react-bootstrap/Spinner'
import Banner from "../../components/Banner/index";
import Slider from "../../components/Slider_UT/index";
import Slider_Product from "../../components/Slider_Product/index";
import Call_API from "./../../Admin/utils/Callapi";


import Slider_UT from "../../components/Slider_UT/index";

class test extends Component {
constructor(props) {
  super(props);
  this.state = {
    isLoading: true, 
    topMen:[],
    topWomen:[],
    topChild:[],
    topBaby:[],
  }
}

  componentDidMount() {
    //  this.showListProduct();
    try{
     
      this.props.fetchBanners();
      Call_API("products-top4-men","GET",null).then((response)=>{
        this.setState({
          topMen:response.data,
        })
      })
      Call_API("products-top4-women","GET",null).then((response)=>{
        this.setState({
          topWomen:response.data,
        })
      })
      Call_API("products-top4-child","GET",null).then((response)=>{
        this.setState({
          topChild:response.data,
        })
      })
      Call_API("products-top4-baby","GET",null).then((response)=>{
        this.setState({
          topBaby:response.data,
        })
      })
      this.setState({isLoading:false});

    }catch(e){
      this.setState({isLoading:false});
    }
   
  }
  render() {
    
    var {  banner } = this.props;
    var{isLoading,topMen, topWomen,topBaby,topChild} = this.state;
    

    // var data2 = category.sort(() => Math.random() - Math.random()).slice(0, 4);
    
    
    

  
if(isLoading){return   <Spinner animation="grow" variant="danger" /> }
    return (
      <div className="App">
        <Banner arrayList={banner} />
        <Slider chooseSize="mr-2 pt-4 px-2" name="NAM" arrayList={topMen} />
        <Slider chooseSize="mr-2 pt-4 px-2" name="NỮ" arrayList={ topWomen} />
        <Slider chooseSize="mr-2 pt-4 px-2" name="TRẺ SƠ SINH" arrayList={topBaby} />
        <Slider chooseSize="mr-2 pt-4 px-2" name="TRẺ EM" arrayList={topChild} />
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
    }, fetchBanners: () => {
      return dispatch(actions.fetchBannersResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(test);
