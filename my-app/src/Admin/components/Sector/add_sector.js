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
import { Button, Form, Col, Container, Row, Select } from 'react-bootstrap';
import * as actions from "./../../../actions/index";
let isLoadingExternally = false;
class AddSector extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            idItem: "",
            txtName: "",
            id_object: [],
        });
    }
    componentDidMount() {
        var { match } = this.props;
        isLoadingExternally = true;
        this.props.onEditItemSector(match.params.id_sector);
        this.setState({
            ib_object: this.props.fetchObjects()
        })

    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.sector) {
            var { sector } = NextProps;
            if (match.params.id_sector) {
                const result = sector.find(
                    (o) => o.id === match.params.id_sector
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
        var { idItem, txtName, id_object } = this.state;

        var sector = {
            id: uniqid("sector-"),
            name: txtName,
            id_object: id_object,
        };
        var sectorUpdate = {
            id: match.params.id_sectors,
            name: txtName,
            id_object: id_object,
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
        var { object } = this.props;
        var data = object.map((item, index) => {
            return { ...item, index };

        });
        console.log(data);
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
                                    value={this.setState.txtName}
                                    onChange={this.onChange} />
                                <Form.Control.Feedback
                                    type="invalid" >
                                    Vui lòng nhập tên cần thêm !
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_object}
                                    onChange={this.handleChange}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.ib_object}
                                >

                                    {object.map((option) => (
                                        <option value={option.id}>{option.name}</option>
                                       
                                    ))}
                                     console.log(object.map);
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
            return dispatch(actions.fetchObjectsResquest());
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