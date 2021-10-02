import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faUpload,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import * as actionsProduct from "./../../../actions/productAdminActions";
import * as actionsProductInfo from "./../../../actions/product_infoActions";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import ConvertIMG from '../../utils/getBase64';
//Thư viện img 
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
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
            id_category: "",
            id_promotion: "",
            ImgPrivew: "",
            promotionArr: [],
            categoryArr: [],
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
        })
        var { products } = this.props;
        if (match.params.id_product) {
            const result = products.find(
                (o) => o.id === match.params.id_product
            );
            this.setState({
                txtName: result.name,
                txtPrice: result.price,
                txtDescription: result.description,
                txtImage: result.image,
                id_promotion: result.id_promotion,
                id_category: result.id_category,
                ImgPrivew: result.image,
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        var { match } = this.props;
        if (prevProps.category !== this.props.category && !match.params.id_product) {
            let arrCategory = this.props.category;
            this.setState({
                categoryArr: arrCategory,
                id_category: arrCategory && arrCategory.length > 0 ? arrCategory[0].id : ''
            })
        }
        if (prevProps.promotion !== this.props.promotion && !match.params.id_product) {
            let arrPromotion = this.props.promotion;
            this.setState({
                promotionArr: arrPromotion,
                id_promotion: arrPromotion && arrPromotion.length > 0 ? arrPromotion[0].id : ''
            })
        }
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.product) {
            var { products } = NextProps;
            if (match.params.id_product) {
                const result = products.find((o) => o.id === match.params.id_product);
                this.setState({
                    txtName: result.name,
                    txtPrice: result.price,
                    txtDescription: result.description,
                    txtImage: result.image,
                    id_promotion: result.id_promotion,
                    id_category: result.id_category,
                });
            }
        }
    }
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState
        })
    }
    onChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            ConvertIMG.getBase64(file).then(res => {
                let objectURL = URL.createObjectURL(file);
                this.setState({
                    ImgPrivew: objectURL,
                    txtImage: res
                })
            });
        }
    }
    openPreviewIMG = () => {
        this.setState({
            isOpen: true
        })
    }
    checkValidate = () => {
        let check = ['txtName', 'txtPrice', 'txtDescription', 'txtImage', 'id_category', 'id_promotion'];
        let isValid = true;
        if (!this.state[check[0]]) {
            isValid = false;
            toast.error("Vui lòng nhập tên sản phẩm");
        }
        if (!this.state[check[1]]) {
            isValid = false;
            toast.error("Vui lòng nhập giá bán sản phẩm");
        }
        if (!this.state[check[2]]) {
            isValid = false;
            toast.error("Vui lòng nhập mô tả sản phẩm");
        }
        if (!this.state[check[3]]) {
            isValid = false;
            toast.error("Vui lòng tải ảnh sản phẩm");
        }
        if (!this.state[check[4]]) {
            isValid = false;
            toast.error("Vui lòng chọn danh mục sản phẩm");
        }
        if (!this.state[check[5]]) {
            isValid = false;
            toast.error("Vui lòng chọn khuyến mãi áp dụng");
        }
        return isValid;
    }
    onSubmitForm = (event) => {
        let isValid = this.checkValidate();
        if (isValid === false) return;
        event.preventDefault();
        var { match } = this.props;
        var { history } = this.props;
        var { idItem, txtName, txtPrice, txtDescription, txtImage, id_promotion, id_category } = this.state;
        var product = {
            id: uniqid("product-"),
            name: txtName,
            price: txtPrice,
            description: txtDescription,
            image: txtImage,
            id_category: id_category,
            id_promotion: id_promotion,
        };
        var productUpdate = {
            idItem: match.params.id_product,
            name: txtName,
            price: txtPrice,
            description: txtDescription,
            image: txtImage,
            id_category: id_category,
            id_promotion: id_promotion,
        };

        if (match.params.id_product) {
            this.props.onUpdateItemProduct(productUpdate);
            history.goBack();
        } else {
            this.props.onAddItemProduct(product);
            history.goBack();

        }
    };
    render() {
        var { promotion } = this.props;
        var { category } = this.props;
        let { txtName, txtPrice, txtDescription, id_category, id_promotion, ImgPrivew } = this.state;
        return (
            <Container fluid>
                <Link to="/admin/manage/products">
                    <Button type="button" className="btn btn-primary" size="sm">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" size="lg" />
                        Trở về
                    </Button>
                </Link>
                <Row>
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
                                <Col sm="2">
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
                                            value={id_category}
                                            onChange={(e) => { this.onChange(e, 'id_category') }}
                                            labelKey={'Tên'}
                                            valueKey={'Mã'}
                                            isLoading={isLoadingExternally}

                                        >
                                            {category && category.length > 0 &&
                                                category.map((option, index) => (

                                                    <option value={option.id} key={index}>Mã: {option.id}, Tên: {option.name}</option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm="4">
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Khuyến Mãi</Form.Label>
                                        <Form.Select name="form-field-name"
                                            value={id_promotion}
                                            onChange={(e) => { this.onChange(e, 'id_promotion') }}
                                            labelKey={'Tên'}
                                            valueKey={'Mã'}
                                            isLoading={isLoadingExternally}
                                        >
                                            {promotion && promotion.length > 0 &&
                                                promotion.map((option, index) => (
                                                    <option value={option.id} key={index}>Mã: {option.id}, Tên: {option.name}</option>
                                                ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm="2" className="d-flex justify-content-center">
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
                                <Col sm="6" className="d-flex justify-content-center">
                                    <div style={{ backgroundImage: `url(${ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                                        onClick={() => this.openPreviewIMG()}
                                    ></div>
                                </Col>
                                <Col sm="12">
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
        products: state.products,
        category: state.category,
        promotion: state.promotion,
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
        onEditItemProduct: (id) => {
            return dispatch(actionsProduct.onEditProductResquest(id));
        },
        onUpdateItemProduct: (product) => {
            return dispatch(actionsProduct.onUpdateProductResquest(product));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(addProduct)