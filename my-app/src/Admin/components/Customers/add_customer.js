import React from 'react';
import {
    CForm,
    CLabel,
    CContainer,
    CInput,
    CCol,
  
    CRow,
    CFormGroup,
    CButton,
    
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  
} from "@fortawesome/free-solid-svg-icons";
export default class addCustomer extends React.Component {
    render() {
        return (
            <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlInput1">Tên Khách Hàng</CLabel>
              <CInput
                type="text"
                id="txtNamet"
                name="txtName"
                placeholder="Tên khách hàng..."
                autoComplete="name"
              />
             
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlInput1">Địa Chỉ</CLabel>
              <CInput
                type="text"
                id="txtAddress"
                name="txtAddress"
                placeholder="Địa chỉ..."
                autoComplete="address"
              />
             
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlTextarea1">Số Điện Thoại</CLabel>
              <CInput
                type="text"
                id="txtPhone"
                name="txtPhone"
                placeholder="Số điện thoại..."
                autoComplete="phone"
              />
             
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="file-uploader">Hình Ảnh</CLabel>
              <CInput
                type="file"
                id="fileIMG"
                name="fileIMG"
                placeholder="Hình ảnh..."
                autoComplete="img"
              />
              <img src="..." className="img-fluid" alt="..."></img>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlTextarea1">Email</CLabel>
              <CInput
                type="text"
                id="txtEmail"
                name="txtEmail"
                placeholder="Email..."
                autoComplete="email"
              />
             
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlTextarea1">Mật Khẩu</CLabel>
              <CInput
                type="password"
                id="txtPassword"
                name="txtPassword"
                placeholder="Mật khẩu..."
                autoComplete="password"
              />
             
            </CFormGroup>
            <CFormGroup >
              <CButton color='danger' className="m-2" > <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg"/>Thêm</CButton>
             
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
        )
    }
}