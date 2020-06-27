import React, { Component } from 'react';
import {connect} from "react-redux";

import {Button, Modal, FormControl, FormLabel, FormGroup, Tab, Nav, Row, Form, Card, Accordion} from "react-bootstrap";


class UserInfoDash extends Component{


    render(){
        return(
            <Card>
                <Card.Body>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Ime i prezime:</Form.Label>
                        <Form.Control className="text-center" disabled={true} value={this.props.name} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Korisnicko ime:</Form.Label>
                        <Form.Control className="text-center" disabled={true} value={this.props.username} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control className="text-center" disabled={true} value={this.props.email} />
                    </Form.Group>
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
        username: state.username
    }
};

export default connect(mapStateToProps, {})(UserInfoDash);
