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
class AddImportProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            idItem: "",
            txtDateImport: "",
            id_order: "",
            txtTotalImport: "",
            orderArr: [],           
        };      
    }
    componentDidMount() {
        var { match } = this.props;

        this.props.onEditItemImportProduct(match.params.id_import);
        isLoadingExternally = true;

        this.setState({
          orderArr: this.props.fetchOrders()
        })
    }
    componentWillReceiveProps(NextProps) {
        var { match } = this.props;
        if (NextProps && NextProps.import_product) {
            var { import_product } = NextProps;
            if (match.params.id_import) {
                const result = import_product.find((o) => o.id === match.params.id_import);
                // this.setState({
                //     idItem: result.id,
                //     txtName: result.name,
                //     id_sector: result.id_sector,
                // });
            }
        }
    }
    onChange = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;
        this.setState({
            ...coppyState
        });
    };
    checkValidate = () => {
        let check = ['txtDateImport'];
        let isValid = true;

        if (!this.state[check[0]]) {
            isValid = false;
            alert("Vui lòng chọn ngày");

        }
        return isValid;
    }
    onSubmitForm = (event) => {
        let isValid = this.checkValidate();
        var { match } = this.props;
        if (isValid === false) return;
        event.preventDefault();
        var { history } = this.props;
        var { idItem, txtDateImport, id_order, txtTotalImport} = this.state;

        var import_product = {
            id: uniqid("import-"),
            date_import: txtDateImport,
            id_order: id_order,
            total_import: txtTotalImport,
        };
        var import_productUpdate = {
            id: match.params.id_import,
            date_import: txtDateImport,
            id_order: id_order,
            total_import: txtTotalImport,
        };

        if (match.params.id_import) {
            this.props.onUpdateItemCategory(import_productUpdate);
            history.goBack();
        } else {
            this.props.onAddItemCategory(import_product);
            history.goBack();
        }
    };
    render() {
        var { order } = this.props;
        return (
            <Container fluid>
                <Row>
                    <Link to="/admin/manage/import-product">
                        <Button type="button" className="btn btn-primary" size="sm">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />Trở về
                        </Button>
                    </Link>
                    <Col sm="12">
                        <Form action="" method="post" onSubmit={this.onSubmitForm}>
                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Chọn ngày nhập</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    placeholder="Nhập tên đối tượng cần thêm..."
                                    name="txtDateImport"
                                    id="txtDateImport"
                                    value={this.setState.txtDateImport}
                                    onChange={(e) => { this.onChange(e, 'txtDateImport') }} />
                                <Form.Control.Feedback
                                    type="invalid" >
                                    Vui lòng chọn ngày nhập !
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* <Link to="/admin/manage/objects" > */}

                            <Form.Group className="mb-3" controlId="formBasicObject">
                                <Form.Label>Mã đặt hàng</Form.Label>
                                <Form.Select name="form-field-name"
                                    value={this.setState.id_order}
                                    onChange={(e) => { this.onChange(e, 'id_order') }}
                                    labelKey={'Tên'}
                                    valueKey={'Mã'}
                                    isLoading={isLoadingExternally}
                                    options={this.setState.id_order}
                                >
                                      <option value="order-1">Chọn</option>
                                      {order && order.length > 0 &&
                                        order.map((option, index) => (

                                            <option value={option.id} key={index}>{option.name}</option>
                                        ))}
       
                                </Form.Select>


                            </Form.Group>

                            <Form.Group >
                              <Form.Label htmlFor="exampleFormControlTextarea1">Tổng nhập</Form.Label>
                              <Form.Control
                                type="number"
                                id="txtTotalImport"
                                name="txtTotalImport"
                                placeholder="Tổng nhập..."
                                value={this.setState.txtTotalImport}
                                onChange={(e) => { this.onChange(e, 'txtTotalImport') }}
                                required
                              />
                          </Form.Group>
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
        import_product: state.import_product,
        order: state.order,
    };
};
var mapDispatchToProps = (dispatch, props) => {
    return {
        onAddItemImportProduct: (import_product) => {
            return dispatch(actions.onAddImportProductResquest(import_product));
        },
        fetchOrders: () => {
            return dispatch(actions.fetchOrderResquest());
        },
        onEditItemImportProduct: (id) => {
            return dispatch(actions.onEditImportProductResquest(id));
        },
        onUpdateItemImportProduct: (import_product) => {
            return dispatch(actions.onUpdateImportProductResquest(import_product));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddImportProduct)