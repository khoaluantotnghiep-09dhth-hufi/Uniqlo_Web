import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
import Moment from "react-moment";
import { Image, Alert } from 'react-bootstrap';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CImage,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faTools, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
const headers = [
  { label: "Mã", key: "id" },
  { label: "Tên Khuyến Mãi", key: "name" },
  { key: "description", label: "Phần Trăm Khuyến Mãi" },
  { key: "date_start", label: "Ngày Bắt Đầu" },
  { key: "date_end", label: "Ngày Kết Thúc" },
];
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
const options = { dateStyle: "short" };
const fields = [
  "STT",
  { key: "id", label: "Mã" },
  { key: "name", label: "Tên Khuyến Mãi" },
  { key: "description", label: "Phần Trăm Khuyến Mãi" },
  { key: "image", label: "Hình Ảnh Chương Trình" },
  { key: "date_start", label: "Ngày Bắt Đầu" },
  { key: "date_end", label: "Ngày Kết Thúc" },
  "Thao Tác",
];

class ListDiscount extends React.Component {
  componentDidMount() {
    this.props.fetchPromotions();
  }
  onDeletePromotion = (item) => {
    if (window.confirm("Bạn có chắc muốn xóa không ?")) {
      this.props.onDeleteItemPromotion(item);
    }
  };
  render() {
    var { promotion } = this.props;

    var dataPromotion = promotion.map((item, index) => {

      return { ...item, index };
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
        <CSVLink
          className="btn btn-success"
          data={dataPromotion} headers={headers}>
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
          Xuất Excel
        </CSVLink>
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
                    date_start: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.date_start}</Moment>
                      </td>
                    ),
                    date_end: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY">{item.date_end}</Moment>
                      </td>
                    ),
                    'image': (item) => (
                      <td>
                        <Image style={{ width: "200px", height: "200px" }} src={item.image} thumbnail />
                      </td>
                    ),
                    "Thao Tác": (item) => (
                      <td>
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
                          onClick={() => {
                            this.onDeletePromotion(item.id);
                          }}
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


                    STT: (item, index) => <td>{index + 1}</td>,
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
    onDeleteItemPromotion: (id) => {
      return dispatch(actions.onDeletePromotionResquest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListDiscount);
