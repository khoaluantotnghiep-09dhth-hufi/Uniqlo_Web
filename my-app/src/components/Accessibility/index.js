import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class index extends Component{
    render(){
      return(
        <Container>
          <Row>
            <Col>
            <div id="companyMain">
              <div className="titCompany clearfix">
                <h3 className="tit">KHẢ NĂNG TRUY CẬP</h3>
              </div>
              <div className="boxCompanyBasic txt">
                <p>Bằng việc đọc và tiếp tục sử dụng trang web, bạn đồng ý với các điều kiện sử dụng sau đây.</p>
                <p>Trang web UNIQLO hiện đang hỗ trợ các phiên bản Chrome, Firefox, Safari và Internet Explorer mới nhất và an toàn nhất để xem trang web này. Nếu bạn gặp sự cố với trang web, vui lòng đảm bảo cập nhật trình duyệt của bạn lên phiên bản mới nhất hiện có.</p>
              </div>
              <h2 className="tittype02"><p className="tit">Hệ điều hành và trình duyệt</p><a href="#top"><img src="https://freepngimg.com/thumb/web_design/24723-7-up-arrow-clipart.png" alt="" width="40rem" height="40rem" className="pagetop"/></a></h2><br/>
              <div className="boxCompanyBasic">
                <strong>Windows</strong>
                <p>Hệ điều hành: Windows Vista / Windows 7 / Windows 8 /<br/>Trình duyệt: Internet Explorer 8 trở nên / Mozilla Firefox 3.6 trở nên / Google Chrome 12 trở nên</p>
                <strong>Macintosh</strong>
                <p>Hệ điều hành: OSX 10.5.8 trở nên<br/>Trình duyệt: Safari 4.0 trở nên</p>
                <p>Ngoài HTML, UNIQLO.com có ​​nội dung sử dụng hoạt ảnh và phim. Nếu bạn gặp khó khăn khi truy cập nội dung này, chúng tôi khuyên bạn nên nâng cấp lên phiên bản Adobe® Flash® Player mới nhất</p>
                <div className="boxPdf">
                  <p className="image"><a href="http://www.adobe.com/go/getflashplayer" target="_blank"><p>Adobe® Flash® Player</p></a></p>
                  <p className="txt">Tải xuống miễn phí Adobe® Flash® Player mới nhất có sẵn tại <a href="http://www.adobe.com/go/getflashplayer" target="_blank">đây</a>.</p>
                </div>
              </div>
              <h2 className="tittype02"><p className="tit">JavaScript</p><a href="#top"><img src="https://freepngimg.com/thumb/web_design/24723-7-up-arrow-clipart.png" alt="" width="40rem" height="40rem" className="pagetop"/></a></h2><br/>
              <div className="boxCompanyBasic">
                <p>Vui lòng sử dụng trình duyệt hỗ trợ JavaScript. Bạn có thể mất một số chức năng trang web bằng cách vô hiệu hóa JavaScript.</p>
              </div>
              <h2 className="tittype02"><p className="tit">Cookies</p><a href="#top"><img src="https://freepngimg.com/thumb/web_design/24723-7-up-arrow-clipart.png" alt="" width="40rem" height="40rem" className="pagetop"/></a></h2><br/>
              <div className="boxCompanyBasic">
                <p>Trang web này có thể thiết lập một "cookie" trong tệp trình duyệt của bạn. Bản thân cookie không chứa thông tin cá nhân, mặc dù sẽ cho phép chúng tôi liên kết việc bạn sử dụng trang web này với thông tin mà bạn đã cung cấp cụ thể và có chủ ý. Nhưng thông tin cá nhân duy nhất mà cookie có thể chứa là thông tin bạn tự cung cấp. Một cookie không thể đọc dữ liệu từ đĩa cứng của bạn hoặc đọc các tệp cookie được tạo bởi các trang web khác. Bạn có thể định cấu hình trình duyệt web của mình để từ chối cookie, xóa cookie hoặc được thông báo nếu cookie được cài đặt.</p>
              </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
}

export default index;