import React, { Component } from 'react';
import Mapa from '../map/Mapa';
import { connect } from 'react-redux';
import {Button, Modal, FormControl, FormLabel, FormGroup, Tab, Nav, Row, Form, Card, Accordion} from "react-bootstrap";
import axios from 'axios';
import {setBlood, setEvents, setNews, setPlaces, setHospitals} from "../../actions";

class LocationAddForm extends Component {
    constructor(props) {
        super(props);

        this.sendEvent = this.sendEvent.bind(this);

        this.hospitalRef = React.createRef();
        
        this.addressRef = React.createRef();
        
        this.workingRef = React.createRef();
    }

    async sendEvent(e) {

        e.preventDefault();
        const name = e.target.form.hospital.value;
        const address = e.target.form.address.value;
        const workingHours = e.target.form.workingHours.value;
        const location = e.target.form.city.value;

        const body = {
            name: name,
            address: address,
            workingHours: workingHours,
            geolocation: location
        }

        console.log(body)

        

        if(name !== '' && address !== '' && workingHours !== '' && location !== ''){
            try {
                const res = await axios.post('/admin/createPlace', body);
                alert("Uspesno dodato!")
                this.hospitalRef.current.value = "";
                this.addressRef.current.value = "";
                this.workingRef.current.value = "";


                this.props.functionReload();
            } catch(err) {
                console.log(err.response)
                alert(err.response.data.message)
            };
        }

    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="hospital">
                            <Form.Label>Ime bolnice:</Form.Label>
                            <Form.Control ref={this.hospitalRef} type="text" />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Adresa:</Form.Label>
                            <Form.Control ref={this.addressRef} type="text"/>
                        </Form.Group>
                        <Form.Group controlId="workingHours">
                            <Form.Label>Radno vreme:</Form.Label>
                            <Form.Control ref={this.workingRef} type="text" />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>Grad:</Form.Label>
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
                        <Form.Group >
                            <Button variant="outline-secondary" type="submit" onClick={this.sendEvent}>
                                Napravi
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

class LocationCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group >
                            <Form.Label>Ime:</Form.Label>
                            <Form.Control disabled={true} value={this.props.element.name}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Grad:</Form.Label>
                            <Form.Control disabled={true} value={this.props.element.geolocation.city}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Adresa:</Form.Label>
                            <Form.Control disabled={true} value={this.props.element.address}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Radno vreme:</Form.Label>
                            <Form.Control disabled={true} value={this.props.element.workingHours}/>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

class LocationDash extends Component{
    constructor(props) {
        super(props)

        this.loadHospitals = this.loadHospitals.bind(this)
    }

    async loadHospitals() {
        try {
            let resHospitals = await axios.get('/app/getPlaces');
            this.props.setHospitals({hospitals: resHospitals.data.data});
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };
    }

    render() {
        
        return (
            <div>
                <Tab.Container id="leftTabsExample">
                    <Nav variant="pills" className="justify-content-around">
                        <Nav.Item >
                            <Nav.Link className="btn btn-outline-danger" eventKey="first">Izlistaj bolnice</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link className="btn btn-outline-danger" eventKey="second">Dodaj novu bolnicu</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <br/>
                    <Row sm={1}>
                        <Tab.Content>
                            <Tab.Pane unmountOnExit={true} eventKey="first">
                                {this.props.hospitals.map((e, i) => {
                                    return (
                                        <div key={e._id}>
                                            <LocationCard element={e} />
                                            <br/>
                                        </div>
                                    )
                                })}
                            </Tab.Pane>
                            <Tab.Pane unmountOnExit={true} eventKey="second">
                                <LocationAddForm places={this.props.places} functionReload={this.loadHospitals}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        );
    }


}


const mapStateToProps = state => {
    return {
        hospitals: state.hospitals,
        places: state.places
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationDash);
