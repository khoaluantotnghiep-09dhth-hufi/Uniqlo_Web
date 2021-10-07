import React, { Component } from 'react';
import Member_Benifits from "./../../components/Account/Member_Benifits/index";
class index extends Component {
    render() {
        var{location} = this.props;
        var {match}=this.props;
        return (
          <React.Fragment>
              <Member_Benifits location={location} match={match}/>
          </React.Fragment>
        );
    }
}

export default index;