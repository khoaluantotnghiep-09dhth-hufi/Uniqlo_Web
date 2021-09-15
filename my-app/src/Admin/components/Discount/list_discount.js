import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faTools } from "@fortawesome/free-solid-svg-icons";

import usersData from "../User/UserData";

import { Link } from "react-router-dom";
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const fields = [
  "id",
  "name",
  "desciption",
  "date_start",
  "date_end",
  "Hành Động",
];

class ListDiscount extends React.Component {
  componentDidMount() {
    this.props.fetchPromotions();
  }
  onDeletePromotion = (item) => {
   
    this.props.onDeleteItemPromotion(item);
  };
  render() {
    var { promotion } = this.props;

    var dataPromotion = promotion.map((item, index) => {
      return item;
    });

    return (
      <>
        {/* <Route to="/admin/system/discount/add"><CButton className="btn btn-danger" >Thêm Khuyến Mãi Mới</CButton></Route> */}
        <Link to="/admin/system/discount/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
            Thêm Mới
          </CButton>
        </Link>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Khuyến Mãi</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataPromotion}
                  fields={fields}
                  itemsPerPage={8}
                  pagination
                  scopedSlots={{
                    status: (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  }}
                  scopedSlots={{
                    "Hành Động": (item) => (
                      <td  >
                       <Link to={`/admin/system/discount/${item.id}/edit`}>
                        <CButton type="button" className="btn btn-primary">
                          <FontAwesomeIcon
                            icon={faTools}
                            className="mr-2"
                            size="lg"
                          />
                          Sửa
                        </CButton>
                      </Link>
                        <CButton
                          type="submit"
                          className="btn btn-warning"
                          onClick={()=>{this.onDeletePromotion(item.id)}}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="mr-2"
                            size="lg"
                          />
                          Xóa
                        </CButton>
                      </td>
                    ),
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    promotion: state.promotion,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPromotions: () => {
      return dispatch(actions.fetchPromotionsResquest());
    },
    onDeleteItemPromotion:(id) => {
      return dispatch(actions.onDeletePromotionResquest(id))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListDiscount);
