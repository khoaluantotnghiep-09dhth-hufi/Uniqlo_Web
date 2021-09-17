import React, { Component } from 'react';
import Detail_News from './../../components/News/Detail_News/index';


class index extends Component {
    render() {
        var{match} = this.props;
        return (
           <Detail_News match={match}/>
        );
    }
}

export default index;