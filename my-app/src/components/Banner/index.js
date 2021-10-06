import React, { Component } from 'react';
import {  Carousel, Container } from 'react-bootstrap';
class index extends Component {
    render() {
        var listBanner=this.props.arrayList;
        var elements=listBanner.map((item,index)=>{
            return  <Carousel.Item interval={2000}>
            <img
                className="d-block w-100"
                src={item.image}
                alt="First slide"
            />
            
        </Carousel.Item>
        });
        return (
            <Container >                
				<br/><a href="/contact"><img alt="" src="https://www.uniqlo.com/vn/top/img/topic/20210706_1742_gl5196.jpg" width="100%"/></a>	
                <Carousel className="mt-5" fluid controls={false}>
                   {elements}
                </Carousel>
            </Container>
        );
    }
}

export default index;