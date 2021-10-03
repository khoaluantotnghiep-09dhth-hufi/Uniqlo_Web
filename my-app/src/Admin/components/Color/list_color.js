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
  {
    key: 'STT',
    label: 'STT',
    filter: false
  },
  {
    key: 'id',
    label: 'Mã',
    sorter: false,
    filter: false
  },
  { key: 'name', label: 'Tên Màu' },
  {
    key: 'Thao Tác',
    label: 'Thao Tác',
    _style: { width: '25%' },
    sorter: false,
    filter: false
  },
]

class ListColor extends React.Component {
  componentDidMount() {
    this.props.fetchColors();
  }
  onDeleteColor = (item) => {
    if (window.confirm('Bạn có chắc muốn xóa không ?')) {
      this.props.onDeleteItemColor(item);
    }
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
