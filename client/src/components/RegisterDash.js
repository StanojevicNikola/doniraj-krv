import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {Button} from "react-bootstrap";
//

class RegisterDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            username : '',
            email : '',
            pass : '',
            passRepeat: '',

        };
        this.nameChange = this.nameChange.bind(this);
        this.userChange = this.userChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passChange = this.passChange.bind(this);
        this.passRepeatChange = this.passRepeatChange.bind(this);

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
        this.setState({
            pass: e.target.value
        })
    }

    passRepeatChange(e) {
        console.log(e.target.value)
        this.setState({
            passRepeat: e.target.value
        })
    }

    async submit() {
        if(this.state.pass !== this.state.passRepeat)
            alert('Pass repeat didn\'t match');
        else {
            const body = {
                "email": this.state.email,
                "username": this.state.username,
                "password": this.state.pass,
                "name": this.state.name
            };
            const res = await axios.post('/users/register', body);

            console.log(res);
        }
    }

    render() {
        return (
            <div>
                <br/>
                <form className="register-form">
                    <div>
                        <input type="text" placeholder="Name" onChange={this.nameChange}/>
                    </div>
                    <div>
                        <input type="text" placeholder="Username" onChange={this.userChange}/>
                    </div>
                    <div>
                        <input type="email" placeholder="Email" onChange={this.emailChange}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" onChange={this.passChange}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Repeat Password" onChange={this.passRepeatChange}/>
                    </div>

                    <div>
                        <Button onClick={this.submit}>Register</Button>
                    </div>
                </form>
                <br/>
            </div>
        );
    }


}

export default RegisterDash;
