import React from 'react';
import {


} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faUpload,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import * as actionsProduct from "./../../../actions/productActions";
import * as actionsProductInfo from "./../../../actions/product_infoActions";
import { connect } from "react-redux";
import uniqid from 'uniqid';
//Thư viện img 
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
let isLoadingExternally = false;
class addProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idItem: "",
            txtName: "",
            txtPrice: "",
            txtDescription: "",
            txtImage: "",
            txtQuantity: "",
            id_category: "",
            id_promotion: "",
            id_size: "",
            id_color: "",
            ImgPrivew: "",
            promotionArr: [],
            categoryArr: [],
            sizeArr: [],
            colorArr: [],
            isOpen: false,
        };
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemProduct(match.params.id_product);
        isLoadingExternally = true;

        this.setState({
            promotionArr: this.props.fetchPromotions(),
            categoryArr: this.props.fetchCategorys(),
            sizeArr: this.props.fetchSizes(),
            colorArr: this.props.fetchColors(),
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
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState
        }, () => {
            console.log(this.state);
        })


    }
    onChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];

        if (file) {
            let objectURL = URL.createObjectURL(file);
            this.setState({
                ImgPrivew: objectURL,
                txtImage: objectURL
            })

        }
    }
    openPreviewIMG = () => {
        this.setState({
            isOpen: true
        })
    }
    checkValidate = () => {
        let check = ['txtName', 'txtPrice', 'txtDescription', 'txtImage'];
        let isValid = true;
        for (let i = 0; i <= check.length; i++) {
            if (!this.state[check[0]]) {
                isValid = false;
                alert("Vui lòng nhập: " + check[i]);
                break;
            }
        }

        return isValid;
    }
    onSubmitForm = (event) => {
        let isValid = this.checkValidate();
        if (isValid === false) return;
        event.preventDefault();
        var { match } = this.props;
        var { history } = this.props;
        var { idItem, txtName, txtPrice, txtDescription, txtImage, txtQuantity, id_promotion, id_category, id_size, id_color } = this.state;
        var product = {
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
            id_product: product.id,
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
            history.goBack();
        } else {
            this.props.onAddItemProduct(product);
            this.props.onAddItemProductInfo(propductinfo);
            history.goBack();

        }
    };
    render() {
        var { promotion } = this.props;
        var { category } = this.props;
        var { size } = this.props;
        var { color } = this.props;

        let { txtName, txtPrice, txtDescription, id_category, id_promotion, txtQuantity } = this.state;
        return (
            <Container fluid>
                <Row>
                    <Link to="/admin/manage/products">
                        <Button type="button" className="btn btn-primary" size="sm">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                            Trở về
                        </Button>
                    </Link>
                    <Col sm="12">
                        <Form action="" method="post" onSubmit={() => this.onSubmitForm()}>
                            <Row sm="24">
                                <Col sm="4">
                                    <Form.Group className="row" >
                                        <Form.Label htmlFor="exampleFormControlInput1">Tên Sản Phẩm</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="txtName"
                                            name="txtName"
                                            placeholder="Tên sản phẩm..."
                                            value={txtName}
                                            onChange={(e) => { this.onChange(e, 'txtName') }}
                                            required
                                        />
                                        <Form.Control.Feedback
                                            type="invalid" >
                                            Vui lòng nhập tên cần thêm !
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col sm="4">
                                    <Form.Group >
                                        <Form.Label htmlFor="exampleFormControlTextarea1">Giá Bán</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="txtPrice"
                                            name="txtPrice"
                                            placeholder="Giá bán..."
                                            autoComplete="price"
                                            value={txtPrice}
                                            onChange={(e) => { this.onChange(e, 'txtPrice') }}
                                            required
                                        />
                                        <Form.Control.Feedback
                                            type="invalid" >
                                            Vui lòng nhập tên cần thêm !
                                        </Form.Control.Feedback>

                                    </Form.Group>
                                </Col>
                                <Col sm="2">
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Danh Mục</Form.Label>
                                        <Form.Select name="form-field-name"
                                            value={this.setState.id_category}
                                            onChange={(e) => { this.onChange(e, 'id_category') }}
                                            labelKey={'Tên'}
                                            valueKey={'Mã'}
                                            isLoading={isLoadingExternally}

                                        >
                                            <option value="category-1">Chọn</option>
                                            {category && category.length > 0 &&
                                                category.map((option, index) => (

                                                    <option value={option.id} key={index}>{option.name}</option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm="2">
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Khuyến Mãi</Form.Label>
                                        <Form.Select name="form-field-name"
                                            value={this.setState.id_promotion}
                                            onChange={(e) => { this.onChange(e, 'id_promotion') }}
                                            labelKey={'Tên'}
                                            valueKey={'Mã'}
                                            isLoading={isLoadingExternally}

                                        >
                                            <option value="0">Chọn</option>
                                            {promotion && promotion.length > 0 &&
                                                promotion.map((option, index) => (
                                                    <option value={option.id} key={index}>{option.name}</option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm="1">
                                    <Form.Group >
                                        <Form.Label className="border border-dark" style={{ backgroundColor: "#ffe6e6", padding: "10px", marginTop: "100px", cursor: "pointer" }} htmlFor="txtImage"><FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />Tải Ảnh</Form.Label>
                                        <Form.Control
                                            type="file"
                                            id="txtImage"
                                            name="txtImage"
                                            hidden
                                            onChange={(e) => { this.onChangeImage(e) }}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm="4">
                                   
                                    <div style={{ backgroundImage: `url(${this.state.ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                                        onClick={() => this.openPreviewIMG()}
                                    ></div>
                                </Col>
                                <Col sm="7">
                                    <Form.Group >
                                        <Form.Label htmlFor="exampleFormControlInput1">Mô Tả</Form.Label>
                                        <textarea
                                            className="form-control"
                                            id="txtDescription"
                                            name="txtDescription"
                                            value={txtDescription}
                                            placeholder="Mô tả..."
                                            onChange={(e) => { this.onChange(e, 'txtDescription') }}
                                            rows="8"
                                            required
                                        ></textarea>
                                        <Form.Control.Feedback
                                            type="invalid" >
                                            Vui lòng nhập tên cần thêm !
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                            </Row>
                        </Form>
                    </Col>
                    {
                        this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.ImgPrivew}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                    <Col sm="2">
                        <Form.Group className="mb-3" controlId="formBasicObject">
                            <Form.Label>Kích Cỡ</Form.Label>
                            <Form.Select name="form-field-name"
                                value={this.setState.id_size}
                                onChange={(e) => { this.onChange(e, 'id_size') }}
                                labelKey={'Tên'}
                                valueKey={'Mã'}
                                isLoading={isLoadingExternally}

                            >
                                <option value="size-L">Chọn</option>
                                {size && size.length > 0 &&
                                    size.map((option, index) => (
                                        <option value={option.id} key={index}>{option.name}</option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col sm="2">
                        <Form.Group className="mb-3" controlId="formBasicObject">
                            <Form.Label>Màu</Form.Label>
                            <Form.Select name="form-field-name"
                                value={this.setState.id_color}
                                onChange={(e) => { this.onChange(e, 'id_color') }}
                                labelKey={'Tên'}
                                valueKey={'Mã'}
                                isLoading={isLoadingExternally}
                            >
                                <option value="color-1">Chọn</option>
                                {color && color.length > 0 &&
                                    color.map((option, index) => (
                                        <option value={option.id} key={index}>{option.name}</option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        <Form.Group >
                            <Form.Label htmlFor="exampleFormControlTextarea1">Số Lượng</Form.Label>
                            <Form.Control
                                type="number"
                                id="txtQuantity"
                                name="txtQuantity"
                                placeholder="Số Lượng..."
                                value={txtQuantity}
                                onChange={(e) => { this.onChange(e, 'txtQuantity') }}
                                required
                            />
                            <Form.Control.Feedback
                                type="invalid" >
                                Vui lòng nhập tên cần thêm !
                            </Form.Control.Feedback>

                        </Form.Group>
                    </Col>
                    <Col sm="10">
                        <Form.Group className="d-flex justify-content-center">
                            <Button type="button" className="btn btn-danger"
                                onClick={this.onSubmitForm}
                            > <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg"
                                />Thêm</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
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
        onAddItemProductInfo: (productInfo) => {
            return dispatch(actionsProductInfo.onAddProductInfoResquest(productInfo));
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