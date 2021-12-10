import React from 'react'
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

} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTimes,
  faTools,
  faFileExcel
} from "@fortawesome/free-solid-svg-icons";
import { Link,NavLink ,Redirect } from "react-router-dom";
import { CSVLink } from "react-csv";
const headers = [
  { label: "Mã", key: "id" },
  { label: "Tên Màu", key: "name" },
];
const fields =
    ["STT",
        { key: "title", label: "Tiêu Đề" },
        { key: "date", label: "Ngày Đăng" },
        { key: "descriptionText", label: "Nội Dung" },
        { key: "name", label: "Nhân Viên" },
        { key: "image", label: "Ảnh" },
        "Thao Tác",
    ]
class ListNewsTest extends React.Component {
  componentDidMount() {
    this.props.fetchColors();
  }
  onDeleteColor = (item) => {
    if (window.confirm('Bạn có chắc muốn xóa không ?')) {
    //   this.props.onDeleteItemColor(item);
    }
  };
  render() {
    var { news } = this.props;
    var dataColor = news.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        <Link to="/admin/manage/news/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
          </CButton>
        </Link>
        <CSVLink
          className="btn btn-success"
          data={dataColor} headers={headers}>
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
          Xuất Excel
        </CSVLink>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>
                Danh Sách Màu
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataColor}
                  fields={fields}
                  itemsPerPage={5}
                  sorter
                  columnFilter
                  itemsPerPageSelect
                  pagination
                  scopedSlots={{
                    'Thao Tác':
                      (item) => (
                        <td>
                          <Link to={`/admin/manage/color/${item.id}/edit`}>
                            <CButton type="button" className="btn btn-primary">
                              <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                            </CButton>
                          </Link>

                          <CButton type="button" className="btn btn-warning"
                            onClick={() => { this.onDeleteColor(item.id) }}
                          >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                          </CButton>


                        </td>

                      ),
                    "STT":
                      (item, index) => (
                        <td>
                          {index + 1}
                        </td>
                      )
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>


        </CRow>


      </>
    )
  }
}
var mapStateToProps = (state) => {
  return {
   news: state.news,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchColors: () => {
      return dispatch(actions.fetchNewsResquest());
    },
    // onDeleteItemColor: (id) => {
    //   return dispatch(actions.onDeleteColorResquest(id))
    // }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListNewsTest);
