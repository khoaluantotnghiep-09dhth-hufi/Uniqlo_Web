import {
  CButton, CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from "@coreui/react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
const fields = [
  "STT",
  { key: "content", label: "Tin Nhắn" },
  { key: "time", label: "Thời Gian" },
  "Hành Động",
];

class ListColor extends React.Component {
  componentDidMount() {
  
    this.props.fetchNotifications();
  }
  onResetNotifications=(header_notifications) => {
    this.props.fetchResetNotifications(header_notifications);
  }
  onDeleteNotification=(id)=>{

if (window.confirm("Bạn có chắc muốn xóa không ?")) {
  this.props.fetchDeleteNotifications(id);
}
  }
  render() {
    var { header_notifications } = this.props;
  console.log(header_notifications)
    var dataHeader_notifications = header_notifications
      .reverse()
      .map((item, index) => {
        return { ...item, index };
      });
    // var dataHeader_notifications=null
    return (
      <>
       <CButton type="button" className="btn btn-primary"
        onClick={() => {this.onResetNotifications(header_notifications)}}
       >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="mr-2"
                              size="lg"
                             
                            />
                           Đã Xem Tất Cả
                          </CButton>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Thông Báo</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataHeader_notifications}
                  fields={fields}
                  itemsPerPage={5}
                  pagination
                  hover
                  sorter
                  scopedSlots={{
                    time: (item) => (
                      <td>
                        <Moment format="DD/MM/YYYY hh:mm:ss">{item.time}</Moment>
                      </td>
                    ),
                    "Hành Động": (item) => (
                      <td>
                        <CButton type="button" className="btn btn-warning"
                         onClick={() => { this.onDeleteNotification(item.id) }}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="mr-2"
                            size="lg"
                          />
                          Xóa
                        </CButton>
                      </td>
                    ),
                    STT: (item, index) => <td>{index + 1}</td>,
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
    header_notifications: state.header_notifications,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchDeleteNotifications: (id) => {
      return dispatch(actions.onDeleteNotificationCancelResquest(id));
    },
    fetchResetNotifications:(nameNotifications)=>{
        return   dispatch(actions.onResetNotificationCancelResquest(nameNotifications));
    },
    fetchNotifications:()=>{
      return   dispatch(actions.fetchNotificationsResquest());
  },
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListColor);
