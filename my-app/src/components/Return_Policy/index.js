import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Return_Policy.scss";
class index extends Component{
    render(){
      return(
        <Container>
          <Row>
            <Col>
              <div id="companyMain">
                <div className="titCompany clearfix">
                    <h3 className="tit">CHÍNH SÁCH ĐỔI TRẢ</h3>
                </div>
                <h2 className="tittype02"><img src="https://www.uniqlo.com/vn/img/200318_txt_company_returnpolicy.gif" alt="CHÍNH SÁCH ĐỔI TRẢ SẢN PHẨM (EXCHANGE &amp; RETURN POLICY)" className="tit"/><a href="#top"><img src="https://www.uniqlo.com/vn/img/btn_pagetop02.gif" alt="" width="21" height="21" className="pagetop"/></a></h2><br/>
                <div className="boxCompanyBasic txt">
                  <ol>
                    <li><strong>Sản phẩm không có lỗi do sản xuất chỉ có thể được đổi nếu:</strong>
                    <p><strong>Product without manufacturing defects can only be exchanged if:</strong></p>
                    <ul>
                        <li>Đổi trong vòng 30 ngày kể từ ngày mua ghi trên biên lai mua hàng/exchange within 30 days from the date of purchase as stated in the receipt;</li>
                        <li>Có đủ bản gốc biên lai mua hàng, và sản phẩm chưa qua sử dụng với đầy đủ nhãn giá, nhãn sản phẩm và nhãn khác (nếu có)/the product is new, original, with attached price tag, product label and sticker (if any) and accompanied with original receipt;</li>
                        <li>Chưa qua dịch vụ sửa đồ/without alteration;</li>
                        <li>Không phải là sản phẩm lỗi được bán với giá giảm đặc biệt/it is not the product sold at the discount promotion program due to existing defects;</li>
                        <li>Đã được mua tại các cửa hàng của UNIQLO Việt Nam /purchased from UNIQLO stores in Viet Nam;</li>
                        <li>Những sản phẩm đóng gói chưa mở bao bì như: nội y, quần lót, tất (vớ) và những sản phẩm khác/ it is not either lingerie, underwear, socks, or miscellaneous items which are unpackaged;</li>
                        <li>Sản phẩm còn có giá trị bán ra thị trường (không bị làm bẩn, còn mới, không bị rách, hoặc bị giặt ủi)/ it is not in the unsellable condition (dirty, worn, used, scratched, altered, and washed).</li>
                    </ul>
                    </li>                  
                    <li><strong>Hoàn tiền:</strong> Sản phẩm chỉ được hoàn tiền trong trường hợp do lỗi từ phía nhà sản xuất.
                      <p><strong>Refund:</strong> Product without manufacturing defects cannot be refunded, returned.</p>
                    </li>
                    <li><strong>Địa điểm:</strong> Sản phẩm được đổi tại các cửa hàng UNIQLO Việt Nam. Không nhất thiết phải là cửa hàng đã mua sản phẩm. Không chấp nhận đổi sản phẩm qua  các dịch vụ vận chuyển.
                      <p><strong>Location:</strong> Exchange only at the UNIQLO store in Viet Nam. No need to be the store the product was purchased. Courier delivery for exchange is not accepted.</p>
                    </li>
                    <li><strong>Sản phẩm được đổi:</strong> Chỉ chấp nhận việc đổi sản phẩm lấy sản phẩm khác có cùng giá hoặc giá cao hơn giá mua ban đầu (nếu giá cao hơn thì khách hàng phải trả thêm phần chênh lệch).
                      <p><strong>Exchange item:</strong> Only accept exchange items that have the same or higher price (subject to payment of difference) than the initial purchase price.</p>
                    </li>
                    <strong>Nếu sản phẩm có lỗi do sản xuất/If Product is found with manufacturing defects:</strong>
                    <p>Sản phẩm có thể được đổi hoặc trả trong vòng 06 (sáu) tháng kể từ ngày mua ghi tại biên lai mua hàng. Việc đổi, trả trong trường hợp này chỉ áp dụng nếu có bản gốc biên nhận mua hàng, và sản phẩm phải mới như ban đầu, với đầy đủ nhãn ghi giá, nhãn sản phẩm và nhãn khác. Chi phí gói quà và chi phí khác ngoài giá thành của sản phẩm sẽ không được hoàn tiền.</p>
                    <p>It can be exchanged or returned for a refund within 6 months from the date stated in the receipt. The exchange, return for a refund in this situation could only be applicable if the original receipt is provided. Packaging and further costs other than the price of merchandise shall not be refunded.</p>
                    <p>UNIQLO Việt Nam có quyền đưa ra quyết định sau cùng về việc đổi, trả và điều chỉnh Chính sách này tại bất cứ thời điểm nào mà không cần ban hành thông báo.</p>
                    <p>UNIQLO Viet Nam reserves the right to make a final decision and to change this Policy anytime without notice.</p>
                  </ol>           
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
}

export default index;