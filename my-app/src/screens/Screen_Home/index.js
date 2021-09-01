import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './App.scss';


import Banner from '../../components/Banner/index';
import Slider from '../../components/Slider/index';
import Slider_UT from '../../components/Slider_UT/index';
import Slider_DQ from '../../components/Slider_DocQuyen/index';
import Slider_CO from '../../components/Slider_Collection/index';


class test extends Component {
    render() {
        var ListimagesLifeWear = [
            {
              id: 1,
            
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210317_1551_gl8634.jpg',
              status: true
            },
            {
              id: 2,
              
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210401_0847_gl9968.jpg',
              status: true
            },
            {
              id: 3,
              
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210708_1719_gl8991.jpg',
              status: true
            },
            {
              id: 4,
           
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210610_1055_gl2843.jpg',
              status: true
            },
          ]

         var ListimagesNewStyle = [
            {
              id: 1,
            
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl8340.jpg',
              status: true
            },
            {
              id: 2,
              
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl5261.jpg',
              status: true
            },
            {
              id: 3,
              
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl0393.jpg',
              status: true
            },
            {
              id: 4,
           
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl2679.jpg',
              status: true
            },
          ]

          var ListimagesSummer = [
            {
              id: 1,
            
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl6041.jpg',
              status: true
            },
            {
              id: 2,
              
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl8847.jpg',
              status: true
            },
            {
              id: 3,
              
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl9122.jpg',
              status: true
            },
            {
              id: 4,
           
              image: 'https://www.uniqlo.com/vn/top/img/topic/20210812_1130_gl8835.jpg',
              status: true
            },
          ]
          var ListimagesStylingBook = [
            {
              id: 1,
            
              image: 'https://www.uniqlo.com/vn/top/img/topic/210305_VN_PC_stylingbook_women.jpg',
              status: true
            },
            {
              id: 2,
              
              image: 'https://www.uniqlo.com/vn/top/img/topic/210305_VN_PC_stylingbook_men.jpg',
              status: true
            },
            {
              id: 3,
              
              image: 'https://www.uniqlo.com/vn/top/img/topic/210305_VN_PC_stylingbook_kids.jpg',
              status: true
            },
            {
              id: 4,
           
              image: 'https://www.uniqlo.com/vn/top/img/topic/210305_VN_PC_stylingbook_baby.jpg',
              status: true
            },
          ]
         
        return (
            <div className="App">
  
      <Banner />
     <Slider chooseSize="mr-2" name="LifeWear" arrayList={ListimagesLifeWear}/>
      <Slider_UT />
      <Slider_DQ />
      <Slider_UT />
      <Slider_CO />
      <Slider chooseSize="mr-2"  name="NEW STYLE FALL" arrayList={ListimagesNewStyle}/>
      <Slider chooseSize="mr-2"  name="SUMMER ESSENTIAL" arrayList={ListimagesSummer}/>
      <Image src="https://www.uniqlo.com/vn/top/img/topic/20210715_1636_gl5593.jpg" />
      <Slider  className="slider--repair" chooseSize="maxmax" name="STYLING BOOK"  arrayList={ListimagesStylingBook} />
  
    </div>
        );
    }
}

export default test;