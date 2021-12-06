import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Component } from "react";
import * as actions from "./../../../actions/index";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import HomePage from "../../containers/TheLayout";
import { toast } from 'react-toastify';
import "./login.scss";

class forgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <>
                <p>quên mật khẩu hả</p>
            </>
        )
    }
}
export default forgotPassword;