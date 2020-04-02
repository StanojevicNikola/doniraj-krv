import React, { Component } from 'react';
import {Link } from "react-router-dom";
import {setToken} from "../actions";
import {connect} from "react-redux";
import axios from "axios";


class LoginDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
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
        console.log(res)
        const token = res.data.data.token;
        // this.setState({ token: token });
        this.props.setToken({token: token});
    }

    render() {
        return (
            <div className="z-depth-1 grey lighten-4 row login">
                    <br/>
                    <div className="col s12">
                        <div className="row">
                            <input className="col offset-s2 s8 validate" type="email" placeholder="Email"
                                   onChange={this.userChange}/>
                        </div>
                        <div className="row">
                            <input className="col offset-s2 s8 validate" type="password" placeholder="Password"
                                   onChange={this.passChange}/>
                        </div>
                        <div className="row">

                               <div onClick={this.loginClick}>
                                  <Link to='/' className="col offset-s4 s4 btn btn-large red accent-4 white-text">Login</Link>
                               </div>

                       </div>
                        <div className="row">
                            <Link className="col offset-s5 s4" to="/register">register</Link>
                        </div>
                    </div>
                    <br/>
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
