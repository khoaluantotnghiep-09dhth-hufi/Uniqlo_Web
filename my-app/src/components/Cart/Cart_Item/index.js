import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Cart_Item.scss";


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "1",
      
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange =(product, quantity)=> (event) => {
    
      this.setState({
        quantity: event.target.value,
      });
    
    
    this.props.onUpdateQuantityCart(product,event.target.value);
  };

  onDelete = (product) => {
    var { onDeleteInCart } = this.props;
    onDeleteInCart(product);
  };
  showTotal=(price,quantity)=>{
    const formatter = new Intl.NumberFormat('vi-Vn', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    })
    var total=price*quantity;
    return formatter.format(total); 
  }
  render() {
    var { item } = this.props;
  const{quantity} = item.product.quantity>0?quantity:this.state;
  const formatter = new Intl.NumberFormat('vi-Vn', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })
    return (
      <div className="Cart_Item--border">
        <Container className="mt-4 mb-4">
          <Row>
            <Col lg="3">
              <Image src={item.product.image} rounded fluid />
            </Col>

            <Col lg="5">
              <h6 className="font-weight-normal">{item.title}</h6>
              <div>
                <h6>Màu sắc: {item.product.color}</h6>
                <h6>Kích cỡ: {item.product.size}</h6>
                
                <h6>Giá: {formatter.format(item.product.price)}</h6>
              </div>
            </Col>

            <Col lg="4">
              <Row className="Cart__Delete">
                <Col>
                  <h6>Số lượng</h6>
                  <select value={this.state.quantity} onChange={ this.handleChange(item.product,item.quantity)}  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </Col>
                <Col class="Cart__Delete">
                  <a onClick={ () => this.onDelete(item.product) }>Xoá</a>
                </Col>
              </Row>
              <Row className="mt-4">
              <h6>Tổng:{this.showTotal(item.product.price,item.quantity)}</h6>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// var mapStateToProps = (state) => {
//   return {
//     cart: state.cart,
//   };
// };
// var mapDispatchToProps = (dispatch, props) => {
//   return {
//     onDeleteInItem: (id) => {
//       dispatch(actions.deleteItem(id));
//     },
//   };
// };

export default index;
