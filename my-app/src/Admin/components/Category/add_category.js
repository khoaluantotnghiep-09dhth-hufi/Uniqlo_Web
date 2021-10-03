import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faArrowLeft,
    faUpload
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
import { toast } from 'react-toastify';
import Select from 'react-select';
import ConvertIMG from '../../utils/getBase64';
//Thư viện img 
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
let isLoadingExternally = false;
class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idItem: "",
            txtName: "",
            id_sector: "",
            ImgPrivew: "",
            txtImage: "",
            sectorArr: [],
            selectedOption: null,
            isOpen: false,
        };

    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    };
    buildDataInputSelect = (inputData) => {
        let rs = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                rs.push(object);
            })
        }
        return rs;
    }
    componentDidMount() {
        var { match } = this.props;
        this.props.onEditItemCategory(match.params.id_category);
        isLoadingExternally = true;
        this.setState({
            sectorArr: this.props.fetchSectors()
        });
        var { category } = this.props;
        if (match.params.id_category) {
            const result = category.find((o) => o.id === match.params.id_category);
            this.setState({
                txtName: result.name,
                id_sector: result.id_sectors,
                txtImage: result.image,
                ImgPrivew: result.image,
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        var { match } = this.props;
        if (prevProps.sector !== this.props.sector) {
            let dataSelect = this.buildDataInputSelect(this.props.sector);
            this.setState({
                sectorArr: dataSelect
            })
        }
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.category) {
            var { category } = NextProps;
            if (match.params.id_category) {
                const result = category.find((o) => o.id === match.params.id_category);
                // this.setState({
                //     txtName:  result.name,
                //     id_sector:  result.id_sectors,
                // });
            }
        }
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
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState
        })
    };
    checkValidate = () => {
        let check = ['txtName', 'selectedOption', 'txtImage'];
        let isValid = true;
        if (!this.state[check[0]]) {
            isValid = false;
            toast.error("Vui lòng nhập tên");
        }
        if (!this.state[check[1]]) {
            isValid = false;
            toast.error("Vui lòng chọn loại sản phẩm");
        }
        if (!this.state[check[2]]) {
            isValid = false;
            toast.error("Vui lòng chọn ảnh");
        }
        return isValid;
    }
    onSubmitForm = (event) => {
        let isValid = this.checkValidate();
        var { match } = this.props;
        if (isValid === false) return;
        event.preventDefault();
        var { history } = this.props;
        var { txtName, id_sector, selectedOption, txtImage } = this.state;

        var category = {
            id: uniqid("category-"),
            name: txtName,
            id_sector: selectedOption.value,
            image: txtImage
        };
        console.log("nè", category)
        var categoryUpdate = {
            id: match.params.id_category,
            name: txtName,
            id_sector: selectedOption.value,
            image: txtImage
        };
        if (match.params.id_category) {
            this.props.onUpdateItemCategory(categoryUpdate);
            history.goBack();
        } else {
            this.props.onAddItemCategory(category);
            history.goBack();
        }
    };
    render() {
        var { sector } = this.props;
        let { txtName, id_sector, selectedOption, txtImage, ImgPrivew } = this.state;
        return (
            <Container fluid>
                <Link to="/admin/manage/categories">
                    <Button type="button" className="btn btn-primary" size="sm">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
                    </Button>
                </Link>

                <Form action="" method="post" onSubmit={this.onSubmitForm}>
                    <Row>
                        <Col sm="6">
                            <Form.Group className="mb-3">
                                <Form.Label>Loại Sản Phẩm</Form.Label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.sectorArr}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm="6">
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Tên Danh Mục</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nhập tên danh mục cần thêm..."
                                    name="txtName"
                                    value={txtName}
                                    onChange={(e) => { this.onChange(e, 'txtName') }} />
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <Form.Group >
                                <Form.Label className="border border-dark" style={{ backgroundColor: "#ffe6e6", padding: "10px", marginTop: "100px", cursor: "pointer" }} htmlFor="txtImage">
                                    <FontAwesomeIcon icon={faUpload} className="mr-2 fa-3x" />Tải Ảnh</Form.Label>
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
                        <Col sm="8">
                            <div style={{ backgroundImage: `url(${ImgPrivew})`, height: "200px", width: "300px", align: "center", background: "center center no-repeat", backgroundSize: "contain", cursor: "pointer", margin: "30px" }}
                                onClick={() => this.openPreviewIMG()}
                            ></div>
                        </Col>
                        <Col sm="12">
                            <Button type="button"
                                className="btn btn-danger"
                                onClick={this.onSubmitForm}
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="mr-2"
                                    size="lg" />Lưu
                            </Button>

                        </Col>
                    </Row>
                </Form>

                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.ImgPrivew}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </Container >
        )
    }

}
var mapStateToProps = (state) => {
    return {
        category: state.category,
        sector: state.sector,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemCategory: (category) => {
            return dispatch(actions.onAddCategoryResquest(category));
        },
        fetchSectors: () => {
            return dispatch(actions.fetchSectorResquest());
        },
        onEditItemCategory: (id) => {
            return dispatch(actions.onEditCategoryResquest(id));
        },
        onUpdateItemCategory: (category) => {
            return dispatch(actions.onUpdateCategoryResquest(category));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)