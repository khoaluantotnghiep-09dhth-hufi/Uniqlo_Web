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

export default class addNews extends React.Component {

    render() {
        return (
            <CContainer fluid>
                <CRow>
                    <CCol sm="12">
                        <CForm action="" method="post">
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlInput1">Tên Nhân Viên</CLabel>
                                <CInput
                                    type="text"
                                    id="txtNameStaff"
                                    name="txtNameStaff"
                                    placeholder="Tên nhân viên..."
                                    autoComplete="name"
                                />

                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlInput1">Email</CLabel>
                                <CInput
                                    type="text"
                                    id="txtEmail"
                                    name="txtEmail"
                                    placeholder="Email..."
                                    autoComplete="email"
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
                                <CLabel htmlFor="exampleFormControlTextarea1">Địa Chỉ</CLabel>
                                <CInput
                                    type="text"
                                    id="txtAddress"
                                    name="txtAddress"
                                    placeholder="Địa chỉ..."
                                    autoComplete="address"

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

                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlTextarea1">Chức Vụ</CLabel>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Chọn Chức Vụ</option>
                                    <option value="1">Nhân Viên</option>
                                    <option value="2">Quản Lý</option>
                                </select>

                            </CFormGroup>

                            <CFormGroup >
                                <CButton color='danger' className="m-2" > <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm</CButton>

                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CRow>
            </CContainer>
        )
    }
}