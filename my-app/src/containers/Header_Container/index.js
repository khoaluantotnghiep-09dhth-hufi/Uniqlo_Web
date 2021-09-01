import React, { Component } from 'react';
import {connect} from 'react-redux'
import Header from './../../components/Header/index';


class index extends Component {

  render() {
        var{cart}= this.props;
    return (
  <Header cart={cart}/>
        
  
    );
  }
}
var mapStateToProps = (state) => {
    return{
        cart: state.cart,
    }
}

export default connect(mapStateToProps,null) (index);