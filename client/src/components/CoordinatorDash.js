import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import {connect} from "react-redux";
import {Button, Form, Card} from "react-bootstrap";

class CoordinatorDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedDis: 0,
            selectedCity: this.props.places[0]['city'],
            selectedBloodGroup: this.props.blood[0]['groupType'],
            selectedHospital: [],
        };

        this.handleDis = this.handleDis.bind(this);
        this.handleBloodType = this.handleBloodType.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.onRemoveHospital = this.onRemoveHospital.bind(this);
        this.onSelectHospital = this.onSelectHospital.bind(this);


        this.notify = this.notify.bind(this)
    }

    handleDis(event) {
        this.setState({selectedDis: event.target.value});
    }

    handleBloodType(event) {
        this.setState({selectedBloodGroup: event.target.value});
    }

    handleCity(event) {
        this.setState({selectedCity: event.target.value});
    }


    onSelectHospital(selectedList, selectedItem) {
        this.setState({selectedHospital: [...selectedList]});
    }

    onRemoveHospital(selectedList, removedItem) {
        this.setState({selectedHospital: [...selectedList]});
    }

    async notify(e) {
        e.preventDefault();
        console.log("USAO")
        console.log(this.props.token)
        let body = {
            city: e.target.form.place1.value,
            places: this.state.selectedHospital.map( e => e['_id']),
            radius: e.target.form.radius.value,
            queryType: 'COMPATIBLE',
            groups: [e.target.form.blood1.value]
        };
        console.log(body)
        try {
            const resNotify = await axios.post('/recipient/requestBlood', body);
            console.log(resNotify.data);

            alert("Zahtev poslat")
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };

    }


    render() {
        return (

            <Card>
                <Card.Body>
                    <Card.Text>
                        
                    </Card.Text>
                    <Form>
                        <Form.Group controlId="blood1">
                            <Form.Label>Krvna grupa koju trazite:</Form.Label>
                            <Form.Control as="select">
                                {this.props.blood.map((e, i) => {
                                    console.log(e)
                                    return (
                                        <option key={i} value={e['groupType']}>
                                            {e['groupType']}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="place1">
                            <Form.Label>Lokacija gde je pacijent:</Form.Label>
                            <Form.Control as="select">
                                {this.props.places.map((e, i) => {
                                    console.log(e)
                                    return (
                                        <option key={i} value={e['city']}>
                                            {e['city']}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bolnice gde mogu da doniraju:</Form.Label>
                            <Multiselect
                                options={this.props.hospitals} // Options to display in the dropdown
                                selectedValues={this.state.selectedHospital} // Preselected value to persist in dropdown
                                onSelect={this.onSelectHospital} // Function will trigger on select event
                                onRemove={this.onRemoveHospital} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                            />
                        </Form.Group>
                        <Form.Group controlId="radius">
                            <Form.Label>Obavesti donore u krugu od:</Form.Label>
                            <Form.Control as="select">
                                <option value={50}>50km</option>
                                <option value={100}>100km</option>
                                <option value={250}>250km</option>
                                <option value={500}>500km</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="outline-dark" type="submit" onClick={this.notify}>
                                Obavesti!
                            </Button>
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
        coordinator: state.coordinator,
        places: state.places,
        blood: state.blood,
        hospitals: state.hospitals
    }
};

export default connect(mapStateToProps, {}) (CoordinatorDash);
