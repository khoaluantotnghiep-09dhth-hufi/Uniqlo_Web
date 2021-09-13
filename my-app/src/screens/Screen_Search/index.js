import React, { Component } from 'react';
import Search from './../../components/Search/index';


class index extends Component {
    render() {
        var{match} = this.props;
        return (
           <Search match={match}/>
        );
    }
}

export default index;