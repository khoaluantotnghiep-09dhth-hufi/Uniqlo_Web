import React, { Component } from 'react';

import Login from '../../components/Login/index';


class Screen_Account extends Component {
    render() {
        var{location} = this.props;
        return (
            <div >
              
               
                <Login location={location}/>
           
            </div>

        );
    }
}

export default Screen_Account;