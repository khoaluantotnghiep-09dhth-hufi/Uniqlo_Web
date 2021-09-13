import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cart_Item from "./Cart_Item/index";
import Cart_Checkout from "./Cart_Checkout/index";

import { connect } from "react-redux";
import * as actions from "./../../actions/index";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayForm: false,
      KeyWord: "",
    };
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { isDisplayForm } = this.state;
    var { cart } = this.props;
   
    var elementsCheckoutForm = isDisplayForm ? (
      ""
    ) : (
      <Cart_Checkout cart={cart} />
    );
    const elementsItem = cart.map((item, index) => {
      var { onDeleteInCart, onUpdateQuantityCart } = this.props;

      return (
        <Cart_Item
          key={item.id}
          item={item}
          onDeleteInCart={onDeleteInCart}
          onUpdateQuantityCart={onUpdateQuantityCart}
        />
      );
    });
    return (
      <Container style={{marginBottom:'20%',marginTop:'3%'}}>
        <Row>
          <Col lg="6">
            <h3>GIỎ HÀNG</h3>

            <Row style={{ border: "1px solid #ccc" }}>
              <Col>{elementsItem}</Col>
            </Row>
          </Col>
          <Col lg="2"></Col>
          <Col className="mt-4">
            {elementsCheckoutForm}

            
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteInCart: (product) => {
      dispatch(actions.removeToCart(product));
    },
    onUpdateQuantityCart: (product, quantity) => {
      dispatch(actions.updateQuantity(product, quantity));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
