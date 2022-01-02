import React from "react";
import * as actionsProductInfo from "../../../actions/product_infoActions";
import { connect } from "react-redux";
import * as actions from "../../../actions/billInfoActions";
import * as actionsIndex from "../../../actions/index";
import * as actionsImport from "../../../actions/importActions";
import * as actionsOrderInfo from "../../../actions/orderInfoActions";
import * as actionsImportInfo from "../../../actions/importInfoActions";

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
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOrderSumDate();
    this.props.fetchProductInfoCount();
    this.props.fetchBillTotalQuantity();
    this.props.fetchOrderInfoCount();
    this.props.fetchImportInfoCount();
    this.props.fetchImportSumDate();
 
  }
  render() {
    var { order } = this.props;
    var { orderInfo } = this.props;
    var { productInfo } = this.props;
    var { billTotalQuantity } = this.props;
    var { importInfo } = this.props;
   
    var { import_product } = this.props;
   
    var dataSumImportQuantity = import_product.map((item, index) => {
      return item.sumQuantity;
    })
    var dataSumImportDate = import_product.map((item, index) => {
      return item.date_import;
    })


    var dataProductInfoCount = productInfo.map((item, index) => {
      return item.countProduct;
    })
    var dataSumDateOrder = order.map((item, index) => {
      return item.sumQuantity;
    })
    var dataSumDateDate = order.map((item, index) => {
      return item.date_order;
    })
    var dataOrderInfoCount = orderInfo.map((item, index) => {
      return item.countOrderInfo;
    })
    var dataImportInfoCount = importInfo.map((item, index) => {
      return item.countImportInfo;
    })
    const defaultDatasets = (() => {
      var dataTotalQuantity = billTotalQuantity.map((item, index) => {
        return item.sumTotalQuantity;
      })
      return [
        {
          label: 'Số lượng sản phẩm đặt',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: brandInfo,
          borderWidth: 2,
          data: dataSumDateOrder
        },
        {
          label: 'Số lượng sản phẩm nhập',
          backgroundColor: 'transparent',
          borderColor: brandSuccess,
          pointHoverBackgroundColor: brandSuccess,
          borderWidth: 2,
          data: dataSumImportQuantity
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
              stepSize: Math.ceil(999999 / 50),
                            max: 999999
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
    return (
      <>
        <CRow sm="12">
          <CCol sm="4" lg="4">
            <CWidgetDropdown
              color="gradient-info"
              header={dataOrderInfoCount}
              text="Sản phẩm đã đặt"
            >
              <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>
                    <Link to="/admin/manage/order-product" style={{ color: 'black' }}>
                      <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
                      Danh Sách Đơn Đặt Hàng
                    </Link>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>
          <CCol sm="4" lg="4">
            <CWidgetDropdown
              color="gradient-primary"
              header={dataImportInfoCount}
              text="Sản phẩm đã nhập"
            >
              <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>
                    <Link to="/admin/manage/import-product" style={{ color: 'black' }}>
                      <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
                      Danh Sách Đơn Nhập Hàng
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
                <h4 id="traffic" className="card-title mb-0">Biểu Đồ Đặt/Nhập Sản Phẩm</h4>
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
              labels={dataSumDateDate,dataSumImportDate}
            />
          </CCardBody>
        </CCard>
      </>
    )
  }
}
var mapStateToProps = (state) => {
  return {
    productInfo: state.productInfo,
    billTotalQuantity: state.billTotalQuantity,
    orderInfo: state.orderInfo,
    importInfo: state.importInfo,
    order: state.order,
    import_product: state.import_product,
   
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchOrderSumDate: () => {
      return dispatch(actionsIndex.fetchOrderSumDateResquest());
    },

    fetchImportSumDate: () => {
      return dispatch(actionsImport.fetchImportSumDateResquest());
    },
    fetchBillTotalQuantity: () => {
      return dispatch(actions.fetchBillTotalQuantityResquest());
    },
    fetchOrderInfoCount: () => {
      return dispatch(actionsOrderInfo.fetchOrderInfoCountQuantityResquest());
    },
    fetchImportInfoCount: () => {
      return dispatch(actionsImportInfo.fetchImportInfoCountResquest());
    },
    fetchProductInfoCount: () => {
      return dispatch(actionsProductInfo.fetchCountProductInfoResquest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);