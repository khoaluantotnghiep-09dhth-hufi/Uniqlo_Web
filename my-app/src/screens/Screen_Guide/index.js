import React, { Component } from 'react';

import Guide from "../../components/Guide/index"

class index extends Component {
    render() {
        var{location} = this.props;
        return (
            <div >
           
             
                <Guide location={location}/>
            
            </div>
        );
    }
}

export default index;