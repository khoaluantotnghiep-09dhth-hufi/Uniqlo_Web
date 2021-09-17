import React, { Component } from "react";
import $ from "jquery";
import MenuSubChild from "./../Menu_SubChild/index";

import { connect } from "react-redux";
import * as actions from "./../../../../actions/index";
class index extends Component {
  componentDidMount() {
    this.props.onGetAllObject();
    this.props.onGetAllSector();
    var object = this.refs.id_Sector;
  }

  showListSector(sector, id_object, name_object) {
    var result = null;
    result = sector
      .filter((item) => item.id_object === id_object)
      .map((item, index) => {
        if (item) {
          return (
            <li id="id_SectorLi">
              <a class="dropdown-item">{item.name}</a>

              <MenuSubChild
                id_sectors={item.id}
                name_object={name_object}
                name_sectors={item.name}
              />
            </li>
          );
        }
        else{
          return ''
        }
      });

    return result;
  }
  render() {
    var { sector, id_object, name_object } = this.props;
    console.log($("#id_Sector").children("li"));
    return (
      <React.Fragment>
        {$("#id_Sector").children("li") ? (
          <ul
            id="id_Sector"
            class="dropdown-menu dropdown--one"
            aria-labelledby="navbarDropdownMenuLink"
          >
            {this.showListSector(sector, id_object, name_object)}
          </ul>
        ) : (
          <ul
            id="id_Sector"
            class="dropdown-menu dropdown--one"
            aria-labelledby="navbarDropdownMenuLink"
          >
            {this.showListSector(sector, id_object, name_object) === ""
              ? ""
              : this.showListSector(sector, id_object, name_object)}
          </ul>
        )}
      </React.Fragment>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    object: state.object,
    sector: state.sector,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllObject: () => {
      dispatch(actions.fetchObjectResquest());
    },
    onGetAllSector: () => {
      dispatch(actions.fetchSectorResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
