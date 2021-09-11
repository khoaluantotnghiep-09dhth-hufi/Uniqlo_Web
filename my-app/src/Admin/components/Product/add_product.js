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

export default class addProduct extends React.Component {

    render() {
        return (
            <CContainer fluid>
                <CRow>
                    <CCol sm="12">
                        <CForm action="" method="post">
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlInput1">Tên Sản Phẩm</CLabel>
                                <CInput
                                    type="text"
                                    id="txtNameProduct"
                                    name="txtNameProduct"
                                    placeholder="Tên sản phẩm..."
                                    autoComplete="name"
                                />

                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlInput1">Mô Tả</CLabel>
                                <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Mô tả..." rows="5"></textarea>

                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlTextarea1">Giá Bán</CLabel>
                                <CInput
                                    type="number"
                                    id="txtPrice"
                                    name="txtPrice"
                                    placeholder="Giá bán..."
                                    autoComplete="price"

                                />


                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlTextarea1">Thích</CLabel>
                                <CInput
                                    type="number"
                                    id="like"
                                    name="like"
                                    placeholder="Thích..."
                                    autoComplete="like"
                                    value="0"
                                    enabled="false"
                                />


                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlTextarea1">Không Thích</CLabel>
                                <CInput
                                    type="number"
                                    id="dislike"
                                    name="dislike"
                                    placeholder="Không thích..."
                                    autoComplete="dislike"
                                    value="0"
                                    enabled="false"
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
                                <CLabel htmlFor="exampleFormControlTextarea1">Danh Mục</CLabel>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Chọn Danh Mục</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlTextarea1">Khuyến Mãi</CLabel>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Chọn Khuyến Mãi Áp Dụng</option>
                                    <option value="1">Khuyến Mãi</option>
                                    <option value="2">Không</option>
                                    
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