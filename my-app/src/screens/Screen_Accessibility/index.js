import React, { Component } from 'react';

import Accessibility from "../../components/Accessibility/index"

class index extends Component {
    render() {
        var{location} = this.props;
        return (
            <div >
           
             
                <Accessibility location={location}/>
            
            </div>
        );
    }
}

export default index;