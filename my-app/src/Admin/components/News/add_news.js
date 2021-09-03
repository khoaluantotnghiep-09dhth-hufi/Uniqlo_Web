import React from 'react';
import {
    CForm,
    CLabel,
    CContainer,
    CInput,
    CCol,
    CFormText,
    CRow,
    CFormGroup,
    CButton,
    
} from '@coreui/react'

export default class addNews extends React.Component {
    render() {
        return (
            <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlInput1">Tên Tin Tức</CLabel>
              <CInput
                type="text"
                id="txtNameNews"
                name="txtNameNews"
                placeholder="Tên Tin Tức..."
                autoComplete="name"
              />
             
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="file-uploader">Hình Ảnh</CLabel>
              <CInput
                type="file"
                id="fileIMG"
                name="fileIMG"
                placeholder="Hình Ảnh..."
                autoComplete="img"
              />
              <img src="..." className="img-fluid" alt="..."></img>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlTextarea1">Nội Dung</CLabel>
              {/* <CInput 
                type="text"
                id="nf-password"
                name="nf-password"
               
                autoComplete="current-password"
                row = "3"
              /> */}
              <textarea className="form-control" id="exampleFormControlTextarea1"  placeholder="Nội Dung..." rows="5"></textarea>
             
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-password">Ngày Đăng</CLabel>
              <CInput
                type="date"
                id="date"
                name="date"
                placeholder="Ngày Đăng..."
                autoComplete="current-password"
              />
             
            </CFormGroup>
            <CFormGroup >
              <CButton color='danger' className="m-2" >Thêm</CButton>
             
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
        )
    }
}