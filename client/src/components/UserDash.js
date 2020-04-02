import React, { Component } from 'react';
import Mapa from "./map/Mapa";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            token: props.token
        };

        this.renderDash = this.renderDash.bind(this);
        this.badLogin = this.badLogin.bind(this);
    }

    renderDash() {
        return (
            <Mapa/>
        );
    }

    badLogin() {

        return (
            <div className="center">
                <br/>
                <div className="red accent-4 white-text center bad-login">
                    Bad login!
                    <br/>
                    <Link className="white-text" to='/login'>Go back</Link>
                </div>
            </div>
        )

    }


    render() {
        console.log(this.props.token);
        return (
            <div>
                {this.props.token ? this.renderDash() : this.badLogin()}
            </div>
        );
    }


}

const mapStateToProps = state => {
    return { token: state.token }
};

export default connect(mapStateToProps, {})(UserDash);
