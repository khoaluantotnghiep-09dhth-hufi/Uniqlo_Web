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
import * as actions from "./../../../actions/sectorsActions";
import * as actionsObject from "./../../../actions/objectAction";
class AddSector extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            idItem: "",
            txtName: "",
            idobject:"",
        });
    }
    componentDidMount() {
        var { match } = this.props;
        this.props.onEditItemSector(match.params.idItem);
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.sector) {
            var { sector } = NextProps;
            if (match.params.idItem) {
                const result = sector.find(
                    (o) => o.id === match.params.idItem
                );

                this.setState({
                    idItem: result.id,
                    txtName: result.name,
                    id_object: result.id_object,
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
        var { idItem, txtName, idobject } = this.state;

        var sector = {
            id: uniqid("sector-"),
            name: txtName,
            id_object: idobject,
        };
        var sectorUpdate = {
            id: match.params.id_sectors,
            name: txtName,
            id_object: idobject,
        };

        if (idItem) {
            this.props.onUpdateItemSector(sectorUpdate);
            alert('Sửa thành công');
            history.goBack();
        } else {
            this.props.onAddItemSector(sector);
            alert('Thêm thành công');
            history.goBack();
        }
    };
    render() {
       var data = this.props.fetchObjects();
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
                                <Form.Label>Tên Loại</Form.Label>
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
                                <Form.Select value="object-1" aria-label="Default select example" name="idObject"
                                    onChange={this.onChange}
                                   
                                >
                                  
                                    {data.map((option, i) => (

                                        <option value={option.id} key={i}>{option.name}</option>
                                    ))}
                                    {/* <option value="object-1">Nam</option>
                                    <option value="object-2">Nữ</option>
                                    <option value="object-3">Trẻ Em</option>
                                    <option value="object-4">Trẻ Sơ Sinh</option> */}
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
        sector: state.sector,
        object: state.object,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemSector: (sector) => {
            dispatch(actions.onAddSectorResquest(sector));
        },
        fetchObjects: () => {
            return dispatch(actionsObject.fetchObjectsResquest());
        },
        onEditItemSector: (id) => {
            dispatch(actions.onEditSectorResquest(id));
        },
        onUpdateItemSector: (sector) => {
            dispatch(actions.onUpdateSectorResquest(sector));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSector)