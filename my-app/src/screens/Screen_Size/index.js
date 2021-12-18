import React, { Component } from 'react';

import Size from "../../components/Size/index"
class index extends Component {
    render() {
        var{match} = this.props;
        return (
            <div >
                <Size match={match}/>     
            </div>
        );
    }
}

export default index;