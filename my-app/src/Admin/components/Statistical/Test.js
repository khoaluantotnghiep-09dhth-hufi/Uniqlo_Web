import React from "react";
import * as actions from "../../../actions/billInfoActions";
import * as actionsStaff from "../../../actions/index";
import * as actionsProductInfo from "../../../actions/product_infoActions";
import { connect } from "react-redux";
import { CChartLine } from '@coreui/react-chartjs'
import { Link } from "react-router-dom";
import { getStyle, hexToRgba } from '@coreui/utils'
import {
    CBadge,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CCallout,
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
    faKey,
    faTshirt
} from "@fortawesome/free-solid-svg-icons";
import ChartLineSimple from '../../charts/ChartLineSimple';
const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'
class test extends React.Component {
    constructor(props) {
        super(props);
    }
    random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    componentDidMount() {
        this.props.fetchBillTotal();
        this.props.fetchStaffCount();
        this.props.fetchCustomerCount();
        this.props.fetchProductInfoCount();
    }
    render() {
        var { billTotal } = this.props;
        var { staff } = this.props;
        var { customer } = this.props;
        var { productInfo } = this.props;
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
            let elements = 27
            var { billTotal } = this.props;
            var dataTotal = billTotal.map((item, index) => {
                return item.total;
            })
            var dataDate = billTotal.map((item, index) => {
                return item.order_date;
            })
            const data2 = []
            const data3 = []
            for (let i = 0; i <= elements; i++) {

                data2.push(this.random(80, 100))
                data3.push(65)
            }
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
                    label: 'My Second dataset',
                    backgroundColor: 'transparent',
                    borderColor: brandSuccess,
                    pointHoverBackgroundColor: brandSuccess,
                    borderWidth: 2,
                    data: data2
                },
                {
                    label: 'My Third dataset',
                    backgroundColor: 'transparent',
                    borderColor: brandDanger,
                    pointHoverBackgroundColor: brandDanger,
                    borderWidth: 1,
                    borderDash: [8, 5],
                    data: data3
                }
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
                            maxTicksLimit: 5,
                            stepSize: Math.ceil(1000000 / 5),
                            max: 1000000
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
        // const line = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [
        //         {
        //             label: 'Doanh thu từng hóa đơn',
        //             fill: false,
        //             lineTension: 0.1,
        //             backgroundColor: 'rgba(75,192,192,0.4)',
        //             borderColor: 'rgba(75,192,192,1)',
        //             borderCapStyle: 'butt',
        //             borderDash: [],
        //             borderDashOffset: 0.0,
        //             borderJoinStyle: 'miter',
        //             pointBorderColor: 'rgba(75,192,192,1)',
        //             pointBackgroundColor: '#fff',
        //             pointBorderWidth: 1,
        //             pointHoverRadius: 5,
        //             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        //             pointHoverBorderColor: 'rgba(220,220,220,1)',
        //             pointHoverBorderWidth: 2,
        //             pointRadius: 1,
        //             pointHitRadius: 10,
        //             data: data,
        //         },
        //     ],
        // };
        var dataDate = billTotal.map((item, index) => {
            return item.order_date;
        })
        return (
            <>
                <CRow sm="12">
                    <CCol sm="4" lg="4">
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
                    <CCol sm="4" lg="4">
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
                    <CCol sm="4" lg="4">
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
                                <h4 id="traffic" className="card-title mb-0">Traffic</h4>
                                <div className="small text-muted">November 2017</div>
                            </CCol>
                            <CCol sm="7" className="d-none d-md-block">
                                <CButton color="primary" className="float-right">
                                    <CIcon name="cil-cloud-download" />
                                </CButton>
                                <CButtonGroup className="float-right mr-3">
                                    {
                                        ['Day', 'Month', 'Year'].map(value => (
                                            <CButton
                                                color="outline-secondary"
                                                key={value}
                                                className="mx-0"
                                                active={value === 'Month'}
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
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        fetchBillTotal: () => {
            return dispatch(actions.fetchBillTotalResquest());
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
export default connect(mapStateToProps, mapDispatchToProps)(test);