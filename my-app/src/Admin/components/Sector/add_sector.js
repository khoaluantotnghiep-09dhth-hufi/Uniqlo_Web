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
export default class addSector extends React.Component {
    render() {
        return (
            <CContainer fluid>
                <CRow>
                    <CCol sm="12">
                        <CForm action="" method="post">
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlInput1">Tên Loại Sản Phẩm</CLabel>
                                <CInput
                                    type="text"
                                    id="txtName"
                                    name="txtName"
                                    placeholder="Tên loại sản phẩm..."
                                    autoComplete="name"
                                />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlTextarea1">Đối Tượng</CLabel>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Chọn Đối Tượng</option>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                    <option value="3">Trẻ Em</option>
                                    <option value="3">Trẻ Sơ Sinh</option>
                                </select>

                            </CFormGroup>
                            <CFormGroup >
                                <CButton color='danger' className="m-2" >  <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" /> Thêm</CButton>

                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CRow>
            </CContainer>
        )
    }
}