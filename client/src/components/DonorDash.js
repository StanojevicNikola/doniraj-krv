import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Mapa from './map/Mapa'
import {Button, Modal, FormControl, FormLabel, FormGroup, Tab, Nav, Row, Form, Card, Accordion} from "react-bootstrap";

class DonorDash extends Component{

    constructor(props) {
        super(props);

        this.state = {
            places: null
        };

        this.findGeo = this.findGeo.bind(this);
    }

    componentDidMount() {
        this.setState({
            places: []
        })
    }


    async findGeo(e) {
        e.preventDefault();
        const radius = e.target.form.radius.value;
        console.log(this.state)
        try {
            let resGeo = await axios.post('/donor/findPlaces', {
                query: {  },
                constraint: { distance: radius }
            });
        
            console.log(resGeo.data);
            this.setState({
                places: resGeo.data.data
            })
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };
    }

    render() {
        return (
                <Card>
                <Card.Body>
                    <Card.Title>
                        Vase informacije:
                    </Card.Title>
                    <Form>
                        <Form.Group controlId="blood">
                            <Form.Label>Krvna grupa:</Form.Label>
                            <Form.Control disabled={true} value={this.props.donor['blood'] ? this.props.donor['blood']['groupType'] : "Prvo moras postati donor"}/>
                        </Form.Group>
                        <Form.Group controlId="place">
                            <Form.Label>Lokacija:</Form.Label>
                            <Form.Control disabled={true} value={this.props.donor['geolocation'] ? this.props.donor['geolocation']['city'] : "Prvo moras postati donor"}/>
                        </Form.Group>

                        <Form.Group controlId="radius">
                            <Form.Label>Nadji najbliza mesta za doniranje u krugu od:</Form.Label>
                            <Form.Control as="select">
                                <option value={50}>50km</option>
                                <option value={100}>100km</option>
                                <option value={250}>250km</option>
                                <option value={500}>500km</option>
                            </Form.Control>
                        </Form.Group>
                       <Form.Group>
                            <Button variant="outline-dark" type="submit" onClick={this.findGeo}>
                               Nadji
                            </Button>
                       </Form.Group>
                       <Form.Group>
                            <Mapa cluster={true} data={this.state.places}/>
                       </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        );
    }


}

const mapStateToProps = state => {
    return {
        token: state.token,
        donor: state.donor,
    }
};

export default connect(mapStateToProps, {})(DonorDash);
