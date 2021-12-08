import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './Slider_Image.scss'
class index extends Component {
    render() {


        return (
            <Image className={this.props.size} src={this.props.image} rounded width="23%" />
        );
    }
}

export default index;