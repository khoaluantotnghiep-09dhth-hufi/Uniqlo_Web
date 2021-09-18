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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const fields = [
  "STT",
  { key: 'id', label: 'Mã' },
  { key: 'name', label: 'Tên' },
  'Hành Động'
]

class ListColor extends React.Component {
  componentDidMount() {
    this.props.fetchColors();
  }
  onDeleteColor = (item) => {
    this.props.onDeleteItemColor(item);
  };
  render() {
    var { color } = this.props;

    var dataColor = color.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        <Link to="/admin/manage/color/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
          </CButton>
        </Link>
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
                  itemsPerPage={8}
                  pagination
                  scopedSlots={{
                    'status':
                      (item) => (
                        <td>
                          {/* <CBadge color={getBadge(item.status)}>
                                                        {item.status}
                                                    </CBadge> */}
                        </td>
                      )

                  }}
                  scopedSlots={{
                    'Hành Động':
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
    color: state.color,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchColors: () => {
      return dispatch(actions.fetchColorResquest());
    },
    onDeleteItemColor: (id) => {
      return dispatch(actions.onDeleteColorResquest(id))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListColor);
