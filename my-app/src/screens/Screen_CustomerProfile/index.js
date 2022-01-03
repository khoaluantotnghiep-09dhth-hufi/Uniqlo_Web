import React, { Component } from 'react';

import Customer_Profile from "../../components/Account/Info_Account/index"
class index extends Component {
    render() {
        var{location,match,history} = this.props;
       

        return (
            <div >
                <Customer_Profile match={match} location={location} history={history}/>      
            </div>
        );
    }
}

export default index;