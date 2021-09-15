import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CallAPI from '../../utils/Callapi';
import { Link } from "react-router-dom";
import { Button, Form, Col, Container, Row, FormGroup, Label, InputGroup, Modal, Alert } from 'react-bootstrap';
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
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    onEdit = (e) => {
        e.preventDefault();
        var { id, txtName } = this.state;
        CallAPI(`/objects/${id}`, 'PUT', {
            name: txtName,
        }).then(res => {
            alert('Sửa thành công !');
        });
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            CallAPI(`objects/${id}`, 'GET', null).then(res => {
                var data = res.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                });
            });
        }


    }
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
                        <Form onSubmit={this.onEdit}>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Tên Đối Tượng</Form.Label>
                                <Form.Control required type="text" name="txtName" onChange={this.onChange} />

                            </Form.Group>
                            <Link to="/admin/manage/objects">
                                <Button type="button" className="btn btn-danger" onClick={this.onEdit}>
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