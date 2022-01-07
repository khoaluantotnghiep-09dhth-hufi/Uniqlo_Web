import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import callApi from "./../utils/Callapi";

import * as actions from "./../../actions/index";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
const socket = io("http://localhost:3008");

class TheHeaderDropdownNotif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityNotifications: 0,
      nameNotifications: [],
      isCheckToggle: true,
    };
  }
  componentDidMount() {
    var { nameNotifications } = this.state;

    var count = 1;

    //Admin lắng nghe khi có Khách Hàng order sản phẩm
    socket.on("customer-order-notifications", (data) => {
      const message = "Có " + data.name + " Order Nè";
      const time = data.today;
      //  var notifications=count++;
      var nameNotifications = {
        message,
        time,
      };
      // var newVal=JSON.stringify(nameNotifications)
      var newVal = {
        id:data.id,
        content: message,
        time:time,
      };
   
      this.props.fetchAddNotifications(newVal);
      // this.setState({
      //   nameNotifications: [...this.state.nameNotifications, data.name],
      //   quantityNotifications: count++,
      // });
    });

    socket.on("customer-request-cancel-bill-notifications", data => {

      const message = "Có " + "Khách Hàng " + data.name + " Hủy Đơn " + data.id_bill + " Lý Do " + data.reasons + " Nè";
      const time = data.today;
      var newVal = {
        id:data.id,
        content: message,
        time:time,
      };

      this.props.fetchAddNotifications(newVal);
      callApi("notifications", "POST", newVal);
    });

    socket.on("customer-request-return-bill-notifications", data => {

      const message = "Có " + "Khách Hàng " + data.name + " Trả hàng " + data.id_bill + " Lý Do " + data.reasons + " Nè";
      const time = data.today;
      var newVal = {
        id:data.id,
        content: message,
        time:time,
      };

      this.props.fetchAddNotifications(newVal);
      callApi("notifications", "POST", newVal);
    });
  }

  onClickNotice = () => {
    this.setState({
      quantityNotifications: 0,
    });
  };
  render() {
    var { quantityNotifications, nameNotifications } = this.state;
    var { header_notifications } = this.props;
    console.log('Truoc khi parse: ' + header_notifications);


    // Lấy 5 Thông Báo Cuối Mảng
    var renderNotification = header_notifications
      ? header_notifications.slice(-5).map((item, index) => {
        return (
          <CDropdownItem>
            <CIcon name="cil-user-follow" className="mr-2 text-success" />
            <span>{item.content} </span>

          </CDropdownItem>
        );
      })
      : "";

    var renderMore = header_notifications && header_notifications.length <= 5 ? (
      <CDropdownItem className="text-center ">
        <Link to="/admin/notifications">
          <span className="text-center small">Xem Thêm</span>
        </Link>
      </CDropdownItem>
    )
      : (
        ""
      );

    return (
      <CDropdown inNav className="c-header-nav-item mx-2">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          
          <CIcon name="cil-bell" className="mr-4" />
          {header_notifications ? (
            <CBadge
              style={{ marginLeft: "-9px" }}
              shape="pill"
              color="danger"
              onChange={this.onClickNotice}
            >
              <span id="number-notifications">
                {header_notifications.length}{" "}
              </span>

            </CBadge>

          ) : (
            ""
          )}

        </CDropdownToggle>
        <CDropdownMenu placement="bottom-end" className="pt-0">
          <CDropdownItem header tag="div" className="text-center" color="light">
            <strong>
              You have {header_notifications ? header_notifications.length : 0}{" "}
              notifications
            </strong>
          </CDropdownItem>

          {/* Chức Năng */}
          {/* <CDropdownItem>
          <CIcon name="cil-user-follow" className="mr-2 text-success" /> New
          user registered
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user-unfollow" className="mr-2 text-danger" /> User
          deleted
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-chart-pie" className="mr-2 text-info" /> Sales report
          is ready
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-basket" className="mr-2 text-primary" /> New client
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-speedometer" className="mr-2 text-warning" /> Server
          overloaded
        </CDropdownItem>
        */}
          {renderNotification}
          {renderMore}
          {/* //Thông Tin Server */}
          <CDropdownItem header tag="div" color="light">
            <strong>Server</strong>
          </CDropdownItem>
          <CDropdownItem className="d-block">
            <div className="text-uppercase mb-1">
              <small>
                <b>CPU Usage</b>
              </small>
            </div>
            <CProgress size="xs" color="info" value={25} />
            <small className="text-muted">348 Processes. 1/4 Cores.</small>
          </CDropdownItem>
          <CDropdownItem className="d-block">
            <div className="text-uppercase mb-1">
              <small>
                <b>Memory Usage</b>
              </small>
            </div>
            <CProgress size="xs" color="warning" value={70} />
            <small className="text-muted">11444GB/16384MB</small>
          </CDropdownItem>
          <CDropdownItem className="d-block">
            <div className="text-uppercase mb-1">
              <small>
                <b>SSD 1 Usage</b>
              </small>
            </div>
            <CProgress size="xs" color="danger" value={90} />
            <small className="text-muted">243GB/256GB</small>
          </CDropdownItem>
          <CDropdownItem
            className="text-center "
            color="light"
            onClick={this.onClickNotice}
          >
            <span className="text-center small">Đóng</span>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    header_notifications: state.header_notifications,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {

    onBillCancel: (bills) => {
      dispatch(actions.onAddNotificationCancelResquest(bills));
    },
    fetchAddNotifications: (nameNotifications) => {
      return dispatch(actions.fetchAddNotifications(nameNotifications));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheHeaderDropdownNotif);
