import React, { Component } from 'react';
import {  Carousel, Container } from 'react-bootstrap';
class index extends Component {
    render() {
        return (
            <Container >
                <Carousel fluid controls={false}>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src="https://image.uniqlo.com/UQ/ST3/us/imagesother/home/210816-1280x640-suw.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src="https://image.uniqlo.com/UQ/ST3/us/imagesother/home/210816-1280x640-m-joggers.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src="https://image.uniqlo.com/UQ/ST3/us/imagesother/home/210816-1280x640-w-joggers.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

        );
    }
}

export default index;