import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import {Link } from "react-router-dom";

class index extends Component {

  render() {
   
    //Code chỉnh sửa class Còn Hàng, Hết Hàng, Giảm giá, Khuyến mãi
   

    return (
      <div style={{ paddingTop: "5%" }}>
        <Link to="/admin/home/product/add">
          {" "}
          <Button type="button" variant="success" style={{ width: "11%" }}>
            THÊM SẢN PHẨM
          </Button>
        </Link>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Hình Ảnh</th>
              <th>Màu</th>
              <th>Kích Cỡ</th>
              <th>Giá</th>
              <th>Trạng Thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
{this.props.children}
           
          </tbody>
        </Table>
      </div>
    );
  }
}

export default index;
