import React, { Component } from 'react';
import {Table} from 'react-bootstrap'

class index extends Component {
    render() {
        return (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Ngày</th>
                <th>Chuyển đến</th>
                <th>Giá trị đơn hàng</th>
                <th>Tình trạng thanh toán</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>20/4/2021</td>
                <td>20,Phường 12, Quận Gò Vấp, Tp.HCM</td>
                <td>400.000đ</td>
                <td>Đã Thanh Toán</td>
              </tr>
              
            </tbody>
          </Table>
        );
    }
}

export default index;