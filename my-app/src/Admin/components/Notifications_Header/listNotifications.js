import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../../actions/index";
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
import { faCheck,faPlus, faTimes, faTools } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const fields = [
  "STT",
  { key: "content", label: "Tin Nhắn" },
  { key: "time", label: "Thời Gian" },
  "Hành Động",
];

class ListColor extends React.Component {
  componentDidMount() {
    //   this.props.mapDispatchToProps();
    this.props.fetchNotifications();
  }
  onResetNotifications=(header_notifications) => {
    this.props.fetchResetNotifications(header_notifications);
  }
  render() {
    var { header_notifications } = this.props;
  
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
                        //  onClick={() => { this.onDeleteSize(item.id) }}
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
    fetchNotifications: () => {
      return dispatch(actions.fetchNotificationsResquest());
    },
    fetchResetNotifications:(nameNotifications)=>{
        return   dispatch(actions.fetchResetNotifications(nameNotifications));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListColor);
