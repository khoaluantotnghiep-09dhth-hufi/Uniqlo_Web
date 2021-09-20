import React, { Component } from "react";
import $ from "jquery";
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
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChooseColor: '',
      txtSize: "",
    };
  }
  componentDidMount() {
    var { match } = this.props;
    var id_product = match.params.id_product;

    this.props.onGetAllProduct();
    this.props.onGetAllSizeByProduct(id_product);
  }

  showDetailProduct = (products_category, id_product) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    var result = null;
    result = products_category
      .filter((product) => product.id === id_product)

      .map((product, index) => {
        if (product.percentSale) {
          var newPrice = (parseInt(product.percentSale) / 100) * product.price;
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
                  <h3 style={{ marginTop: "50px" }}>{product.name}</h3>
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <h5 className="font-weight-normal ">Giá Bán:</h5>
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
                <Col
                  className="ml-4 mt-2"
                  style={{ backgroundColor: "#666666" }}
                >
                  <p
                    className="font-weight-normal text-left"
                    style={{ color: "#f0f0f0", marginBottom: "0" }}
                  >
                    Thông Tin Về Sản Phẩm
                  </p>
                </Col>
              </Row>
              <Row>
                <Col
                  className="ml-4 mt-2"
                  style={{ backgroundColor: "#f0f0f0" }}
                >
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

    return result;
  };
  onClickChooseColor=(obj,nameColor)=>{
    console.log(obj,nameColor)
    this.setState({
      isChooseColor: nameColor
    })
  }
  ShowSize = (color_by_size, txtSize,isChooseColor) => {
    var result = null;
    var resultFilter = null;
   const colorChoose="#000"
    result = color_by_size.filter((item) => item.nameSize === txtSize);
    resultFilter = result ? (
      result.map((item, index) => {
        if (parseInt(item.totalQuantityProduct) === 0) {
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
                  className={`mt-1 ${isChooseColor===item.nameColor?"active Adjust__Color-Choose":""}`}
                  onClick={() => {this.onClickChooseColor(this,item.nameColor)}}
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
        <h4>Mời Bạn Chọn Size</h4>
      </Col>
    );
    console.log(isChooseColor);
    
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
  render() {
    var { match, products_category, color_by_size } = this.props;
    var id_product = match.params.id_product;
    var { txtSize,isChooseColor } = this.state;
    console.log(txtSize);
    return (
      <React.Fragment>
        <Container style={{ marginTop: "5%", marginBottom: "15%" }}>
          <Row className="mt-4">
            {this.showDetailProduct(products_category, id_product)}
            <Col className="ml-4" style={{ backgroundColor: "#ECECEC" }}>
              <p className="font-weight-bold " style={{ marginTop: "50px" }}>
                Màu:
              </p>
              <Row>{this.ShowSize(color_by_size, txtSize,isChooseColor)}</Row>

              <p className="font-weight-bold mt-5">Kích Cỡ:</p>
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
              <h5 style={{ marginTop: "11px" }}>
                --------------------------------------------------------
              </h5>
            </Col>
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
    onGetAllProduct: () => {
      dispatch(actions.fetchProductResquest());
    },
    onGetAllSizeByProduct: (id_product) => {
      dispatch(actions_of_index.onGetAllColorBySizeResquest(id_product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
