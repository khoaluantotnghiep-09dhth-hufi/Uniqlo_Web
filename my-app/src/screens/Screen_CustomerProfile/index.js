import React, { Component } from 'react';

import Customer_Profile from "../../components/Account/Info_Account/index"
class index extends Component {
    render() {
        var{location} = this.props;
        var {match}=this.props;
        return (
            <div >
                <Customer_Profile match={match} location={location}/>      
            </div>
        );
    }
}

export default index;