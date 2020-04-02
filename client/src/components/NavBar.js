import React, { Component } from "react";

import { Link } from "react-router-dom";

import logo from "../img/blood-donation.png";
import {connect} from "react-redux";
import {deleteToken} from "../actions";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.logoutMe = this.logoutMe.bind(this);
    }


    logoutMe() {
        this.props.deleteToken();
    }
    render() {
        return (
            <nav className=" red accent-4">
                <div className="container nav-wrapper">
                    <ul>
                        <li>
                            <Link to="/">
                                <img
                                    className="img-logo responsive-img logo"
                                    src={logo}
                                    alt="Logo"
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="right">
                            <Link to="/about">About</Link>
                        </li>
                        <li className="right">
                            {this.props.token ?  <div onClick={this.logoutMe}><Link to="/">Logout</Link></div> : <Link to="/login">Login</Link> }
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return { token: state.token }
};

function mapDispatchToProps(dispatch){
    return {
        deleteToken: data => dispatch(deleteToken(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
