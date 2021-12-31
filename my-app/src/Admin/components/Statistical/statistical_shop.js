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
  }
  render() {
    var { billTotal } = this.props;
    var { staff } = this.props;
    var { customer } = this.props;
    var { productInfo } = this.props;
    var { billTotalQuantity } = this.props;
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
        return item.sumTotal;
      })
      var dataTotalQuantity = billTotalQuantity.map((item, index) => {
        return item.sumTotalQuantity;
      })
      console.log(dataTotalQuantity)
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
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">Biểu Đồ Doanh Thu</h4>
                <br />
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
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBillTotal: () => {
      return dispatch(actions.fetchBillTotalResquest());
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