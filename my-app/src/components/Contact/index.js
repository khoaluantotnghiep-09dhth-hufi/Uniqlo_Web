import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Contact.scss";
class index extends Component{
    render(){
      return(
        <Container>
          <Row>
            <Col>
              <div id="companyMain">
                <div className="titCompany clearfix">
                  <h3 className="tit">LIÊN HỆ VỚI CHÚNG TÔI</h3>
                </div>
                <br/>
                <div className="boxCompanyBasic txt">
                  <strong><p>THÔNG TIN LIÊN HỆ</p></strong>
                    Trao đổi cởi mở là một trong những giá trị cốt lõi của UNIQLO, vì thế đừng ngại ngần liên hệ với chúng tôi.<br/>
                    Nếu bạn có bất kỳ câu hỏi, thắc mắc, hoặc cần hỗ trợ thêm, vui lòng gửi email về địa chỉ<br/>
                    <a href="mailto:customerservices@uniqlo.vn">customerservices@uniqlo.vn</a><br/>
                    <p>Giờ Làm Việc: 8:00 – 17:00 (Thứ Hai – Thứ Sáu, không bao gồm ngày lễ)</p>
                    <strong><p>UNIQLO CHÍNH THỨC TRIỂN KHAI DỊCH VỤ ĐẶT HÀNG SỐ LƯỢNG LỚN</p></strong>
                    <img src="https://www.uniqlo.com/vn/img/img_company_customer02.jpg" alt="UNIQLO CHÍNH THỨC TRIỂN KHAI DỊCH VỤ ĐẶT HÀNG SỐ LƯỢNG LỚN"/><br/>
                    <strong>Giao hàng miễn phí và ưu đãi đặc biệt</strong> khi đặt hàng số lượng lớn (Vui lòng liên hệ chúng tôi để biết thêm chi tiết)<br/>
                    <br/>
                    <strong>Cách thức đặt hàng chỉ 2 bước đơn giản:</strong><br/>
                    * <strong>Bước 1:</strong> Lựa chọn sản phẩm phù hợp với nhu cầu của bạn/doanh nghiệp của bạn. Đơn hàng sẽ được ghi nhận là “đơn hàng số lượng lớn” khi có giá trị tối thiểu 10.000.000VND.<br/>
                    * <strong>Bước 2:</strong> Bạn hãy gửi email về địa chỉ <a href="mailto:customerservices@uniqlo.vn">customerservices@uniqlo.vn</a> với các nội dung:<br/>
                    - Thông tin sản phẩm (tên sản phẩm, số lượng, màu sắc và kích cỡ)<br/>
                    - Tên cửa hàng mà bạn có thể đến nhận hàng HOẶC yêu cầu giao hàng<br/>
                    - Ngày bạn có thể đến cửa hàng nhận sản phẩm HOẶC thời gian giao hàng mong muốn<br/>
                    UNIQLO sẽ hỗ trợ và tư vấn cho bạn trong vòng 3 ngày.
                    <br/><br/>
                    <strong>LƯU Ý:</strong><br/>
                    *Sản phẩm đã mua sẽ không hoàn trả dưới mọi hình thức. (Trừ trường hợp do lỗi sản xuất.)<br/>
                    *Giao hàng miễn phí được áp dụng với giá trị đơn hàng tối thiểu 10.000.000VND.<br/>
                    *Tình trạng số lượng sản phẩm sẽ phụ thuộc vào từng thời điểm.<br/>
                  <p></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
}

export default index;