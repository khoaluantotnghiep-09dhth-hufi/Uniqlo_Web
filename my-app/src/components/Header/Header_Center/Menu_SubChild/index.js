import React, { Component } from "react";


import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../../../actions/index";

class index extends Component {
  componentDidMount() {
    this.props.onGetAllCategory();
    this.props.onGetAllSector();
  }

  showListCategory(category, id_sectors,name_object,name_sectors) {
    var result = null;
 
    result = category.filter((item) => item.id_sectors === id_sectors).map((item, index) => {
    
        return (
          <li>
            <NavLink to={`/product/${name_object}/${name_sectors}/${item.id}`}>
              <a class="dropdown-item">{item.name}</a>
            </NavLink>
          </li>
        );
      });

    return result;
  }
  render() {
    var {category, id_sectors,name_object,name_sectors} = this.props;
    return (
      <React.Fragment>
        <ul class="dropdown-menu dropdown-submenu">
          {this.showListCategory(category, id_sectors,name_object,name_sectors)}
        </ul>
      </React.Fragment>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    sector: state.sector,
    category: state.category,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllSector: () => {
      dispatch(actions.fetchSectorResquest());
    },
    onGetAllCategory: () => {
        dispatch(actions.fetchCategoryResquest());
      },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
