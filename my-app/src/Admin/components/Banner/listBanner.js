import {
  CButton, CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from "@coreui/react";
import {
  faPlus,
  faTimes,
  faTools
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "./../../../actions/index";

const fields = [
  "STT",
  { key: "image", label: "Hình Ảnh" },
  { key: "is_active", label: "Trạng Thái" },
  "Hành Động",
];

class ListBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.props.fetchBanners();
  }
  onDeleteBanner = (item) => {
    if (window.confirm("Bạn có chắc muốn xóa không ?")) {
      
      this.props.onDeleteItemBanner(item);
    }
  };
  getBadge = (status) => {
    switch (status) {
      case "1":
        return "danger";
      case "0":
        return "primary";
      default:
        return "success";
    }
  };
  render() {
    var { data } = this.state;
    var { banner } = this.props;

    var dataBanner = banner.map((item, index) => {
      return { ...item, index };
    });
    return (
      <>
        <Link to="/admin/manage/banner/add">
          <CButton type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />
            Thêm Mới
          </CButton>
        </Link>
        <CRow>
          <CCol xs="12" lg="24">
            <CCard>
              <CCardHeader>Danh Sách Banner</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataBanner}
                  fields={fields}
                  itemsPerPage={5}
                  sorter
                  columnFilter
                  itemsPerPageSelect
                  pagination
                  scopedSlots={{
                    "Hành Động": (item) => (
                      <td>
                        <Link to={`/admin/manage/banner/${item.id}/edit`}>
                          <CButton type="button" className="btn btn-primary">
                            <FontAwesomeIcon
                              icon={faTools}
                              className="mr-2"
                              size="lg"
                            />
                            Sửa
                          </CButton>
                        </Link>

                        <CButton
                          type="button"
                          className="btn btn-warning"
                          onClick={() => {
                            this.onDeleteBanner(item.id);
                          }}
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
                    is_active: (item) => (
                      <td>
                        <Alert variant={this.getBadge(item.is_active)}>
                          {item.is_active === 0
                            ? "Đang Hoạt Động "
                            : "Tạm Ngưng"}
                        </Alert>
                      </td>
                    ),
                    image: (item, index) => (
                      <td>
                        <Image
                          src={item.image}
                          style={{ width: "200px", height: "200px" }}
                        />
                      </td>
                    ),
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
    banner: state.banner,
  };
};
var mapDispatchToProps = (dispatch, props) => {
  return {
    fetchBanners: () => {
      return dispatch(actions.fetchBannersResquest());
    },
    onDeleteItemBanner: (id) => {
      return dispatch(actions.onDeleteBannerResquest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListBanner);
