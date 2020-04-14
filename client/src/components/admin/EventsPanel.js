import React, {Component, useState} from 'react';
import {Button, Modal, FormControl, FormLabel, FormGroup, Tab, Nav, Row, Form, Card, Accordion} from "react-bootstrap";
import axios from 'axios';

const fakeEvents = [
    {
        title: 'Event #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '24.5.2012',
        hour: '15',
        geolocation: 'Beograd'
    },
    {
        title: 'Event #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: '26.07.1984',
        hour: '10',
        geolocation: 'Nis'
    }
];

class CreateNewForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };

        this.sendEvent = this.sendEvent.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(title, description){

        let errors = {};
        let clear = {};

        if(title == undefined || title === '')
            errors["title"] = 'Required field!';
        else{
            errors["title"] = '';
            clear["title"] = true;
        }

        if(description == undefined || description === '')
            errors["description"] = 'Required field!';
        else{
            errors["description"] = '';
            clear["description"] = true;
        }

        this.setState({
            errors: errors
        });

        return clear["title"] && clear["description"];
    }

    clearFealds(event){

        event.target.form.exampleFormControlInput1.value = '';
        event.target.form.exampleFormControlTextarea1.value = '';
    }

    sendEvent(e) {

        e.preventDefault();
        const title = e.target.form.exampleFormControlInput1.value;
        const description = e.target.form.exampleFormControlTextarea1.value;

        console.log(`Created News with: ${title}, ${description}`);

        if(this.validate(title, description)){

            const res = axios.post('/admin/createNews', {
                title,
                description,
                date: new Date()
            });

            this.clearFealds(e);
        }

    }


    render(){
        return(
            <Form>
                <Form.Group controlId="exampleFormControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                    <span style={{color: "red"}}>{this.state.errors.description}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlInput2">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlInput3">
                    <Form.Label>Hour</Form.Label>
                    <Form.Control type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlInput4">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.sendEvent}>
                    Create
                </Button>
            </Form>
        );
    }

}

class Example extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            title: props.title,
            description: props.description,
            date: props.date,
            hour: props.hour,
            geolocation: props.geolocation,
            show: false,
            formIsValid: 'error'
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSave(e){
        const newTitle = e.target.form.edit_title.value;
        const newDescription = e.target.form.edit_description.value;

        console.log(`Updated News with: ${newTitle}, ${newDescription}`);

        const res = axios.post('/admin/updateNews', {
            title: newTitle,
            description: newDescription,
            date: new Date()
        });

        this.setState({ show: false });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }



    render() {

        return (
            <div>
                {/*<Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>*/}
                {/*    Edit*/}
                {/*</Button>*/}

                <Modal
                    {...this.props}
                    bsSize="large"
                    aria-labelledby="contained-modal-title-lg"
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    <form>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">
                                <FormGroup controlId="edit_title" validationState={this.state.formIsValid}>
                                    <FormLabel>Change title</FormLabel>
                                    <FormControl
                                        type="text"
                                        componentClass="input"
                                        defaultValue={this.state.title}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup>
                                <FormLabel>Change description</FormLabel>
                                <FormControl
                                    id="edit_description"
                                    as="textarea"
                                    componentClass="textarea"
                                    defaultValue={this.state.description}
                                />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Discard</Button>
                            <Button onClick={this.handleSave}>Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}


class EventsPanel extends Component{

    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
        this.renderEvents = this.renderEvents.bind(this);
    }

    componentDidMount() {
        this.setState({
            events: fakeEvents
        });
    }

    renderEvents(){

        const cards = this.state.events.map( (article, index)=> {
            return (
                <Card key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={index}>
                        {article.title}
                        <span className="right">
                            {article.geolocation}
                        </span>
                        <div style={{fontStyle: 'italic', fontSize: '12px'}}>
                            {article.date}
                            {article.hour}h
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                            {article.description}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        });
        return (
            <Accordion defaultActiveKey="0">
                {cards}
            </Accordion>
        );
    }


    render(){
        return(
            <div>
                <Tab.Container id="leftTabsExample">
                    <Nav variant="pills" className="">
                        <Nav.Item >
                            <Nav.Link eventKey="first">View old</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link eventKey="second">Create new</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Row sm={1}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {this.renderEvents()}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <CreateNewForm />
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default EventsPanel;
