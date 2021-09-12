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
export default class addObject extends React.Component {
    render() {
        return (
            <CContainer fluid>
      <CRow>
        <CCol sm="12">
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="exampleFormControlInput1">Tên Đối Tượng</CLabel>
              <CInput
                type="text"
                id="txtName"
                name="txtName"
                placeholder="Tên đối tượng..."
                autoComplete="name"
              />    
            </CFormGroup>
           
            <CFormGroup >
              <CButton color='danger' className="m-2" >  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg"/> Thêm</CButton>
             
            </CFormGroup>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
        )
    }
}