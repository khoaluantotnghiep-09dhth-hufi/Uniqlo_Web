import React, { Component } from 'react';
import { Row, Container, Col, Image } from 'react-bootstrap';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};


class index extends Component {

    render() {
        return (
            <div>
                <Container className="mt-5">
                    <h2 className="d-flex justify-content-start">SẢN PHẨM CÔNG NGHỆ ĐỘC QUYỀN TẠI UNIQLO</h2>
                    <Row className="mt-4">
                        <Col>
                            <Carousel
                                swipeable={false}
                                draggable={false}
                                showDots={true}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                                autoPlaySpeed={4000}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={1000}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                deviceType={this.props.deviceType}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                <div><Image src="https://www.uniqlo.com/vn/top/img/topic/20210401_1056_gl0689.jpg" rounded /></div>
                                <div><Image src="https://www.uniqlo.com/vn/top/img/topic/20201120_1350_gl6097.jpg" rounded /></div>
                                <div><Image src="https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl9838.jpg" rounded /></div>
                                <div><Image src="https://www.uniqlo.com/vn/top/img/topic/20210401_1056_gl6208.jpg" rounded /></div>
                              
                            </Carousel>;
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default index;