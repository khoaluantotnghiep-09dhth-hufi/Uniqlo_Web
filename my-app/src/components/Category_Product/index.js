import React, { Component } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Silder_Collection from "./../Slider_Collection/index";
import Slider from "../../components/Slider/index";

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
  onSelectChange = (eventkey) => {
    this.setState({
      txtFilter: parseInt(eventkey),
    });
  };

  render() {
    var { location, history, products_category } = this.props;
    var { txtFilter } = this.state;
    console.log(txtFilter);
    var ListimagesNewStyle = [
      {
        id: 1,

        image:
          "https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl8340.jpg",
        status: true,
      },
      {
        id: 2,

        image:
          "https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl5261.jpg",
        status: true,
      },
      {
        id: 3,

        image:
          "https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl0393.jpg",
        status: true,
      },
      {
        id: 4,

        image:
          "https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl2679.jpg",
        status: true,
      },
    ];
    return (
      <Container className="mt-4">
        <Row>
          <Slider chooseSize="mr-2" arrayList={ListimagesNewStyle} />
        </Row>
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
        (product) => product.price <= 500000 && product.price <= 900000
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
