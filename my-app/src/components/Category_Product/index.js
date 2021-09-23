import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Silder_Collection from "./../Slider_Collection/index";
import { connect } from "react-redux";
import "./Category_Product.scss";
import ReactPaginate from "react-paginate";
import * as actions from "./../../actions/index";
import Item from "./Item_Product/index";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.props.onGetAllProduct();
    this.showListProduct();
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.showListProduct();
      }
    );
  };

  render() {
    var { location } = this.props;

    return (
      <Container className="mt-4">
        <Row>
          <Silder_Collection />
        </Row>
        <Row>
          {this.state.result}

          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Row>

        <Row></Row>
      </Container>
    );
  }
  showListProduct = () => {
    var { match, products_category } = this.props;
    var result = null;

    var id_Category = match.params.name_category;
    var data = products_category.filter(
      (product) => product.nameCategory === id_Category
    );
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    result = slice.map((product) => (
      <React.Fragment>
        <Col lg="3" className="mt-4">
          <Item key={product.id} product={product} />
        </Col>
      </React.Fragment>
    ));
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),

      result,
    });
  };
}

var mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
    products_category: state.products_category,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteInCart: (product) => {
      dispatch(actions.removeToCart(product));
    },
    onUpdateQuantityCart: (product, quantity) => {
      dispatch(actions.updateQuantity(product, quantity));
    },
    onGetAllProduct: () => {
      dispatch(actions.fetchProductResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
