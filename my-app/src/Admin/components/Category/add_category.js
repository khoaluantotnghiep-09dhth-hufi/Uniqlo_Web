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
        this.setState({
            idItem: "",
            txtName: "",
            id_sector: [],
        });
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemCategory(match.params.id_category);
        isLoadingExternally = true;

        this.setState({
            id_sector: this.props.fetchSectors()
        })
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.category) {
            var { category } = NextProps;
            if (match.params.id_category) {
                const result = category.find(
                    (o) => o.id === match.params.id_category
                );

                this.setState({
                    idItem: result.id,
                    txtName: result.name,
                    id_sector: result.id_sector,
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
        var { idItem, txtName, id_sector } = this.state;

        var category = {
            id: uniqid("category-"),
            nameCategory: txtName,
            id_sector: id_sector,
        };
        var categoryUpdate = {
            id: match.params.id_category,
            nameCategory: txtName,
            id_sector: id_sector,
        };

        if (idItem) {
            this.props.onUpdateItemCategory(categoryUpdate);
            alert('Sửa thành công');
            history.goBack();
        } else {
            this.props.onAddItemCategory(category);
            alert('Thêm thành công');
            history.goBack();
        }
    };
    render() {
        var { sector } = this.props;
        return (
            <Container fluid>
                <Row>
                    <Link to="/admin/manage/objects">
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
                                    onChange={this.onChange} />
                                <Form.Control.Feedback
                                    type="invalid" >
                                    Vui lòng nhập tên cần thêm !
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Loại</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_sector}
                                    onChange={this.onChange}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_sector}
                                >
                                    {sector.map((option) => (
                                        <option value={option.id}>{option.name}</option>

                                    ))}
                                    console.log(sector.map);
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