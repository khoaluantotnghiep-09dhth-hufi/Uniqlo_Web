import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import "./Header_Center.scss";
import { NavLink } from "react-router-dom";

class index extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen1: false,
    };
  }

  onMouseEnter() {
    this.setState({ dropdownOpen1: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen1: false });
  }
  render() {
    return (
      <Nav className="justify-content-around font-nav">
        <li class="nav-item dropdown ">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Nữ
          </a>
          <ul
            class="dropdown-menu dropdown--one"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <NavLink to="category">
                <a class="dropdown-item">Đặc Biệt</a>
              </NavLink>
            </li>
            <li>
              <NavLink to="category">
                <a class="dropdown-item">Bộ Sưu Tập</a>
              </NavLink>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Áo Khoác
              </a>
            </li>

            <li>
              <NavLink to="category">
                <a class="dropdown-item" href="#">
                  Áo &raquo;
                </a>
              </NavLink>
              <ul class="dropdown-menu dropdown-submenu">
                <li>
                  <a class="dropdown-item" href="#">
                    Áo Thun UT
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Áo Thun
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    {" "}
                    Áo Sơ Mi/Áo Kiểu &raquo;{" "}
                  </a>
                  <ul class="dropdown-menu dropdown-submenu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Bộ Sưu Tập Áo Kiểu
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Bộ Sưu Tập Áo Sơ Mi{" "}
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Áo nỉ/hoodie{" "}
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Áo Dệt Kim/Áo Len
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Nam
          </a>
          <ul
            class="dropdown-menu dropdown--one"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a class="dropdown-item" href="#">
                Đặc Biệt
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Bộ Sưu Tập
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Áo Khoác
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Trẻ Em
          </a>
          <ul
            class="dropdown-menu dropdown--one"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a class="dropdown-item" href="#">
                Đặc Biệt
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Bộ Sưu Tập
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Áo Khoác
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Trẻ Sơ Sinh
          </a>
          <ul
            class="dropdown-menu dropdown--one"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a class="dropdown-item" href="#">
                Đặc Biệt
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Bộ Sưu Tập
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Áo Khoác
              </a>
            </li>
          </ul>
        </li>
      </Nav>
    );
  }
}

export default index;
