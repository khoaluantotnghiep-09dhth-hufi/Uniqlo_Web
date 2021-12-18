import React, { Component } from 'react';

import Privacy_Policy from "../../components/Privacy_Policy/index"
class index extends Component {
    render() {
        var{location} = this.props;
        return (
            <div >
           
             
                <Privacy_Policy location={location}/>
            
            </div>
        );
    }
}

export default index;