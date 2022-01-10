
import React from 'react'
import {
    CCol,
    CContainer,
    CRow
} from '@coreui/react'

const index = () => {
    return (

        <CContainer>
            <CRow className="justify-content-center">
                <CCol md="6">
                    <div className="clearfix">
                        <h1 className="float-left display-3 mr-4">404</h1>
                        <h4 className="pt-3">Ô! Có gì đó sai.</h4>
                        <p className="text-muted float-left">Trang bạn tìm hiện không có, vui lòng thử lại.</p>
                    </div>
                </CCol>
            </CRow>
        </CContainer>

    )
}
export default index;