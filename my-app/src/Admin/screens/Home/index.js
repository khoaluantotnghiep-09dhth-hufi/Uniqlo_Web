import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaRegFile, FaHome, FaList, FaMouse } from "react-icons/fa";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import routes from "./../../routes/index";


class index extends Component {
  showContentRoutes = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  };
  render() {
    return (
      <Router>
        <Container fluid={true} className="p-0">
          <Row>
            <Col lg="2">
              <ProSidebar>
                <SidebarHeader>
                  <Row>
                    <Col lg="2">
                      {" "}
                      <Image
                        src="https://www.uniqlo.com/vn/explorer/img/logo_uq_01.gif"
                        rounded
                      />
                    </Col>
                    <Col>
                      {" "}
                      <h3 className="mt-2 ml-2">UNIQLO ADMINISTATOR</h3>
                    </Col>
                  </Row>
                </SidebarHeader>
                <SidebarContent>
                  <Menu iconShape="square">
                    <MenuItem icon={<FaHome />}>
                      Trang Chủ <Link to="/admin/home/dashboard" />
                    </MenuItem>

                    <MenuItem icon={<FaRegFile />}>
                      Sản Phẩm <Link to="/admin/home/product" />
                    </MenuItem>

                    <SubMenu title="Quản Lý Sản Phẩm" icon={<FaMouse />}>
                      <MenuItem>Thêm Sản Phẩm <Link to="/admin/home/product/add" /></MenuItem>
                      <MenuItem>Xoá Sản Phẩm</MenuItem>
                      <MenuItem>Sửa Sản Phẩm</MenuItem>
                    </SubMenu>

                    <SubMenu title="Cài Đặt" icon={<FaList />}>
                      <MenuItem>Giao Diện</MenuItem>
                      <MenuItem>Cấu Hình</MenuItem>
                    </SubMenu>
                  </Menu>
                </SidebarContent>
                <SidebarFooter>
                  {/**
                   *  You can add a footer for the sidebar ex: copyright
                   */}
                  <h6 className="text-center">copyright by Huy</h6>
                </SidebarFooter>
              </ProSidebar>
            </Col>
            <Col>
              <Switch>{this.showContentRoutes(routes)}</Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default index;
