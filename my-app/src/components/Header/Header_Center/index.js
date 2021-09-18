import React, { Component } from "react";

import "./Header_Center.scss";

import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import MenuParent from "./Menu_Parent/index";

class index extends Component {
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen1: false,
      sector: [],
    };
  }
  componentDidMount() {
    this.props.onGetAllObject();
    this.props.onGetAllSector();
  }
  onMouseEnter() {
    this.setState({ dropdownOpen1: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen1: false });
  }

  showListObject(object) {
    var result = null;

    result = object.map((item, index) => {
      return (
        <li class="nav-item dropdown ">
          {" "}
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            {item.name}
           
          </a>{" "}
        </li>
      );
    });
    return result;
  }
  render() {
    var { object } = this.props;
    return (
    <React.Fragment>
<MenuParent>

</MenuParent>
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
