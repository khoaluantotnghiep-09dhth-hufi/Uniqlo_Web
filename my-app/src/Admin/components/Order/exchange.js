import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/exchangeActions";
import { Alert } from "react-bootstrap";
import Moment from "react-moment";

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
} from "@coreui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
});
const options = { dateStyle: "short" };
const fields = [
    "STT",
    { key: "nameCustomer", label: "Tên Khách Hàng" },
    { key: "nameProduct", label: "Tên Sản Phẩm" },
    { key: "nameSize", label: "Kích Cỡ" },
    { key: "nameColor", label: "Màu" },
    { key: "quantity", label: "Số Lượng" },
    { key: "price", label: "Giá" },
    { key: "nameStaff", label: "Tên Nhân Viên Đổi" },
    { key: "reason", label: "Lý Do" },
    "Hành Động",
];

class ListOrder extends React.Component {
    componentDidMount() {
        this.props.fetchExchange();
    }
    onDeleteExchange = (item) => {
        this.props.onDeleteItemExchange(item);
    };
    getBadge = (status) => {
        switch (status) {
            case 1:
                return "success";
            case 0:
                return "danger";
            default:
                return "primary";
        }
    };
    render() {
        var { exchange } = this.props;

        var dataBill = exchange.map((item, index) => {
            return { ...item, index };
        });
        return (
            <>
                <Link to="/admin/system/order/exchange/add">
                    <CButton type="button" className="btn btn-danger">
                        Thêm Mới
                    </CButton>
                </Link>
                <CRow>
                    <CCol xs="12" lg="24">
                        <CCard>
                            <CCardHeader>Danh Sách Đổi Trả</CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={dataBill}
                                    fields={fields}
                                    itemsPerPage={8}
                                    pagination
                                    scopedSlots={{
                                        "Hành Động": (item) => (
                                            <td>
                                                <Link to={`/admin/system/order/${item.id}/edit`}>
                                                    <CButton type="button" className="btn btn-primary">
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="mr-2"
                                                            size="lg"
                                                        />
                                                        Xác Nhận Đơn
                                                    </CButton>
                                                </Link>

                                                <CButton
                                                    type="button"
                                                    className="btn btn-warning"
                                                    onClick={() => {
                                                        this.onDeleteExchange(item.id);
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                        className="mr-2"
                                                        size="lg"
                                                    />
                                                    Hủy Đơn
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
                                ></CDataTable>
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
        exchange: state.exchange,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchExchange: () => {
            return dispatch(actions.fetchExchangeResquest());
        },
        onDeleteItemExchange: (id) => {
            return dispatch(actions.onDeleteExchangeResquest(id));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
