import React, { Component } from 'react';
import {Link} from "react-router-dom";

class RegisterDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            username : '',
            email : '',
            pass : '',
            passRepeat: '',
            place : '',
            blood : ''
        }
        this.nameChange = this.nameChange.bind(this);
        this.userChange = this.userChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.passRepeatChange = this.passRepeatChange.bind(this);
        this.bloodChange = this.bloodChange.bind(this);
        this.placeChange = this.placeChange.bind(this);

        this.submit = this.submit.bind(this);
    }

     nameChange(e) {
         this.setState({
             name: e.target.value
         })
    }

    userChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    emailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    passChange(e) {
        console.log(e.target.value)
        this.setState({
            pass: e.target.value
        })
    }

    passRepeatChange(e) {
        this.setState({
            passRepeat: e.target.value
        })
    }


    placeChange(e) {
        this.setState({
            place: e.target.value
        })
    }

    bloodChange(e) {
        this.setState({
            blood: e.target.value
        })
    }

    submit() {
        console.log(this.state)
    }

    render() {
        return (
            <div className="z-depth-1 grey lighten-4 row login">
                <br/>
                <form className="col s12">
                    <div className="row">
                        <input className="col offset-s2 s8 validate" type="text" placeholder="Name" onChange={this.nameChange}/>
                    </div>
                    <div className="row">
                        <input className="col offset-s2 s8 validate" type="text" placeholder="Username" onChange={this.userChange}/>
                    </div>
                    <div className="row">
                        <input className="col offset-s2 s8 validate" type="email" placeholder="Email" onChange={this.emailChange}/>
                    </div>
                    <div className="row">
                        <input className="col offset-s2 s8 validate" type="password" placeholder="Password" onChange={this.passChange}/>
                    </div>
                    <div className="row">
                        <input className="col offset-s2 s8 validate" type="password" placeholder="Repeat Password"/>
                    </div>
                    <div className="row">
                        <input className="col offset-s2 s8 validate" type="text" placeholder="Place" onChange={this.placeChange}/>
                    </div>
                    <div className="row">
                        <input className="col offset-s2 s8 validate" type="text" placeholder="Blood type" onChange={this.bloodChange}/>
                    </div>
                    <div className="row">
                        <button className="col offset-s4 s4 btn btn-large red accent-4" onClick={this.submit}>Register</button>
                    </div>
                </form>
                <br/>
            </div>
        );
    }


}

export default RegisterDash;
