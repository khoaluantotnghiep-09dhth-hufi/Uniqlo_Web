import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CallAPI from '../../utils/Callapi';
import { Link } from "react-router-dom";
import uniqid from 'uniqid';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
let data = [];

export default class addObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            idObject: ''
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'dropdown' ? target.value : target.value;
        this.setState({
            [name]: value,
        });

    }


    onAdd = (e) => {
        e.preventDefault();
        var { id, txtName, idObject } = this.state;
        const sector = {
            id: uniqid('sector-'),
            name: txtName,
            id_object: idObject,
        }
        CallAPI('/sectors', 'POST', sector).then(res => {
            alert('Thêm thành công !');
            console.log(res);
        });

    }
    componentDidMount() {
        CallAPI('objects', 'GET', null).then(res => {
            data = res.data;
        });
    }
    render() {
        var { txtName, idObject } = this.state;
        return (
            <Container fluid>
                <Row>
                    <Link to="/admin/manage/sectors">
                        <Button type="button" className="btn btn-primary" size="sm">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
                        </Button>
                    </Link>
                    <Col sm="12">
                        <Form onSubmit={this.onAdd}>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Tên Loại Sản Phẩm</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nhập tên loại sản phẩm cần thêm..."
                                    name="txtName"
                                    onChange={this.onChange}
                                    value={txtName}
                                />

                                <Form.Control.Feedback type="invalid" >
                                    Vui lòng nhập tên cần thêm !
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Select aria-label="Default select example" name="idObject"
                                    onChange={this.onChange}
                                    value={idObject}
                                >
                                    <option optionDisable="true">Chọn Đối Tượng</option>
                                    {data.map((option, i) => (

                                        <option value={option.id} key={i}>{option.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Link to="/admin/manage/objects">
                                <Button type="button" className="btn btn-danger" onClick={this.onAdd}>
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Thêm
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }

}