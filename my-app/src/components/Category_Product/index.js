import React, { Component } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";

import Slider from "../../components/Slider/index";
import Spinner from "react-bootstrap/Spinner";

import { connect } from "react-redux";
import "./Category_Product.scss";
import ReactPaginate from "react-paginate";
import * as actions from "./../../actions/index";
import Item from "./Item_Product/index";
import axios from "axios";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 4,
      currentPage: 0,
      txtFilter: 0,
      isLoading: true,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    //  this.showListProduct();
    
       this.props.onGetAllProduct();
     this.setState({
       isLoading: false,
     })
    
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
  onSelectChange = (eventkey) => {
    this.setState({
      txtFilter: parseInt(eventkey),
    });
  };

  render() {
    var { location, history, products_category } = this.props;
    var { txtFilter,isLoading } = this.state;

   
    if(isLoading){return  <div style={{display:"flex",alignContent:"center",justifyContent:"center"}}><Spinner  animation="grow" variant="danger" /></div>;}
    return (
      <Container className="mt-4">
        
        <Row className="Filter__Wrap">
          <Col>
            <Dropdown onSelect={this.onSelectChange}>
              <Dropdown.Toggle
                variant="outline-secondary"
                id="dropdown-basic"
                title="Dropdown button"
                txt="txtFilter"
              >
                Lọc Giá
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="0">Tất Cả</Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  { "Dưới " + formatter.format(400000)}
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  {formatter.format(500000) + " - " + formatter.format(900000)}
                </Dropdown.Item>
                <Dropdown.Item eventKey="3">
                  {"Trên " + formatter.format(900000)}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          {this.showListProduct(products_category, txtFilter)}

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
  };
  showListProduct = (products_category, idFilter) => {
    var { match } = this.props;
    var result = null;

    var id_Category = match.params.name_category;
    
    var data = products_category.filter(
      (product) => product.nameCategory === id_Category
    );
    if (idFilter === 1) {
      var dataFilter = data.filter(
        (product) => product.price < 400000 
      );
      result = dataFilter.map((product) => (
        <React.Fragment>
          <Col lg="3" className="mt-4">
            <Item key={product.id} product={product} />
          </Col>
        </React.Fragment>
      ));
    } else if (idFilter === 2) {
      var dataFilter = data.filter(
        (product) =>  product.price >= 500000 && product.price <= 900000
      );
      result = dataFilter.map((product) => (
        <React.Fragment>
          <Col lg="3" className="mt-4">
            <Item key={product.id} product={product} />
          </Col>
        </React.Fragment>
      ));
    } else if (idFilter === 3) {
      var dataFilter = data.filter((product) => product.price > 900000);
      result = dataFilter.map((product) => (
        <React.Fragment>
          <Col lg="3" className="mt-4">
            <Item key={product.id} product={product} />
          </Col>
        </React.Fragment>
      ));
    } else {
      result = data.map((product) => (
        <React.Fragment>
          <Col lg="3" className="mt-4">
            <Item key={product.id} product={product} />
          </Col>
        </React.Fragment>
      ));
    }
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
