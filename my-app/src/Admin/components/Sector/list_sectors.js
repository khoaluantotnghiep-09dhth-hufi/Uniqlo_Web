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
    {
        key: 'STT',
        label: 'STT',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
    
    { key: 'name', label: 'Tên Loại' },
    { key: 'nameObject', label: 'Đối Tượng' },
    {
        key: 'Thao Tác',
        label: 'Thao Tác',
        _style: { width: '25%' },
        sorter: false,
        filter: false
    },
]

class ListSector extends React.Component {
     componentDidMount() {
        this.props.fetchSectors();
    }
    onDeleteSector = (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa ?")) {
            this.props.onDeleteItemSector(id);
        }
    };
    render() {
        var { sector } = this.props;

        var dataSector = sector.map((item, index) => {
            return { ...item, index };
        });

        return (
            <>
                <Link to="/admin/manage/sector/add">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Loại Sản Phẩm
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={dataSector}
                                    fields={fields}
                                    itemsPerPage={5}
                                    sorter
                                    columnFilter
                                    footer
                                    itemsPerPageSelect
                                    pagination
                                    scopedSlots={{
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/manage/sector/${item.id}/edit`}>
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                    {/* <Link to="/admin/system/discount/../delete"> */}
                                                    <CButton type="button"
                                                        className="btn btn-warning"
                                                        onClick={() => { this.onDeleteSector(item.id) }}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} className="mr-2" size="lg" />Xóa
                                                    </CButton>
                                                    {/* </Link> */}

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
        sector: state.sector,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchSectors: () => {
            return dispatch(actions.fetchSectorResquest());
        },
        onDeleteItemSector: (id) => {
            return dispatch(actions.onDeleteSectorResquest(id))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListSector);
