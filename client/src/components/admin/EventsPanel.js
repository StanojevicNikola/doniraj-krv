import React, {Component, useState} from 'react';
import DatePicker from "react-datepicker";

import {Button, Modal, FormControl, FormLabel, FormGroup, Tab, Nav, Row, Form, Card, Accordion} from "react-bootstrap";
import axios from 'axios';
import {connect} from "react-redux";

import {setBlood, setEvents, setNews, setPlaces, setHospitals} from "../../actions";


class CreateNewForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            selectedDate: new Date()
        };

        this.sendEvent = this.sendEvent.bind(this);
        this.validate = this.validate.bind(this);
        this.handleDate = this.handleDate.bind(this);

        this.titlRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.hourRef = React.createRef();
    }

    handleDate(date ) {
        this.setState({selectedDate: date});
    }

    validate(title, description){

        let errors = {};
        let clear = {};

        if(title === undefined || title === '')
            errors["title"] = 'Required field!';
        else{
            errors["title"] = '';
            clear["title"] = true;
        }

        if(description === undefined || description === '')
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


    async sendEvent(e) {

        e.preventDefault();
        const title = e.target.form.exampleFormControlInput1.value;
        const description = e.target.form.exampleFormControlTextarea1.value;
        const date = this.state.selectedDate;
        const hour = e.target.form.exampleFormControlInput3.value;
        const location = e.target.form.exampleFormControlInput4.value;

        const body = {
            title: title,
            description: description,
            date : date,
            hour: hour,
            geolocation: location
        }

        console.log(body)

        console.log(`Created News with: ${title}, ${description}`);

        if(this.validate(title, description)){
            try {
                const res = await axios.post('/admin/createEvent', body);
                alert("Uspesno dodato!")
                this.titlRef.current.value = "";
                this.descriptionRef.current.value = "";
                this.hourRef.current.value = "";

                this.setState({selectedDate: new Date()});
                this.props.functionReload();
            } catch(err) {
                console.log(err.response)
                alert(err.response.data.message)
            };
        }

    }


    render(){
        return(
            <Form className="text-left">
                <Form.Group controlId="exampleFormControlInput1">
                    <Form.Label>Naslov</Form.Label>
                    <Form.Control ref={this.titlRef} type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlTextarea1">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control ref={this.descriptionRef} as="textarea" rows="3" />
                    <span style={{color: "red"}}>{this.state.errors.description}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlInput2">
                    <Form.Label>Datum</Form.Label>
                    <div className="customDatePickerWidth">
                        <DatePicker
                            className="form-control"
                            selected={this.state.selectedDate}
                            onChange={this.handleDate}
                        /> 
                         
                    </div>
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlInput3">
                    <Form.Label>Satnica</Form.Label>
                    <Form.Control ref={this.hourRef} type="text" />
                    <span style={{color: "red"}}>{this.state.errors.title}</span>
                </Form.Group>
                <Form.Group controlId="exampleFormControlInput4">
                    <Form.Label>Lokacija</Form.Label>
                    <Form.Control as="select">
                        {this.props.places.map((e, i) => {
                            console.log(e)
                            return (
                                <option key={i} value={e['_id']}>
                                    {e.city}
                                </option>
                            )
                        })}
                    </Form.Control>
                    
                </Form.Group>
                <Button variant="outline-secondary" type="submit" onClick={this.sendEvent}>
                    Napravi
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
        try {
            const res = axios.post('/admin/updateNews', {
                title: newTitle,
                description: newDescription,
                date: new Date()
            });

            this.setState({ show: false });
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }



    render() {

        return (
            <div className="text-left">

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

        this.loadEvents = this.loadEvents.bind(this);
    }

    async componentDidMount() {
        this.loadEvents()
    }

    async loadEvents() {
        try {
            const resEvents = await axios.get('/app/getEvents');
            console.log(resEvents.data)
            this.props.setEvents({events: resEvents.data.data});
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };
    }

    renderEvents(){

        const cards = this.props.events.map( (article, index)=> {
            return (
                <Card key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={index}>
                        {article.title}
                        <span className="text-right">
                            {article.geolocation.city}
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
                    <Nav variant="pills" className="justify-content-around">
                        <Nav.Item >
                            <Nav.Link className="btn btn-outline-danger" eventKey="first">Izlistaj događaje</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link className="btn btn-outline-danger" eventKey="second">Dodaj novi događaj</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <br/>
                    <Row sm={1}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {this.renderEvents()}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <CreateNewForm places={this.props.places} functionReload={this.loadEvents}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places,
        events: state.events
    }
};

function mapDispatchToProps(dispatch){
    return {
        setEvents: data => dispatch(setEvents(data)),
        setPlaces: data => dispatch(setPlaces(data)),
        setBlood: data => dispatch(setBlood(data)),
        setNews: data => dispatch(setNews(data)),
        setHospitals: data => dispatch(setHospitals(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPanel);
