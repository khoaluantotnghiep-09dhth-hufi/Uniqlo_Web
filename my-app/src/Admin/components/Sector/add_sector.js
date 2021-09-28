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
import Select from 'react-select';
let isLoadingExternally = false;
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class AddSector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idItem: "",
            txtName: "",
            id_object: "",
            object_menuArr: [],
            selectedOption: null,
        };
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    buildDataInputSelect = (inputData) =>{
        let rs = [];
        if(inputData && inputData.length > 0){
            inputData.map((item,index)=>{
                let object ={};
                object.label = item.name;
                object.value = item.id;
                rs.push(object);
            })
        }
        return rs;
    }
    componentDidMount() {
        var { match } = this.props;
        isLoadingExternally = true;
        this.props.onEditItemSector(match.params.id_sector);
        this.setState({
            object_menu: this.props.fetchObjects()
        })
        var { sector } = this.props;
        if (match.params.id_sector) {
            const result = sector.find((o) => o.id === match.params.id_sector);
            console.log("resui", result);
            this.setState({
                txtName: result.name,
                id_object: result.id_object,
            });
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        var { match } = this.props;
        if (prevProps.object_menu !== this.props.object_menu) {
            // let arrObject = this.props.object_menu;
            let dataSelect = this.buildDataInputSelect(this.props.object_menu);
            this.setState({
                // object_menuArr: arrObject,
                // id_object: arrObject && arrObject.length > 0 ? arrObject[0].id : ''
                object_menuArr : dataSelect
            })
        }
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.sector) {
            var { sector } = NextProps;
            if (match.params.id_sector) {
                const result = sector.find((o) => o.id === match.params.id_sector);
                this.setState({
                    idItem: result.id,
                    txtName: result.name,
                    id_object: result.id_object,
                });
            }
        }
    }
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState
        }, () => {
            console.log("state", this.state)
        })

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
        var { history } = this.props;
        event.preventDefault();
        if (isValid === false) return;
        var { match } = this.props;
        var { idItem, txtName, id_object,selectedOption } = this.state;
        var sector = {
            id: uniqid("sector-"),
            name: txtName,
            id_object: selectedOption.value,
        };
        var sectorUpdate = {
            id: match.params.id_sector,
            name: txtName,
            id_object: selectedOption.value,
        };

        if (idItem) {
            this.props.onUpdateItemSector(sectorUpdate);
            history.goBack();
        } else {
            this.props.onAddItemSector(sector);
            history.goBack();
        }
    };
    render() {
        let { object_menu } = this.props;
        let { txtName, id_object, selectedOption } = this.state;
        console.log(this.state)
        return (
            <Container fluid>
                <Row>
                    <Link to="/admin/manage/sectors">
                        <Button type="button" className="btn btn-primary" size="sm">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
                        </Button>
                    </Link>
                    <Col sm="12">
                        <Form onSubmit={this.onSubmitForm}>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Tên Loại</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nhập tên đối tượng cần thêm..."
                                    name="txtName"
                                    value={txtName}
                                    onChange={(e) => { this.onChange(e, 'txtName') }} />
                                <Form.Control.Feedback
                                    type="invalid" >
                                    Vui lòng nhập tên cần thêm !
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Đối Tượng</Form.Label>
                                {/* <Form.Select name="form-field-name"
                                    value={id_object}
                                    onChange={(e) => { this.onChange(e, 'id_object') }}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                >

                                    {object_menu && object_menu.length > 0 &&
                                        object_menu.map((option, index) => (

                                            <option value={option.id} key={index}>Mã: {option.id}, Tên: {option.name}</option>
                                        ))}
                                    
                                </Form.Select> */}
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.object_menuArr}
                                />
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
        object_menu: state.object_menu,
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