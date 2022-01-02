import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "./../../components/Category_Product/Item_Product/index";
import { connect } from "react-redux";
import * as actions_of_index from "./../../actions/productActions";
import CallApi from "./../../Admin/utils/Callapi";
import * as actions from "./../../actions/index";
import "./Search.scss";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsSearch: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    
    var { match } = this.props;
    var keySearch = match.params.input_Search;
    try {
     CallApi(`web-search/${keySearch}`, "GET", null).then(
        (response) => {
          console.log("Products now: " + JSON.stringify(response));
          this.setState({
            productsSearch: response.data,
            isLoading: true,
          });
        }
      );
    } catch (error) {
      this.setState({
        isLoading: false,
      });
    }
  }

  showListProduct = (products) => {
    var { onAddToCart } = this.props;
    // var result = null;
    var resultFilter = null;

    //   if(getName){
    //     result = products.filter((product) => product.nameCategory.toLowerCase().includes(getName.toLowerCase())||product.name.toLowerCase().includes(getName.toLowerCase()))
    //   }
    // //Xoa Phan Tu Trung
    //   var resultRemoveDulicate = result.reduce((unique, o) => {
    //     if(!unique.some(obj => obj.id === o.id && obj.value === o.value)) {
    //       unique.push(o);
    //     }
    //     return unique;
    // },[]);

    resultFilter = products.map((product, index) => {
      return (
        <Col lg="3" className="mt-4">
          <Item key={product.id} product={product} onAddToCart={onAddToCart} />
        </Col>
      );
    });

    return resultFilter;
  };
  render() {
    var { match } = this.props;
    var {  productsSearch, isLoading } = this.state;
    var getName = match.params.input_Search;

    return isLoading === false ? (
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
      <Container>
        <h4
          className="font-weight-normal"
          style={{ marginTop: "10%", marginBottom: "5%" }}
        >
          Tìm kết quả với từ khóa "{getName}"...
        </h4>
        <Row>{this.showListProduct( productsSearch, getName)}</Row>
      </Container>
    );
  }
}


var mapDispatchToProps = (dispatch, props) => {
  return {
    onAddToCart: (product) => {
      dispatch(actions.addToCart(product, 1));
    },
   
  };
};

export default connect(null, mapDispatchToProps)(index);
