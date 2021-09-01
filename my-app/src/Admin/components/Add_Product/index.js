import React, { Component } from "react";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import uniqid from "uniqid";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: "",
      itemImage: "",
      itemName: "",
      itemColor: "",
      itemSize: "",
      itemPrice: "",
      status: true,
    };
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      this.props.onEditProduct(id);
      // callApi(`products/${id}`, "GET", null).then((response) => {
      //   var data = response.data;
      //   this.setState({
      //     itemId: data.id,
      //     itemImage: data.image,
      //     itemName: data.title,
      //     itemColor: data.color,
      //     itemSize: data.size,
      //     itemPrice: data.price,
      //     status: data.status,
      //   });
      // });
    }
  }
  componentWillReceiveProps(NextProps) {
    if (NextProps && NextProps.itemEditting) {
      var { itemEditting } = this.props;
      this.setState({
        itemId: itemEditting.id,
        itemImage: itemEditting.image,
        itemName: itemEditting.title,
        itemColor: itemEditting.color,
        itemSize: itemEditting.size,
        itemPrice: itemEditting.price,
        status: itemEditting.status,
      });
    }
  }
  onSubmit = (event) => {
    event.preventDefault();
    var {
      itemId,
      itemImage,
      itemName,
      itemColor,
      itemSize,
      itemPrice,
      status,
    } = this.state;
    var { history } = this.props;
    var product = {
      id: uniqid("item-"),
      image: itemImage,
      title: itemName,
      color: itemColor,
      size: itemSize,
      price: itemPrice,
      status: status,
    };

    var productUpdate = {
      id: itemId,
      image: itemImage,
      title: itemName,
      color: itemColor,
      size: itemSize,
      price: itemPrice,
      status: status,
    };

    if (itemId) {     
      this.props.onUpdateProduct(productUpdate)
      history.goBack();
    } else {
      this.props.onAddProduct(product);
      history.goBack();
    }
  };

  render() {
    return (
      <div style={{ paddingTop: "5%" }}>
        <Form onSubmit={this.onSubmit}>
          <Alert variant="danger" className="text-center">
            <h3>THÊM SẢN PHẨM </h3>
          </Alert>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Col>
              <Form.Control
                type="text"
                placeholder="Hình ảnh sản phẩm"
                name="itemImage"
                value={this.state.itemImage}
                onChange={this.onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Col>
              <Form.Control
                type="text"
                placeholder="Tên sản phẩm"
                name="itemName"
                value={this.state.itemName}
                onChange={this.onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3 combobox"
            controlId="formHorizontalPassword"
          >
            <Form.Select
              aria-label="Blue"
              name="itemColor"
              value={this.state.itemColor}
              onChange={this.onChange}
            >
              <option isInvalid="true">Chọn màu sắc</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="Gray">Gray</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3 combobox"
            controlId="formHorizontalPassword"
          >
            <Form.Select
              aria-label="M"
              name="itemSize"
              value={this.state.itemSize}
              onChange={this.onChange}
            >
              <option isInvalid="true">Chọn Size</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3 "
            controlId="formHorizontalPassword"
          >
            <Col>
              <Form.Control
                type="text"
                placeholder="Giá sản phẩm"
                name="itemPrice"
                value={this.state.itemPrice}
                onChange={this.onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button
                variant="outline-secondary"
                type="submit"
                className="button-add"
              >
                Lưu Lại
              </Button>
              <Link to="/admin/home/product">
                <Button
                  variant="outline-secondary"
                  type="submit"
                  className="button-add mt-4"
                >
                  Trở Về
                </Button>
              </Link>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    itemEditting: state.itemEditting,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct: (product) => {
      dispatch(actions.onAddProductResquest(product));
    },
    onEditProduct: (id) => {
      dispatch(actions.onEditProductResquest(id));
    },
    onUpdateProduct: (product) => {
      dispatch(actions.onUpdateProductResquest(product));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
