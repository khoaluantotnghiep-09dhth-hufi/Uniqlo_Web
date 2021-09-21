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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


import * as actions from "./../../../actions/index";
const fields = [
    'STT',
    { key: 'id', label: 'Mã Phiếu Nhập' },
    { key: 'date_import', label: 'Ngày Nhập' },
    { key: 'nameWarehouse', label: 'Kho Nhập' },
    { key: 'total_import', label: 'Tổng Nhập' },
    'Thao Tác',
]

class ListImportProduct extends React.Component {
    componentDidMount() {
      this.props.fetchImportProducts();
    }
    onDeleteImportProduct = (id) => {
      if (window.confirm("Bạn chắc chắn muốn xóa ?")) {
        this.props.onDeleteItemImportProduct(id);
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
                              <Link to={`/admin/manage/import-product/${item.id}/edit`}>
                                <CButton type="button" className="btn btn-primary">
                                  <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                </CButton>
                              </Link>
                                <CButton type="button"
                                  className="btn btn-warning"
                                  onClick={() => { this.onDeleteImportProduct(item.id) }}
                              >
                                  <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                </CButton>
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
        fetchImportProducts: () => {
            return dispatch(actions.fetchImportProductsResquest());
        },
        onDeleteItemImportProduct: (id) => {
            return dispatch(actions.onDeleteImportProductResquest(id))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListImportProduct);
