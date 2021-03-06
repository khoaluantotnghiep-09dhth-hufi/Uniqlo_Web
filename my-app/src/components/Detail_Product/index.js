import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {Nav } from 'react-bootstrap';
import $ from "jquery";
import { toast } from "react-toastify";
import Call_API from "./../../Admin/utils/Callapi";

import Item from "./../Category_Product/Item_Product/index";
import {
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  Button,
  Form,
} from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "./../../actions/productActions";
import * as actions_of_index from "./../../actions/index";
import "./Detail_Product.scss";
import Size from "../Size/index";
import Modal from 'react-bootstrap/Modal'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSize: "",
      quantityOfSize: 0,
      isChooseColor: "",
      isTogglFromSize: false,
      products:{}
    };
  }
  componentDidMount() {
    var { match } = this.props;
    var id_product = match.params.id_product;

    this.props.onGetAllProduct(id_product);
    Call_API(`products/${id_product}`, "GET", null).then((response) => {
      this.setState({products:response.data});
    });
  
    this.props.onGetAllSizeByProduct(id_product);
  }

  showDetailProduct = (products_category, id_product) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    var result = null;
    var resultFilter = null;
    result = products_category.filter((product) => product.id === id_product);
    if (result.percentSale) {
      var cacularSale = (parseInt(result.percentSale) / 100) * result.price;
      var newPrice = result.price - cacularSale;
    }

    // this.setState({
    //   nameProduct:result.name,
    //   imageProduct:result.image,
    //   priceProduct: result.price,
    //   priceSaleProduct: newPrice ,

    // })
    resultFilter = result.map((product, index) => {
      if (product.percentSale) {
        var cacularSale = (parseInt(product.percentSale) / 100) * product.price;
        var newPrice = product.price - cacularSale;
      }
      var elementNewPrice = newPrice ? (
        <span
          // style={{ marginLeft: "40px", color: "red" }}
          className="font-weight-bold "
          style={{ color: "red" }}
        >
          {" "}
          {formatter.format(newPrice)}{" "}
        </span>
      ) : (
        ""
      );

      var elementPrice = elementNewPrice ? (
        <span>
          {" "}
          <del>{formatter.format(product.price)} </del>
        </span>
      ) : (
        <span className="font-weight-bold " style={{ color: "red" }}>
          {" "}
          {formatter.format(product.price)}
        </span>
      );
      return (
        <React.Fragment>
          <Col lg="3" style={{ backgroundColor: "#ECECEC" }}>
            <Row>
              <Col>
                <h3 style={{ marginTop: "50px" }} name="nameProduct">
                  {product.name}
                </h3>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2">
                <h5 className="font-weight-normal ">Gi?? B??n:</h5>
              </Col>
            </Row>
            <Row>
              <Col className="mt-4">
                <h5>{elementPrice}</h5>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2">
                <h5>{elementNewPrice}</h5>
              </Col>
            </Row>
            <Row>
              <Col className="mt-2">
                <h5>--------------------------------------------</h5>
              </Col>
            </Row>
          </Col>
          <Col lg="5">
            <Row>
              <Col>
                <Image
                  class="Adjust__Image"
                  src={product.image}
                  style={{ maxWidth: "470px" }}
                ></Image>
              </Col>
            </Row>
            <Row>
              <Col className="ml-4 mt-2" style={{ backgroundColor: "#666666" }}>
                <p
                  className="font-weight-normal text-left"
                  style={{ color: "#f0f0f0", marginBottom: "0" }}
                >
                  Th??ng Tin V??? S???n Ph???m
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="ml-4 mt-2" style={{ backgroundColor: "#f0f0f0" }}>
                <h4
                  className="font-weight-normal text-left"
                  style={{ color: "#666", marginBottom: "0" }}
                >
                  {product.description}
                </h4>
              </Col>
            </Row>
          </Col>
        </React.Fragment>
      );
    });

    return resultFilter;
  };
  onClickChooseColor = (obj, nameColor, totalQuantityProduct) => {
    this.setState({
      isChooseColor: nameColor,
      quantityOfSize: totalQuantityProduct,
    });
  };
  ShowSize = (color_by_size, txtSize, isChooseColor) => {

    var result = null;
    var resultFilter = null;

    result = color_by_size.filter((item) => item.nameSize === txtSize);
    resultFilter = result ? (
      result.map((item, index) => {
        if (parseInt(item.totalQuantityProduct) <= 0) {
          return (
            <React.Fragment>
              <Col lg="4">
                <Button
                  style={{ margin: "0" }}
                  variant="link"
                  size="sm"
                  className="mt-1"
                  disabled
                >
                  <del>{item.nameColor}</del>
                </Button>
              </Col>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <Col lg="4">
                <Button
                  style={{ margin: "0" }}
                  variant="outline-secondary"
                  size="sm"
                  className={`mt-1 ${isChooseColor === item.nameColor
                      ? "active Adjust__Color-Choose"
                      : ""
                    }`}
                  onClick={() => {
                    this.onClickChooseColor(
                      this,
                      item.nameColor,
                      item.totalQuantityProduct
                    );
                  }}
                >
                  {item.nameColor}
                </Button>
              </Col>
            </React.Fragment>
          );
        }
      })
    ) : (
      <Col>
        <h4>M???i B???n Ch???n Size</h4>
      </Col>
    );

    return resultFilter;
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onAddToCart = (products) => {
  
    var { match, products_category, color_by_size } = this.props;
    var id_product = match.params.id_product;
    var { txtSize, isChooseColor, quantityOfSize } = this.state;

    var result = null;

    result = products_category.find((product) => product.id === id_product);
    if (result.percentSale) {
      var newPrice = (parseInt(result.percentSale) / 100) * result.price;
    }

    if (!isChooseColor) {
      toast.error("Xin Ch???n M??u V?? K??ch C???", { autoClose: 2500 });

      return;
    }

    var onTakeIdProductInfo = products.find(
      (item) =>
    
        item.nameColor === isChooseColor &&
        item.nameSize === txtSize
    );
console.log(JSON.stringify(onTakeIdProductInfo));
    var product = {
      id_product_info: onTakeIdProductInfo.id_product_info,
      id_product: match.params.id_product,
      nameProduct: result.name,
      imageProduct: result.image,
      priceProduct: result.price,
      priceSaleProduct: newPrice,
      sizeProduct: txtSize,
      isChooseColor,
      quantityAllProduct: quantityOfSize,
    };

    if (quantityOfSize > 0) {
      this.props.onAddToCart(product);
    } else {
      toast.error("S???n Ph???m ???? H???t !", { autoClose: 2500 });
    }
  };
  onToggleFormSize = () => {
    this.setState({
      isTogglFromSize: !this.state.isTogglFromSize,        
    });
  };
  showProductPredict = (products) => {
    var result = null;
    var getRandom = products
      .sort(() => Math.random() - Math.random())
      .slice(0, 4);
    result = getRandom.map((product, index) => {
      return (
        <React.Fragment>
          <Col lg="3" className="mt-4">
            <Item key={product.id} product={product} />
          </Col>
        </React.Fragment>
      );
    });

    return result;
  };

  render() {
    var { match, products_category, color_by_size} = this.props;
    var id_product = match.params.id_product;
    var { txtSize, isChooseColor, products  } = this.state;
    var {  isTogglFromSize } = this.state;
    var elmSize = isTogglFromSize ? (
      <Size onCloseForm={this.onCloseForm} />
    ) : (
      ""
    );
    return (
      <React.Fragment>
        <Container style={{ marginTop: "5%", marginBottom: "15%" }}>
          <Row className="mt-4">
            {this.showDetailProduct(products_category, id_product)}
            <Col className="ml-4" style={{ backgroundColor: "#ECECEC" }}>
              <p className="font-weight-bold " style={{ marginTop: "50px" }}>
                M??u:
              </p>
              <Row>{this.ShowSize(color_by_size, txtSize, isChooseColor)}</Row>
              <p className="font-weight-bold mt-5">K??ch C???:</p>
              <Row>
                <Col>
                  <Form.Select
                    name="txtSize"
                    onChange={this.onChange}
                    value={this.state.txtSize}
                  >
                    <option selected value="default">
                      ---
                    </option>
                    <option value="S">Size S</option>
                    <option value="M">Size M</option>
                    <option value="L">Size L</option>
                    <option value="XL">Size XL</option>
                    <option value="XXL">Size XXL</option>
                  </Form.Select>
                </Col>
              </Row>
              {elmSize}
              
              <Form.Group
                className="mb-3 text-center mt-2"
                controlId="formSize">
                  <NavLink to={`/product/${match.params.id_product}/size`}> B???ng k??ch c???</NavLink>
              </Form.Group>
              <h5 style={{ marginTop: "11px" }}>
                --------------------------------------------------------
              </h5>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    variant="danger"
                    type="button"
                    size="lg"
                    className="Cart__Checkout-button mt-5"
                    onClick={() => {
                      this.onAddToCart(products);
                    }}
                  >
                    Th??m V??o Gi??? H??ng
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>

          </Row>
          <Row>
            <Row className=' text-center mt-5'>
              <h2 className='font-weight-normal ' style={{ textDecoration: 'underline' }}>B???N C?? TH??? TH??CH?</h2>
            </Row>
            <Row style={{ boxShadow: '1px 1px 2px rgba(6,6,6)' }}>
              {this.showProductPredict(products_category)}
            </Row>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    products: state.products,
    products_category: state.products_category,
    color_by_size: state.color_by_size,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllProduct: (id) => {
      dispatch(actions.fetchProductResquest(id));
    },
    onGetAllSizeByProduct: (id_product) => {
      dispatch(actions_of_index.onGetAllColorBySizeResquest(id_product));
    },
    onAddToCart: (product) => {
      dispatch(actions_of_index.addToCart(product, 1));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
