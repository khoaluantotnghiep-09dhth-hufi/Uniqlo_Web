import React, { Component } from "react";
import io from "socket.io-client";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import {  MDBIcon } from "mdbreact";
import Call_API from "./../../../Admin/utils/Callapi";

import {
  Container,
  Row,
  Col,
  Button,
  
} from "react-bootstrap";
import { Image } from 'react-bootstrap';

import { toast } from "react-toastify";
import uniqid from "uniqid";

import { Redirect } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faTimes, faTools } from "@fortawesome/free-solid-svg-icons";
import { CButton, CDataTable } from "@coreui/react";
const headers = [
  { key: "index", label: "STT" },
  { key: "order_date", label: "Ngày Đặt Hàng" },
  { key: "delivery_date", label: "Ngày Giao Hàng" },
  { key: "name", label: "Tên  Phẩm" },
  { key: "image", label: "Hình Ảnh" },
  { key: "nameColor", label: "Màu" },
  { key: "nameSize", label: "Kích Cỡ" },
  { key: "quantity", label: "Tổng Số Lượng" },
  { key: "priceProduct", label: "Giá Sản Phẩm" },

  { key: "into_money", label: "Tổng Tiền" },
];
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});
const fields = [

  { key: "index", label: "STT" },
  { key: "order_date", label: "Ngày Đặt Hàng" },
  { key: "delivery_date", label: "Ngày Giao Hàng" },
  { key: "name", label: "Tên  Phẩm" },
  { key: "image", label: "Hình Ảnh" },
  { key: "nameColor", label: "Màu" },
  { key: "nameSize", label: "Kích Cỡ" },
  { key: "quantity", label: "Tổng Số Lượng" },
  { key: "priceProduct", label: "Giá Sản Phẩm" },

  { key: "into_money", label: "Tổng Tiền" },

];



class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckSignOut: false,
      show: false,
      setShow: false,
      txtHuyDon: "",
      txtPhone: "",
      txtPassword: "",
      isCheckRequest: "",
      dataBill:[],
    };
  }
  componentDidMount() {
    var { match } = this.props;

    Call_API(`bills-detail/${match.params.id_bill}`, "GET", null).then((response) => {
      this.setState({
        dataBill: response.data,
      })
    })
  }
  
  onSignOut = () => {
    var { cart } = this.props;
    sessionStorage.clear("client");
    localStorage.clear();

    this.props.onResetCart(cart);

    this.setState({ isCheckSignOut: true });
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
    var { bills_customer, users,history } = this.props;
    var { show, isCheckRequest,dataBill } = this.state;
    var sessionUser = JSON.parse(sessionStorage.getItem("client"));
    var data = dataBill.map((item, index) => {
      return { ...item, index };
    });
    var { isCheckSignOut } = this.state;
    if (isCheckSignOut) {
      // window.location.reload();
      return <Redirect push to={{ path: "/" }} />;
    }
    return (
      <Container style={{ paddingTop: "5%", paddingBottom: "5%" }}>
        <Row>
          <Col lg="8">
            <Row>
              <Col>
                {" "}
                <h3>CHI TIẾT ĐƠN HÀNG</h3>
                <br></br>
                <h6>
                  {/* Xin chào, <span>{sessionUser && sessionUser.length > 0 ? sessionUser.name : ''}</span> */}
                  Xin chào: <strong> {sessionUser && sessionUser.name}</strong>
                </h6>
                <h6>
                  {/* Xin chào, <span>{sessionUser && sessionUser.length > 0 ? sessionUser.name : ''}</span> */}
                  Điểm tích luỹ: <strong> {sessionUser.score} <MDBIcon fab icon="viacoin" /></strong>
                </h6>
              </Col>
              <Col>
                
                <Button
                  type="submit"
                  variant="outline-secondary"
                  size="sm"
                  style={{ margin: 0}}
                  onClick={()=>{
                    history.goBack();
                  }}
                >
                  <h6 style={{ marginBottom: 0 }}>TRở Về</h6>
                </Button>&nbsp;
              
              &nbsp;
             
            </Col>
            </Row>
           
          </Col>
          <Col>
           
            
            <Row>
              <Col></Col>
            </Row>
            <Row>
             
            </Row>
          </Col>
        </Row>
        <Row>
              <Col>
                <CDataTable
                  items={data}
                  fields={fields}
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  scopedSlots={{
                    order_date: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.order_date}</Moment>
                      </td>
                    ),

                    delivery_date: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {item.delivery_date}
                        </Moment>
                      </td>
                    ),
                    "image":
                      (item, index) => (
                        <td>
                          <Image  src={item.image} thumbnail />
                        </td>
                      ),
                      "priceProduct":(item, index) => (
                        <td>{formatter.format(item.priceProduct)}</td>
                      ),
                    "into_money":(item, index) => (
                        <td>{formatter.format(item.into_money)}</td>
                      ),
                  }}
                />
              </Col>
            </Row>
      </Container>
    );
  }
}

export default index;
