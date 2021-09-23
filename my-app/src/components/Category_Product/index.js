import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Silder_Collection from "./../Slider_Collection/index";
import { connect } from "react-redux";
import "./Category_Product.scss";
import ReactPaginate from "react-paginate";
import * as actions from "./../../actions/index";
import Item from "./Item_Product/index";
import axios from 'axios'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 4,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    //  this.showListProduct();
    this.props.onGetAllProduct();
    
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
    var { location,history, products_category  } = this.props;
    

    return (

      <Container className="mt-4">
        <Row>
          <Silder_Collection />
        </Row>
        <Row>
         {this.showListProduct(products_category)}
      
          {/* {this.state.result}
         
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
         
          /> */}
        </Row>

        <Row></Row>
      </Container>
    );
  }
  refresh = () => {
    window.location.reload();
}
  showListProduct = (products_category) => {
    var { match } = this.props;
    var result = null;

    var id_Category = match.params.name_category;
    // axios
    // .get(`http://127.0.0.1:8000/products-category/${id_Category}`)
    // .then(res => {
    //   const data= res.data;
    //  console.log(data)
    //   const slice = data.slice(
    //     this.state.offset,
    //     this.state.offset + this.state.perPage
    //   );
    //   result = slice.map((product) => (
    //     <React.Fragment>
    //       <Col lg="3" className="mt-4">
    //         <Item key={product.id} product={product} />
    //       </Col>
    //     </React.Fragment>
    //   ));
      // this.setState({
      //   pageCount: Math.ceil(data.length / this.state.perPage),
  
      //  result
      // });
    // })
    console.log(products_category)
    var data = products_category.filter(
        (product) => product.nameCategory === id_Category
      );
      result = data.map((product) => (
        <React.Fragment>
          <Col lg="3" className="mt-4">
            <Item key={product.id} product={product} />
          </Col>
        </React.Fragment>
      ));
      return result;
   
    
  };
}

var mapStateToProps = (state) => {
  return {
    products: state.products,
    products_category: state.products_category,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllProduct: () => {
      dispatch(actions.fetchProductResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
