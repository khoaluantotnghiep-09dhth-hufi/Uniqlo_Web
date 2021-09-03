import React from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

export default class AddAccountAdmin extends React.Component {
    render() {
        return (
            // <div className="c-app c-default-layout flex-row align-items-center" >
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol xs="12" lg="24">
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm>
                                        <h1>Thêm Tài Khoản Mới</h1>
                                        {/* <p className="text-muted">Create your account</p> */}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-user" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="text" placeholder="Tên người dùng" autoComplete="username" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>@</CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="text" placeholder="Tên đăng nhập" autoComplete="email" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" placeholder="Mật khẩu" autoComplete="new-password" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" placeholder="Nhập lại mật khẩu" autoComplete="new-password" />
                                        </CInputGroup>
                                        <CButton color="success" block>Thêm Tài Khoản</CButton>
                                    </CForm>
                                </CCardBody>
                                <CCardFooter className="p-4">
                                    {/* <CRow>
                                        <CCol xs="12" sm="6">
                                            <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                                        </CCol>
                                        <CCol xs="12" sm="6">
                                            <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                                        </CCol>
                                    </CRow> */}
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            // </div>
        )
    }
}


