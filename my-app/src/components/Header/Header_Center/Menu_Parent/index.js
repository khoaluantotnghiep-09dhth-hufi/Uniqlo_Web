import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import MenuChild from "./../Menu_Child/index";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./../../../../actions/index";
class index extends Component {
  componentDidMount() {
    this.props.onGetAllObject();
    this.props.onGetAllSector();
  }
  onClick = (event) => {
    event.preventDefault();
  };
  showListObject(object) {
    var result = null;

    result = object.map((item, index) => {
      return (
        <li class="nav-item dropdown ">
          {" "}
          <NavLink to={`/${item.name}`}>
            <a
              class="nav-link dropdown-toggle"
              href="javascript:void(0);"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              {item.name}
              <MenuChild
                id_object={item.id}
                name_object={item.name}
              ></MenuChild>
            </a>{" "}
          </NavLink>
        </li>
      );
    });
    return result;
  }
  render() {
    var { object } = this.props;
    return (
      <React.Fragment>
        <Nav className="justify-content-around font-nav">
          {this.showListObject(object)}
        </Nav>
      </React.Fragment>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    object: state.object,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllObject: () => {
      dispatch(actions.fetchObjectsResquest());
    },
    onGetAllSector: () => {
      dispatch(actions.fetchSectorResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
