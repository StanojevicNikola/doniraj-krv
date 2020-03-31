import React, { Component } from 'react';
import Mapa from "./Mapa";
import { connect } from 'react-redux'

class UserDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            token: props.token
        };
    }

    render() {
        console.log(this.props.token)
        return (
            <div>
                <Mapa/>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return { token: state.token }
};

export default connect(mapStateToProps, {})(UserDash);
