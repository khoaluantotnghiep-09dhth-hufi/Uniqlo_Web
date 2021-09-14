import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CallAPI from '../../utils/Callapi';
import { Link } from "react-router-dom";
import { Button, Form, Col, Container, Row, FormGroup, Label, InputGroup, Modal, Alert } from 'react-bootstrap';
let data = [];
export default class addObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'dropdown' ? target.value : target.value;
        this.setState({
            [name]: value
        });
    }
    onEdit = (e) => {
        e.preventDefault();
        var { id, txtName, idObject } = this.state;
        CallAPI(`/sectors/${id}`, 'PUT', {
            name: txtName,
            idObject: idObject,
        }).then(res => {
            alert('Sửa thành công !');
        });
    }

    componentDidMount() {
        
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            CallAPI(`sectors/${id}`, 'GET', null).then(res => {
                var data = res.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                    idObject: data.id_object,
                });
            });
        }


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
                            <Link to="/admin/manage/sectors">
                                <Button type="button" className="btn btn-danger" onClick={this.onAdd}>
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" size="lg" />Lưu
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }

}