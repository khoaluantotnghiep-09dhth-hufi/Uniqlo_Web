import React, { Component } from 'react';
import News from './../../components/News/index';


class index extends Component {
    render() {
        var{match} = this.props;
        return (
           <News match={match}/>
        );
    }
}

export default index;