import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
let isLoadingExternally = false;
class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            idItem: "",
            txtName: "",
            id_sector: "",
            sectorArr: [],
        };
        
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemCategory(match.params.id_category);
        isLoadingExternally = true;

        this.setState({
            sectorArr: this.props.fetchSectors()
        })
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.category) {
            var { category } = NextProps;
            if (match.params.id_category) {
                const result = category.find((o) => o.id === match.params.id_category);
                console.log("result",result);
                this.setState({
                    idItem: result.id,
                    txtName: result.name,
                    id_sector: result.id_sector,
                });
            }
        }
    }
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState
        }        )
        
    };
    checkValidate = () => {
        let check = ['txtName'];
        let isValid = true;

        if (!this.state[check[0]]) {
            isValid = false;
            alert("Vui lòng nhập tên");

        }
        return isValid;
    }
    onSubmitForm = (event) => {
        let isValid = this.checkValidate();
        var { match } = this.props;
        if (isValid === false) return;
        event.preventDefault();
        var { history } = this.props;
        var { idItem, txtName, id_sector } = this.state;

        var category = {
            id: uniqid("category-"),
            name: txtName,
            id_sector: id_sector,
        };
        var categoryUpdate = {
            id: match.params.id_category,
            name: txtName,
            id_sector: id_sector,
        };

        if (idItem) {
            this.props.onUpdateItemCategory(categoryUpdate);
            history.goBack();
        } else {
            this.props.onAddItemCategory(category);
            history.goBack();
        }
    };
    render() {
        var { sector } = this.props;
        return (
            <Container fluid>
                <Row>
                    <Link to="/admin/manage/categories">
                        <Button type="button" className="btn btn-primary" size="sm">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
                        </Button>
                    </Link>
                    <Col sm="12">
                        <Form action="" method="post" onSubmit={this.onSubmitForm}>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Tên Đối Tượng</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nhập tên đối tượng cần thêm..."
                                    name="txtName"
                                    value={this.setState.txtName}
                                    onChange={(e) => { this.onChange(e, 'txtName') }} />
                                <Form.Control.Feedback
                                    type="invalid" >
                                    Vui lòng nhập tên cần thêm !
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Loại</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_sector}
                                    onChange={(e) => { this.onChange(e, 'id_sector') }}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_sector}
                                >
                                      <option value="object-1">Chọn</option>
                                      {sector && sector.length > 0 &&
                                        sector.map((option, index) => (

                                            <option value={option.id} key={index}>{option.name}</option>
                                        ))}
       
                                </Form.Select>


                            </Form.Group>
                            {/* <Link to="/admin/manage/objects" > */}
                            <Button type="button"
                                className="btn btn-danger"
                                onClick={this.onSubmitForm}
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="mr-2"
                                    size="lg" />Lưu
                            </Button>
                            {/* </Link> */}
                        </Form>
                    </Col>
                </Row>
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