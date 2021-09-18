import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CallAPI from '../../utils/Callapi';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            idItem: "",
            txtName: "",
            idSector: "",
        });
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemCategory(match.params.idItem);
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.category) {
            var { category } = NextProps;
            if (match.params.idItem) {
                const result = category.find(
                    (o) => o.id === match.params.idItem
                );

                this.setState({
                    idItem: result.id,
                    txtName: result.name,
                    idSector: result.idSector,
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
        var { idItem, txtName, ibSector } = this.state;

        var category = {
            id: uniqid("category-"),
            name: txtName,
            idSector: ibSector,
        };
        var categoryUpdate = {
            id: match.params.id_category,
            name: txtName,
            idSector: ibSector,
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

                                    onChange={this.onChange} />
                                <Form.Control.Feedback
                                    type="invalid" >
                                    Vui lòng nhập tên cần thêm !
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Select aria-label="Default select example" name="idSector"
                                    onChange={this.onChange}
                                   
                                >
                                    {/* <option optionDisable="true">Chọn Đối Tượng</option>
                                    {data.map((option, i) => (

                                        <option value={option.id} key={i}>{option.name}</option>
                                    ))} */}
                                    <option value="selector-1">Hàng Mới</option>
                                    <option value="selector-2">Đặc Biệt</option>
                                    <option value="selector-3">Giảm Giá</option>
                               
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
            </Container>
        )
    }

}
var mapStateToProps = (state) => {
    return {
        category: state.category,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemCategory: (category) => {
            dispatch(actions.onAddCategoryResquest(category));
        },
        onEditItemCategory: (id) => {
            dispatch(actions.onEditCategoryResquest(id));
        },
        onUpdateItemCategory: (category) => {
            dispatch(actions.onUpdateCategoryResquest(category));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)