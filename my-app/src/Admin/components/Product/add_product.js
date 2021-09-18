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
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import * as actionsProduct from "./../../../actions/productActions";
import { connect } from "react-redux";
import uniqid from 'uniqid';
let isLoadingExternally = false;
class addProduct extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            idItem: "",
            txtName: "",
            txtPrice: "",
            txtDescription: "",
            txtImage: "",
            txtQuantity: "",
            id_promotion: [],
            id_category: [],
            id_size: [],
            id_color: [],
        });
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemProduct(match.params.id_product);
        isLoadingExternally = true;

        this.setState({
            id_promotion: this.props.fetchPromotions(),
            id_category: this.props.fetchCategorys(),
            id_size: this.props.fetchSizes(),
            id_color: this.props.fetchColors(),
        })
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.product) {
            var { product } = NextProps;
            if (match.params.id_product) {
                const result = product.find(
                    (o) => o.id === match.params.id_product
                );
                this.setState({
                    idItem: result.id,
                    txtName: result.name,
                    txtPrice: result.price,
                    txtDescription: result.description,
                    txtImage: result.image,
                    txtQuantity: result.quantity,
                    id_promotion: result.id_promotion.id,
                    id_category: result.id_category.id,
                    id_size: result.id_size.id,
                    id_color: result.id_color.id,
                });
            }
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        });
    };
    onSubmitForm = (event) => {
        var { match } = this.props;

        event.preventDefault();
        var { history } = this.props;
        var { idItem, txtName, txtPrice, txtDescription, txtImage, txtQuantity, id_promotion, id_category, id_size, id_color } = this.state;

        var propduct = {
            id: uniqid("product-"),
            nameProduct: txtName,
            price: txtPrice,
            description: txtDescription,
            image: txtImage,
            id_category: id_category,
            id_promotion: id_promotion,

        };
        var propductinfo = {
            id: uniqid("product-info-"),
            id_product: idItem, // chưa xác định rõ, chưa có trigger. Để tạm ở đây
            id_size: id_size,
            id_color: id_color,
            quantity: txtQuantity

        };
        var productUpdate = {
            id: match.params.id_category,
            nameCategory: txtName,
            // id_sector: id_sector,
        };

        if (idItem) {
            this.props.onUpdateItemCategory(productUpdate);
            alert('Sửa thành công');
            history.goBack();
        } else {
            this.props.onAddItemProduct(propduct);
            this.props.onAddItemProductInfo();
            alert('Thêm thành công');
            history.goBack();
        }
    };
    render() {
        var { promotion } = this.props;
        var { category } = this.props;
        var { size } = this.props;
        var { color } = this.props;
        return (
            <CContainer fluid>
                <CRow>
                    <CCol sm="12">
                        <CForm action="" method="post">
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlInput1">Tên Sản Phẩm</CLabel>
                                <CInput
                                    type="text"
                                    id="txtName"
                                    name="txtName"
                                    placeholder="Tên sản phẩm..."
                                    autoComplete="name"
                                />

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
                                <CLabel htmlFor="file-uploader">Hình Ảnh</CLabel>
                                <CInput
                                    type="file"
                                    id="txtImage"
                                    name="txtImage"
                                    placeholder="Hình Ảnh..."
                                />
                                <img src="..." className="img-fluid" alt="..."></img>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlTextarea1">Số Lượng</CLabel>
                                <CInput
                                    type="number"
                                    id="txtQuantity"
                                    name="txtQuantity"
                                    placeholder="Số lượng..."
                                    autoComplete="price"
                                />


                            </CFormGroup>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Khuyến Mãi</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_promotion}
                                    onChange={this.onChange}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_promotion}
                                >
                                    {promotion.map((option) => (
                                        <option value={option.id}>{option.name}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Danh Mục</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_category}
                                    onChange={this.onChange}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_category}
                                >
                                    {category.map((option) => (
                                        <option value={option.id}>{option.name}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Màu</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_color}
                                    onChange={this.onChange}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_color}
                                >
                                    {color.map((option) => (
                                        <option value={option.id}>{option.name}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Kích Cỡ</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_size}
                                    onChange={this.onChange}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_size}
                                >
                                    {size.map((option) => (
                                        <option value={option.id}>{option.name}</option>

                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <CFormGroup>
                                <CLabel htmlFor="exampleFormControlInput1">Mô Tả</CLabel>
                                <textarea
                                    className="form-control"
                                    id="txtDescription"
                                    name="txtDescription"
                                    placeholder="Mô tả..."
                                    rows="5"></textarea>

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
var mapStateToProps = (state) => {
    return {
        category: state.category,
        promotion: state.promotion,
        size: state.size,
        color: state.color,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemProduct: (product) => {
            return dispatch(actionsProduct.onAddProductResquest(product));
        },
        fetchCategorys: () => {
            return dispatch(actions.fetchCategoryResquest());
        },
        fetchPromotions: () => {
            return dispatch(actions.fetchPromotionsResquest());
        },
        fetchSizes: () => {
            return dispatch(actions.fetchSizeResquest());
        },
        fetchColors: () => {
            return dispatch(actions.fetchColorResquest());
        },
        onEditItemProduct: (id) => {
            return dispatch(actionsProduct.onEditProductResquest(id));
        },
        onUpdateItemProduct: (product) => {
            return dispatch(actionsProduct.onUpdateProductResquest(product));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(addProduct)