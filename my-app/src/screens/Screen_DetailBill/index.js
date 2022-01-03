import React, { Component } from 'react';

import Detail_Bill from "../../components/Account/Detail_Bill/index"
class index extends Component {
    render() {
        var{location,match,history} = this.props;
       

        return (
            <div >
                <Detail_Bill match={match} location={location} history={history}/>      
            </div>
        );
    }
}

export default index;