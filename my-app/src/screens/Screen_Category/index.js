import React, { Component } from 'react';

import Category_Product_Container from '../../components/Category_Product/index';
import Banner from '../../components/Banner/index';

class index extends Component {
    render() {
        var {match,location,history}=this.props;
        return (
            <div >
               
              
                <Category_Product_Container match={match} location={location} history={history}/>
              
            </div>
        );
    }
}

export default index;