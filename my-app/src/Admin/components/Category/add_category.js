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
export default class addCategory extends React.Component {
    render() {
        return (
            <CContainer fluid>
                <CRow>
                    <CCol sm="12">
                        <CForm action="" method="post">
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlInput1">Tên Danh Mục</CLabel>
                                <CInput
                                    type="text"
                                    id="txtName"
                                    name="txtName"
                                    placeholder="Tên loại sản phẩm..."
                                    autoComplete="name"
                                />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlTextarea1">Loại Sản Phẩm</CLabel>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Chọn Loại Sản Phẩm</option>
                                    <option value="1">Bộ Sưu Tập</option>
                                    <option value="2">Áo Khoác</option>
                                    <option value="3">Mùa Đông</option>
                                    <option value="3">Mùa Thu</option>
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