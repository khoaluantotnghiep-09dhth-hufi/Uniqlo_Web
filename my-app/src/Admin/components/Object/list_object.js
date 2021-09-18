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
const fields = ['STT',
    { key: 'id', label: 'Mã Đối Tượng' },
    { key: 'name', label: 'Tên Đối Tượng' },
    'Thao Tác',
]

class ListObject extends React.Component {
    componentDidMount() {
        this.props.fetchObjects();
    }
    onDeleteObject = (item) => {
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            this.props.onDeleteItemObject(item);
        }
    };
    render() {
        var { object } = this.props;
        var dataObject = object.map((item, index) => {
            return item;
        });
        return (
            <>
                <Link to="/admin/manage/object/add">
                    <CButton type="button" className="btn btn-danger">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm Mới
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>
                                Danh Sách Đối Tượng
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={dataObject}
                                    fields={fields}
                                    itemsPerPage={8}
                                    pagination
                                    scopedSlots={{
                                        'Thao Tác':
                                            (item) => (
                                                <td>
                                                    <Link to={`/admin/manage/object/${item.id}/edit`}>
                                                        <CButton type="button" className="btn btn-primary">
                                                            <FontAwesomeIcon icon={faTools} className="mr-2" size="lg" />Sửa
                                                        </CButton>
                                                    </Link>
                                                 
                                                    <CButton type="button"
                                                        className="btn btn-warning"
                                                        onClick={() => { this.onDeleteObject(item.id) }}
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
        );
    }
}
var mapStateToProps = (state) => {
    return {
        object: state.object,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchObjects: () => {
             dispatch(actions.fetchObjectsResquest());
        },
        onDeleteItemObject: (id) => {
             dispatch(actions.onDeleteObjectsResquest(id))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListObject);
