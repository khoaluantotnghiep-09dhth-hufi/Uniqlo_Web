import React, { Component } from 'react';

import Return_Policy from "../../components/Return_Policy/index"
class index extends Component {
    render() {
        var{location} = this.props;
        return (
           <div>
                <Return_Policy location={location}/>    
           </div>    
        );
    }
}

export default index;