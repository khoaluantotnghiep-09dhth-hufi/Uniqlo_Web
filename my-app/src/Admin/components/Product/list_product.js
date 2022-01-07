import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CBadge
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTimes,
    faTools,
    faInfo,
    faFileExcel
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "./../../../actions/productAdminActions";
import { Image, Alert } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import ReactLoading from 'react-loading';
import Call_API from "./../../utils/Callapi";
const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
const fields = [
    {
        key: 'STT',
        label: 'STT',
        _style: { width: '1%' },
        sorter: true,
        filter: false
    },
    {
        key: 'name',
        label: 'Tên',
        _style: { width: '15%' },
    },
    {
        key: 'price',
        label: 'Giá',
        _style: { width: '1%' },
    },
    {
        key: 'description',
        label: 'Mô Tả',
        _style: { width: '11%' },
        sorter: false,
        filter: false
    },
    {
        key: 'nameCategory',
        label: 'Danh Mục',
        _style: { width: '0%' },
    },
    {
        key: 'namePromotion',
        label: 'Khuyến Mãi',
        _style: { width: '0%' },
    },
    {
        key: 'image',
        label: 'Ảnh',
        filter: false
    },
    {
        key: 'status',
        label: 'Trạng Thái',
        _style: { width: '1%' },
        filter: false
    },
    {
        key: 'Thao Tác',
        label: 'Thao Tác',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    }
]
const getBadge = (status) => {
    switch (status) {
        case 0: return 'success'
        case 1: return 'warning'
        default: return 'primary'
    }
}
const headers = [
    
    { label: "Danh Mục", key: "nameCategory" },
    { label: "Tên Sản Phẩm", key: "name" },
    { label: "Giá", key: "price" },
    { label: "Trạng Thái", key: "status" },

];
class ListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          isLoading: true,
        };
      }
      async componentDidMount() {
        Call_API("products-admin", "GET", null)
          .then((response) => {
           
            this.setState({
              data: response.data,
              isLoading: false,
            });
          })
          .catch((error) => console.log(error));
      }
    onDeleteProduct = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa không ?")) {
            this.props.onDeleteItemProduct(id);
        }
    };
    render() {
        var { data,isLoading } = this.state;
        var data = data.map((item, index) => {
            return item;
        });
        return isLoading ? (
            <div className="adjust_Loading">
              <button class="btn btn-danger" type="button" disabled>
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            </div>
          ) : (
            <>
                <Link to="/admin/manage/product/add">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
                    </CButton>
                </Link>
                <CSVLink
                    className="btn btn-success"
                    data={data} headers={headers}>
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" size="lg" />
                    Xuất Excel
                </CSVLink>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Sản Phẩm
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={data}
                                    fields={fields}
                                    itemsPerPage={5}
                                    pagination
                                    sorter
                                    columnFilter
                                    footer
                                    itemsPerPageSelect
                                    scopedSlots={{
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/manage/product/${item.id}/edit`}>
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                    <Link to={`/admin/manage/product-info/add/${item.id}/${item.status}`}>
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
                                                    <CButton
                                                        type="button"
                                                        className="btn btn-warning"
                                                        onClick={() => {
                                                            this.onDeleteProduct(item.id);
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
                                        'STT':
                                            (item, index) => (
                                                <td>
                                                    {index + 1}
                                                </td>
                                            ),
                                        'status':
                                            (item, index) => (
                                                <td>
                                                    <Alert variant={getBadge(item.status)}>
                                                        {item.status === 0 ? 'Còn Kinh Doanh' : 'Ngừng Kinh Doanh'}
                                                    </Alert>
                                                </td>
                                            ),
                                        'image':
                                            (item, index) => (
                                                <td>
                                                    <Image style={{ width: "200px", height: "200px" }} src={item.image} thumbnail />
                                                </td>
                                            ),
                                            'price':
                                            (item, index) => (
                                                <td>
                                                   <td>{formatter.format(item.price)}</td>
                                                </td>
                                            ),
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
        products: state.products,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProducts: () => {
            return dispatch(actions.fetchProductResquest());
        },
        onDeleteItemProduct: (id) => {
            return dispatch(actions.onDeleteProductResquest(id))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
