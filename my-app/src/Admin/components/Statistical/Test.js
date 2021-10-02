import React from "react";
import * as actions from "../../../actions/productAdminActions";
import { connect } from "react-redux";
import { CChartLine } from '@coreui/react-chartjs'
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
    CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'
class test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProduct: []
        }
    }
    random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    componentDidMount() {

        this.props.fetchProducts()


    }
    defaultDatasets = () => {
        let elements = 27
        const data1 = []
        const data2 = []
        const data3 = []
        var { products } = this.props;
        products.map((item, index) => {
            data1.push(item)
        }, () => {
            console.log("data1 nè", data1)
        })

        return [
            {
                label: 'My First dataset',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: brandInfo,
                borderWidth: 2,
                data: data1
            },

        ]
    }
    defaultOptions = () => {
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

    render() {
        var { products } = this.props;
        var data = products.map((item, index) => {
            return item;
        })
        const line = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40, 52, 42, 458, 69],
                },
            ],
        };
        return (
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
                        // {...attributes}
                        datasets={line.datasets}
                        options={this.defaultOptions}
                        labels={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
                    />
                </CCardBody>
            </CCard>
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
export default connect(mapStateToProps, mapDispatchToProps)(test);