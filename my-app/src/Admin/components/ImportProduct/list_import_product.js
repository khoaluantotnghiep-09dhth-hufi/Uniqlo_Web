import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from '@coreui/react';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTimes,
  faTools,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import * as actions from "./../../../actions/importActions";
import { Alert } from 'react-bootstrap'
const getBadge = status => {
  switch (status) {
    case 1: return 'success'
    case 0: return 'warning'
    default: return 'primary'
  }
}
const fields = [
  'STT',
  { key: 'id', label: 'Mã Phiếu Nhập' },
  { key: 'id_order', label: 'Mã Phiếu Đặt' },
  { key: 'date_import', label: 'Ngày Nhập' },
  { key: 'name_warehouse', label: 'Kho Nhập' },
  { key: 'status', label: 'Trạng Thái' },
  'Thao Tác',
]

class ListImportProduct extends React.Component {
  componentDidMount() {
    this.props.fetchImport();
  }
  onDeleteImportProduct = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa ?")) {
      this.props.onDeleteItemImport(id);
    }
  };
  render() {
    var { import_product } = this.props;
    var data = import_product.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        <Link to="/admin/manage/import-product/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
          </CButton>
        </Link>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>
                Danh Sách Danh Mục
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={data}
                  fields={fields}
                  itemsPerPage={8}
                  pagination
                  scopedSlots={{
                    'Thao Tác':
                      (item) => (
                        <td>
                          {item.status === 1 ?
                            <Link to={`/admin/manage/import-info/${item.id}`}>
                              <CButton
                                type="button"
                                className="btn btn-danger"
                              >
                                <FontAwesomeIcon
                                  icon={faInfo}
                                  className="mr-2"
                                  size="lg"
                                />
                                Xem Chi Tiết
                              </CButton>
                            </Link>

                            :
                            <Link to={`/admin/manage/import-product/${item.id}/edit`}>
                              <CButton type="button" className="btn btn-primary">
                                <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                              </CButton>
                            </Link>
                            // <Link to={`/admin/manage/order-product/${item.id}/edit`}>
                            //     <CButton type="button" className="btn btn-warning">
                            //         <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Xóa
                            //     </CButton>
                            // </Link>
                          }
                          {item.status === 0 ?
                            <Link to={`/admin/manage/import-info/${item.id}`}>
                              <CButton
                                type="button"
                                className="btn btn-danger"
                              >
                                <FontAwesomeIcon
                                  icon={faInfo}
                                  className="mr-2"
                                  size="lg"
                                />
                                Xem Chi Tiết Nhập và Nhập Hàng
                              </CButton>
                            </Link>
                            : ""
                          }
                        </td>

                      ),
                    "status": (item) => (
                      <td>
                        <Alert variant={getBadge(item.status)}>
                          {item.status === 0 ? 'Chưa Nhập' : 'Đã Nhập'}
                        </Alert>
                      </td>
                    ),
                    'STT':
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
    import_product: state.import_product,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchImport: () => {
      return dispatch(actions.fetchImportResquest());
    },
    onDeleteItemImport: (id) => {
      return dispatch(actions.onDeleteImportResquest(id))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListImportProduct);
