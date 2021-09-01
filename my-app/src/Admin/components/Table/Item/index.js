import React, { Component } from 'react';
import {  Button, Figure, Alert } from "react-bootstrap";

import {Link } from "react-router-dom";
class index extends Component {
  onDelete=(id) => {
if (confirm('Bạn Chắc Chắn Muốn Xoá?')) {//eslint-disable-line
  this.props.onDelete(id);
}
  }
    render() {
        var { product, index } = this.props;
        var nameStatus = product.status ? "Còn Hàng" : "Hết Hàng";
        var statusClass = product.status ? "secondary" : "danger";
        return (
            <tr>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>
                <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={product.image}
                  />
                </Figure>
              </td>
              <td>{product.color}</td>
              <td>{product.size}</td>
              <td>{product.price}</td>
              <td>
                <Alert variant={statusClass}>{nameStatus}</Alert>
              </td>
              <td>
                <Button variant="success" size="sm" onClick={()=>{this.onDelete(product.id)}}>
                  Xoá
                </Button>
                <Link to={`/admin/home/product/${product.id}/edit`}>
                  <Button variant="warning" size="sm">
                    Sửa
                  </Button>
                </Link>
              </td>
            </tr>
        );
    }
}

export default index;