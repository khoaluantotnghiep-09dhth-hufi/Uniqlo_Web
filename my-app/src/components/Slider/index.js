import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import ListImage from './Slider_Image/index'
import './Slider.scss';
class index extends Component {
    constructor(props) {
        super(props);
        this.onShowSlider = this.onShowSlider.bind(this);
    }
    onShowSlider() {

    }
   
    render() {

        const ListImages = this.props.arrayList;
        const elementImages = ListImages.map((image, index) => {
            return <ListImage size={this.props.chooseSize} key={image.id}

                image={image.image} ></ListImage>
        });
        return (
            <div>
                <Container className="mt-5">
                    <h2 className="d-flex justify-content-start" onClick={this.onShowSlider}>{this.props.name}</h2>
                    <Row className="mt-3">
                        <Col className="xl-3" md-3>
                            {elementImages}
                        </Col>

                    </Row>
                </Container>
            </div>
        );
    }
}

export default index;