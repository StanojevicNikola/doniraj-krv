import React, { Component } from 'react';
import {Link } from "react-router-dom";
import {setToken} from "../actions";
import {connect} from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode"
import {Button, Col, Form, Row} from "react-bootstrap";


class LoginDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            token: ''
        };

        this.userChange = this.userChange.bind(this);
        this.passChange = this.passChange.bind(this);

        this.loginClick = this.loginClick.bind(this);
    }

    userChange(e) {
        this.setState({
            user: e.target.value
        })
    }

    passChange(e) {
        this.setState({
            pass: e.target.value
        })
    }

    async loginClick(e) {
        // e.preventDefault();
        let res = await axios.post('/users/login', {username: this.state.user, password: this.state.pass});
        const token = res.data.data.token;
        axios.defaults.headers.common = {'authorization': `Bearer ${token}`};
        let resUser = await axios.post('/user/data');

        this.props.setToken({
            token: token,
            username: this.state.user,
            name: resUser.data.data.name,
            roles: resUser.data.data.roles,
            email: resUser.data.data.email,
            isAdmin: resUser.data.data.isAdmin,
            donor: resUser.data.data.donor,
            coordinator: resUser.data.data.coordinator
        });
    }

    render() {
        return (
                <div>
                    <div>
                        <input type="username" placeholder="Username"
                               onChange={this.userChange}
                               style={{margin:'15px', padding:'5px'}}
                        />
                        <br/>
                        <input type="password" placeholder="Password"
                               onChange={this.passChange}
                               style={{padding:'5px'}}
                        />

                        <br/>
                        <br/>
                        <Link to='/' style={{color:'white'}}>
                            <Button onClick={this.loginClick} variant="danger" style={{color:'white'}}>
                                Login
                            </Button>
                        </Link>
                        <br/>
                        <Link to="/register">register</Link>
                    </div>
                </div>
        );
    }


}

function mapDispatchToProps(dispatch){
    return {
        setToken: data => dispatch(setToken(data))
    }
}
export default connect(null, mapDispatchToProps)(LoginDash);
