import React, { Component } from 'react';
import {Link } from "react-router-dom";
import {setToken} from "../actions";
import {connect} from "react-redux";
import axios from "axios";
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
        e.preventDefault();
        let res = await axios.post('/users/login', {username: this.state.user, password: this.state.pass});
        console.log(res);
        const token = res.data.data.token;
        // this.setState({ token: token });
        this.props.setToken({token: token});
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
                        <Button onClick={this.loginClick} variant="danger" style={{color:'white'}}>
                            <Link to='/' style={{color:'white'}}>
                                Login
                            </Link>
                        </Button>
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
