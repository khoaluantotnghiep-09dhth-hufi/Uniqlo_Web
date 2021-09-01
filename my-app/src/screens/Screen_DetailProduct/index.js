import React, { Component } from 'react';
import Detail_Product from './../../components/Detail_Product/index';
class index extends Component {
    render() {
        var {match}=this.props;
        return (
            <div>
                <Detail_Product match={match}/>
            </div>
        );
    }
}

export default index;