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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  
} from "@fortawesome/free-solid-svg-icons";
export default class addDiscount extends React.Component {
    render() {
        return (
            <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlInput1">Tên Khuyến Mãi</CLabel>
              <CInput
                type="text"
                id="txtNameDiscount"
                name="txtNameDiscount"
                placeholder="Tên Khuyến Mãi..."
                autoComplete="name"
              />
             
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlInput1">Mã Khuyến Mãi</CLabel>
              <CInput
                type="text"
                id="txtIDDiscount"
                name="txtIDDiscount"
                placeholder="Mã Khuyến Mãi..."
                autoComplete="name"
              />
             
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlTextarea1">Nội Dung Khuyến Mãi</CLabel>
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
              <CLabel htmlFor="nf-password">Hạn Sử Dụng</CLabel>
              <CInput
                type="date"
                id="date"
                name="date"
                placeholder="Hạn Sử Dụng..."
                autoComplete="current-password"
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