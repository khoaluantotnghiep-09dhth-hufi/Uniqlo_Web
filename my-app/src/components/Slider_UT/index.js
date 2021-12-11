import React, { Component } from 'react';
import { Row, Container, Col, Image } from 'react-bootstrap';
import ListImage from './Slider_Image/index'
import Item from "./../Category_Product/Item_Product/index";

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
        var{name}=this.props;
        const ListImages = this.props.arrayList;
        const elementImages = ListImages.map((product) => (
            <React.Fragment>
              <Col lg="10" className="mt-4">
                <Item key={product.id} product={product} />
              </Col>
            </React.Fragment>
          ));
        return (
            <>
                <Container className="mt-5">
                    <h2 className="d-flex justify-content-start">{name}</h2>
                    <Row className="mt-4">
                     
                            <Carousel
                                swipeable={false}
                                draggable={false}
                                showDots={true}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                                autoPlaySpeed={8000}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={1000}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                deviceType={this.props.deviceType}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >
                                {elementImages}
                            </Carousel>;
                     
                    </Row>
                </Container>
            </>
        );
    }
}

export default index;