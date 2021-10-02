import React, { useSelector, useEffect } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import * as actions from "../../actions/productAdminActions";
import { connect } from "react-redux";
const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  // const productList = useSelector(state=> state.products)
  const defaultDatasets = (() => {
    let elements = 27
    const data1 = []
    const data2 = []
    const data3 = []
    // for (let i = 0; i <= elements; i++) {
    //   data1.push(random(50, 1000000))
    //   data2.push(random(80, 100))
    //   data3.push(65)
    // }
    console.log(data1);
    return [
      {
        label: 'My First dataset',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1
      },
      // {
      //   label: 'My Second dataset',
      //   backgroundColor: 'transparent',
      //   borderColor: brandSuccess,
      //   pointHoverBackgroundColor: brandSuccess,
      //   borderWidth: 2,
      //   data: data2
      // },
      // {
      //   label: 'My Third dataset',
      //   backgroundColor: 'transparent',
      //   borderColor: brandDanger,
      //   pointHoverBackgroundColor: brandDanger,
      //   borderWidth: 1,
      //   borderDash: [8, 5],
      //   data: data3
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


  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
    />
  )
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
export default connect(mapStateToProps, mapDispatchToProps)(MainChartExample);
