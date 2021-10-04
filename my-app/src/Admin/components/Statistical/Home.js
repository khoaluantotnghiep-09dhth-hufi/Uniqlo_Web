import React from "react";
import * as actions from "../../../actions/billInfoActions";
import * as actionsStaff from "../../../actions/index";
import * as actionsProductInfo from "../../../actions/product_infoActions";
import { connect } from "react-redux";
import * as actionsBillInfo from "../../../actions/billInfoActions";
import { CChartLine } from '@coreui/react-chartjs'
import { Link } from "react-router-dom";
import { getStyle, hexToRgba } from '@coreui/utils'
import {
    CBadge,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CWidgetDropdown,
    CDropdown,
    CDropdownToggle,
    CDropdownItem,
    CDropdownMenu
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBullseye,
    faSignOutAlt,
    faUser,
    faListUl,
    faTshirt
} from "@fortawesome/free-solid-svg-icons";

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchBillTotal();
        this.props.fetchStaffCount();
        this.props.fetchCustomerCount();
        this.props.fetchProductInfoCount();
        this.props.fetchBillTotalQuantity();
        this.props.fetchBillStatusEqual0();
    }
    render() {
        var { billTotal } = this.props;
        var { staff } = this.props;
        var { customer } = this.props;
        var { productInfo } = this.props;
        var { billTotalQuantity } = this.props;
        var { bill } = this.props;
        var dataBillStatusEqual0 = bill.map((item, index) => {
            return item.countStatus;
        })
        var dataProductInfoCount = productInfo.map((item, index) => {
            return item.countProduct;
        })
        var dataStaffCount = staff.map((item, index) => {
            return item.countStaff;
        })
        var dataCustomerCount = customer.map((item, index) => {
            return item.countCustomer;
        })
        const defaultDatasets = (() => {
            var { billTotal } = this.props;
            var dataTotal = billTotal.map((item, index) => {
                return item.sumTotal;
            })
            var dataTotalQuantity = billTotalQuantity.map((item, index) => {
                return item.sumTotalQuantity;
            })
            return [
                {
                    label: 'Tổng tiền hóa đơn',
                    backgroundColor: hexToRgba(brandInfo, 10),
                    borderColor: brandInfo,
                    pointHoverBackgroundColor: brandInfo,
                    borderWidth: 2,
                    data: dataTotal
                },
                {
                    label: 'Số lượng sản phẩm',
                    backgroundColor: 'transparent',
                    borderColor: brandSuccess,
                    pointHoverBackgroundColor: brandSuccess,
                    borderWidth: 2,
                    data: dataTotalQuantity
                },
                // {
                //     label: 'My Third dataset',
                //     backgroundColor: 'transparent',
                //     borderColor: brandDanger,
                //     pointHoverBackgroundColor: brandDanger,
                //     borderWidth: 1,
                //     borderDash: [8, 5],
                //     data: data3
                // }
            ]
        })()
        const defaultOptions = (() => {
            return {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 15,
                            stepSize: Math.ceil(10000000 / 8),
                            max: 10000000
                        },
                        gridLines: {
                            display: true
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3
                    }
                }
            }
        }
        )()
        var dataDate = billTotal.map((item, index) => {
            return item.order_date;
        })
        return (
            <>
                <CRow sm="12">
                    <CCol sm="3" lg="3">
                        <CWidgetDropdown
                            color="gradient-warning"
                            header={dataBillStatusEqual0}
                            text="Đơn Hàng Chờ Xác Nhận"
                        >
                            <CDropdown>
                                <CDropdownToggle color="transparent">
                                    <CIcon name="cil-settings" />
                                </CDropdownToggle>
                                <CDropdownMenu className="pt-0" placement="bottom-end">
                                    <CDropdownItem>
                                        <Link to="/admin/system/order/all" style={{ color: 'black' }}>
                                            <FontAwesomeIcon icon={faListUl} size="lg" className="mr-2" />
                                            Danh Sách Đơn Hàng
                                        </Link>
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CWidgetDropdown>
                    </CCol>
                    <CCol sm="3" lg="3">
                        <CWidgetDropdown
                            color="gradient-info"
                            header={dataCustomerCount}
                            text="Khách hàng trong hệ thống"
                        >
                            <CDropdown>
                                <CDropdownToggle color="transparent">
                                    <CIcon name="cil-settings" />
                                </CDropdownToggle>
                                <CDropdownMenu className="pt-0" placement="bottom-end">
                                    <CDropdownItem>
                                        <Link to="/admin/manage/customers" style={{ color: 'black' }}>
                                            <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
                                            Danh Sách Khách Hàng
                                        </Link>
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CWidgetDropdown>
                    </CCol>
                    <CCol sm="3" lg="3">
                        <CWidgetDropdown
                            color="gradient-primary"
                            header={dataStaffCount}
                            text="Nhân viên trong hệ thống"
                        >
                            <CDropdown>
                                <CDropdownToggle color="transparent">
                                    <CIcon name="cil-settings" />
                                </CDropdownToggle>
                                <CDropdownMenu className="pt-0" placement="bottom-end">

                                    <CDropdownItem>
                                        <Link to="/admin/manage/staffs" style={{ color: 'black' }}>
                                            <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
                                            Danh Sách Nhân Viên
                                        </Link>
                                    </CDropdownItem>

                                </CDropdownMenu>
                            </CDropdown>
                        </CWidgetDropdown>
                    </CCol>
                    <CCol sm="3" lg="3">
                        <CWidgetDropdown
                            color="gradient-danger"
                            header={dataProductInfoCount}
                            text="Sản phẩm trong hệ thống"
                        >
                            <CDropdown>
                                <CDropdownToggle color="transparent">
                                    <CIcon name="cil-settings" />
                                </CDropdownToggle>
                                <CDropdownMenu className="pt-0" placement="bottom-end">
                                    <CDropdownItem>
                                        <Link to="/admin/manage/products" style={{ color: 'black' }}>
                                            <FontAwesomeIcon icon={faTshirt} size="lg" className="mr-2" />
                                            Danh Sách Sản Phẩm
                                        </Link>
                                    </CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CWidgetDropdown>
                    </CCol>
                </CRow>
                <CCard>
                    <CCardBody>
                        <CRow>
                            <CCol sm="5">
                                <h4 id="traffic" className="card-title mb-0">Biểu Đồ Doanh Thu</h4>
                                <br />
                            </CCol>
                            <CCol sm="7" className="d-none d-md-block">
                                <CButton color="primary" className="float-right">
                                    <CIcon name="cil-cloud-download" />
                                </CButton>
                                <CButtonGroup className="float-right mr-3">
                                    {
                                        ['Ngày', 'Tháng', 'Năm'].map(value => (
                                            <CButton
                                                color="outline-secondary"
                                                key={value}
                                                className="mx-0"
                                                active={value === 'Tháng'}
                                            >
                                                {value}
                                            </CButton>
                                        ))
                                    }
                                </CButtonGroup>
                            </CCol>
                        </CRow>
                        <CChartLine
                            style={{ width: "100%", height: "500px" }}
                            datasets={defaultDatasets}
                            options={defaultOptions}
                            labels={dataDate}
                        />
                    </CCardBody>
                </CCard>
            </>
        )
    }
}
var mapStateToProps = (state) => {
    return {
        billTotal: state.billTotal,
        staff: state.staff,
        customer: state.customer,
        productInfo: state.productInfo,
        billTotalQuantity: state.billTotalQuantity,
        bill: state.bill,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchBillTotal: () => {
            return dispatch(actions.fetchBillTotalResquest());
        },
        fetchBillStatusEqual0: () => {
            return dispatch(actionsStaff.fetchBillStatusEqual0Resquest());
        },
        fetchBillTotalQuantity: () => {
            return dispatch(actions.fetchBillTotalQuantityResquest());
        },
        fetchStaffCount: () => {
            return dispatch(actionsStaff.fetchCountStaffsResquest());
        },
        fetchCustomerCount: () => {
            return dispatch(actionsStaff.fetchCountCustomerResquest());
        },
        fetchProductInfoCount: () => {
            return dispatch(actionsProductInfo.fetchCountProductInfoResquest());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);