import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios'
import { Button, Form, Card } from "react-bootstrap";
import { setToken } from "../actions";

class UserInfoDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            updatable: false
        }
        this.editInfo = this.editInfo.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }

    editInfo() {
        this.setState({
            updatable: true
        })
        
    }

    async updateInfo(e) {
        e.preventDefault();
        const name = e.target.form.name.value;
        const username = e.target.form.username.value;
        const email = e.target.form.email.value

        console.log(username)
        console.log(name)
        console.log(email)

        try {
            let res = await axios.post('/user/updateUserData', {username: username, name: name, email: email});
            console.log(res)

            this.props.setToken({
                token: this.props.token,
                username: username,
                name: name,
                roles: this.props.roles,
                email: email,
                isAdmin: this.props.isAdmin,
                donor: this.props.donor,
                coordinator: this.props.coordinator
            });
            this.setState({updatable: false})
            alert("Uspešno ste sačuvali podatke")
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };

    }

    render(){
        return(
            <Card>
                <Card.Body>
                    <Form.Group>
                        <Button variant="outline-dark" disabled={this.state.updatable} onClick={this.editInfo}>Izmeni</Button>
                    </Form.Group>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Ime i prezime:</Form.Label>
                            <Form.Control type="text" className="text-center" disabled={!this.state.updatable} defaultValue={this.props.name} />
                        </Form.Group>

                        <Form.Group controlId="username">
                            <Form.Label>Korisnicko ime:</Form.Label>
                            <Form.Control className="text-center" disabled={!this.state.updatable} defaultValue={this.props.username} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control className="text-center" disabled={!this.state.updatable} defaultValue={this.props.email} />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="outline-dark" disabled={!this.state.updatable} type="submit" onClick={this.updateInfo}>Sačuvaj</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    };
}

const mapStateToProps = state => {
    return {
        token: state.token,
        name: state.name,
        email: state.email,
        username: state.username,
        roles: state.roles,
        isAdmin: state.isAdmin,
        donor: state.donor,
        coordinator: state.coordinator
    }
};

function mapDispatchToProps(dispatch){
    return {
        setToken: data => dispatch(setToken(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoDash);
