import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './Size.scss'
class index extends Component{
    render(){
      return(
        <Container>
          <Row>
            <Col>
            <div className="wrapper">
              {/* <a href="javascript:window.close();" title="Đóng"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_btn_close.jpg" width="63" height="35" alt="Close"/></a> */}
                <div className="containerSize">
                <h1 className="productSize"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h1.jpg" width="560" height="35" alt="Hướng dẫn chọn trang phục"/></h1>
                {/* <table width="100%" border="0" cellpadding="0" cellspacing="1">
                  <tbody><tr>
                    <th class="header01" rowspan="2">KÍCH CỠ</th>
                    <th class="header01" colspan="2">XS</th>
                    <th class="header01" colspan="2">S</th>
                    <th class="header01" colspan="2">M</th>
                  </tr>
                  <tr>
                    <th class="header01">inch</th>
                    <th class="header01">cm</th>
                    <th class="header01">inch</th>
                    <th class="header01">cm</th>
                    <th class="header01">inch</th>
                    <th class="header01">cm</th>
                  </tr>
                  <tr>
                    <th>CHIỀU DÀI PHÍA SAU CƠ THỂ</th>
                    <td nowrap="" class="tdclass01">26</td>
                    <td nowrap="" class="tdclass01">66</td>
                    <td nowrap="" class="tdclass01">26 7/9</td>
                    <td nowrap="" class="tdclass01">68</td>
                    <td nowrap="" class="tdclass01">28</td>
                    <td nowrap="" class="tdclass01">71</td>
                  </tr>
                  <tr>
                    <th>CHIỀU RỘNG VAI</th>
                    <td nowrap="" class="tdclass01">17 1/8</td>
                    <td nowrap="" class="tdclass01">43.5</td>
                    <td nowrap="" class="tdclass01">17 5/7</td>
                    <td nowrap="" class="tdclass01">45</td>
                    <td nowrap="" class="tdclass01">18 1/3</td>
                    <td nowrap="" class="tdclass01">46.5</td>
                  </tr>
                  <tr>
                    <th>CHIỀU RỘNG CƠ THỂ</th>
                    <td nowrap="" class="tdclass01">19 2/3</td>
                    <td nowrap="" class="tdclass01">50</td>
                    <td nowrap="" class="tdclass01">20 6/7</td>
                    <td nowrap="" class="tdclass01">53</td>
                    <td nowrap="" class="tdclass01">22</td>
                    <td nowrap="" class="tdclass01">56</td>
                  </tr>
                  <tr>
                    <th>CHIỀU DÀI TAY ÁO (MẶT BÊN)</th>
                    <td nowrap="" class="tdclass01">31 2/7</td>
                    <td nowrap="" class="tdclass01">79.5</td>
                    <td nowrap="" class="tdclass01">31 8/9</td>
                    <td nowrap="" class="tdclass01">81</td>
                    <td nowrap="" class="tdclass01">32 7/8</td>
                    <td nowrap="" class="tdclass01">83.5</td>
                  </tr>
                </tbody></table>
                <table width="100%" border="0" cellpadding="0" cellspacing="1">
                  <tbody><tr>
                    <th class="header01" rowspan="2">KÍCH CỠ</th>
                    <th class="header01" colspan="2">L</th>
                    <th class="header01" colspan="2">XL</th>
                    <th class="header01" colspan="2">XXL</th>
                  </tr>
                  <tr>
                    <th class="header01">inch</th>
                    <th class="header01">cm</th>
                    <th class="header01">inch</th>
                    <th class="header01">cm</th>
                    <th class="header01">inch</th>
                    <th class="header01">cm</th>
                  </tr>
                  <tr>
                    <th>CHIỀU DÀI PHÍA SAU CƠ THỂ</th>
                    <td nowrap="" class="tdclass01">29 1/7</td>
                    <td nowrap="" class="tdclass01">74</td>
                    <td nowrap="" class="tdclass01">30 1/3</td>
                    <td nowrap="" class="tdclass01">77</td>
                    <td nowrap="" class="tdclass01">31 1/9</td>
                    <td nowrap="" class="tdclass01">79</td>
                  </tr>
                  <tr>
                    <th>CHIỀU RỘNG VAI</th>
                    <td nowrap="" class="tdclass01">18 8/9</td>
                    <td nowrap="" class="tdclass01">48</td>
                    <td nowrap="" class="tdclass01">19 2/3</td>
                    <td nowrap="" class="tdclass01">50</td>
                    <td nowrap="" class="tdclass01">20 1/2</td>
                    <td nowrap="" class="tdclass01">52</td>
                  </tr>
                  <tr>
                    <th>CHIỀU RỘNG CƠ THỂ</th>
                    <td nowrap="" class="tdclass01">23 2/9</td>
                    <td nowrap="" class="tdclass01">59</td>
                    <td nowrap="" class="tdclass01">24 4/5</td>
                    <td nowrap="" class="tdclass01">63</td>
                    <td nowrap="" class="tdclass01">26 3/8</td>
                    <td nowrap="" class="tdclass01">67</td>
                  </tr>
                  <tr>
                    <th>CHIỀU DÀI TAY ÁO (MẶT BÊN)</th>
                    <td nowrap="" class="tdclass01">33 6/7</td>
                    <td nowrap="" class="tdclass01">86</td>
                    <td nowrap="" class="tdclass01">34 5/6</td>
                    <td nowrap="" class="tdclass01">88.5</td>
                    <td nowrap="" class="tdclass01">35 1/4</td>
                    <td nowrap="" class="tdclass01">89.5</td>
                  </tr>
                </tbody></table>
                <table width="100%" border="0" cellpadding="0" cellspacing="1">
                  <tbody><tr>
                    <th class="header01" rowspan="2">KÍCH CỠ</th>
                    <th class="header01" colspan="2">3XL</th>
                    <th class="header01" colspan="2">4XL</th>
                  </tr>
                  <tr>
                    <th class="header01">inch</th>
                    <th class="header01">cm</th>
                    <th class="header01">inch</th>
                    <th class="header01">cm</th>
                  </tr>
                  <tr>
                    <th>CHIỀU DÀI PHÍA SAU CƠ THỂ</th>
                    <td nowrap="" class="tdclass01">31 1/9</td>
                    <td nowrap="" class="tdclass01">79</td>
                    <td nowrap="" class="tdclass01">31 2/7</td>
                    <td nowrap="" class="tdclass01">79.5</td>
                  </tr>
                  <tr>
                    <th>CHIỀU RỘNG VAI</th>
                    <td nowrap="" class="tdclass01">21 1/4</td>
                    <td nowrap="" class="tdclass01">54</td>
                    <td nowrap="" class="tdclass01">22</td>
                    <td nowrap="" class="tdclass01">56</td>
                  </tr>
                  <tr>
                    <th>CHIỀU RỘNG CƠ THỂ</th>
                    <td nowrap="" class="tdclass01">28</td>
                    <td nowrap="" class="tdclass01">71</td>
                    <td nowrap="" class="tdclass01">29 1/2</td>
                    <td nowrap="" class="tdclass01">75</td>
                  </tr>
                  <tr>
                    <th>CHIỀU DÀI TAY ÁO (MẶT BÊN)</th>
                    <td nowrap="" class="tdclass01">35 5/8</td>
                    <td nowrap="" class="tdclass01">90.5</td>
                    <td nowrap="" class="tdclass01">36</td>
                    <td nowrap="" class="tdclass01">91.5</td>
                  </tr>
                </tbody></table>
                <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_attention_noncm.jpg" alt=""/> */}
                
                  <a href="#howto01"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_btn_h201_01.jpg" width="136" height="50" alt="Cách đo kích thước trang phục"/></a>
                  <a href="#howto02"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_btn_h201_02.jpg" width="136" height="50" alt="Cách đo kích thước cơ thể"/></a>
                  <a href="#howto04"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_btn_h201_03.jpg" width="136" height="50" alt="Hướng dẫn cách đọc mác quần áo"/></a>
                  <a href="#howto03"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_btn_h201_04.jpg" width="149" height="50" alt="Cách đo kích thước vùng thân dưới"/></a>
               
                <h2><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h2_01.jpg" alt="Kích" thước="" cơ="" thể=""/></h2>
                <div className="bodySize"><p><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_graph_bodysize_uq_m_20fw.jpg"/></p></div><h3><a id="howto01" name="howto01"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h3_01.jpg" alt="Cách đo kích thước trang phục"/></a></h3>
                <ul className="productsList">
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h4_01.jpg" alt="Các loại áo"/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_01.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_02.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_03.jpg" alt=""/>
                  <a id="howto03" name="howto03"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h4_02.jpg" alt="Quần/ Váy"/></a>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_04.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_05.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_06.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_07.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h4_04.jpg" alt="Inner"/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_bra.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h4_03.jpg" alt="Phụ kiện"/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_08.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_09.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_10.jpg" alt=""/>
                  <img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_productsite_11.jpg" alt=""/>
                </ul>
                <h3><a id="howto02" name="howto02"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h3_02.jpg" alt="Cách đo kích thước cơ thể"/></a></h3>
                <div className="whiteFrame" id="howto01con">
                <div className="imgFloat">
                  <p><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_nudesize_01.jpg" alt=""/></p>
                  <p><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_nudesize_02.jpg" alt=""/></p>
                  <p><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_nudesize_03.jpg" alt=""/></p>
                </div>
                </div>

                <h3><a id="howto04" name="howto04"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_ttl_h3_04.jpg" width="560" height="35" alt="Hướng dẫn cách đọc mác quần áo"/></a></h3>
                <div className="whiteFrame" id="howto03con">
                <div className="imgFloat">
                <p className="left"><img src="https://image.uniqlo.com/UQ/ST3/vn/imagesother/sizechart/vn_img_uq_tag.jpg" alt=""/></p>
                </div>
                </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
}

export default index;