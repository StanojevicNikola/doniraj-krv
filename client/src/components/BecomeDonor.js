import React, { Component } from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import {setDonor, setOnlyToken} from "../actions";
import DatePicker from "react-datepicker";

import { Button, Form, Card } from "react-bootstrap";



class BecomeDonor extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            bloodGroups: [],
            selectedDate: new Date()
        };

        
        this.addDonor = this.addDonor.bind(this)
        this.handleDate = this.handleDate.bind(this);
    }


    handleDate(date ) {
        this.setState({selectedDate: date});
    }

    async addDonor(e) {
        e.preventDefault();
        const blood = e.target.form.blood.value;
        const place = e.target.form.place.value;
        

        const role = 'DONOR';
        const roleData = {
            blood: blood,
            geolocation: place,
            lastDonation: this.state.selectedDate
        };
        try {
            let resToken = await axios.post('/user/addRole', {role, roleData});
            console.log(resToken)
            axios.defaults.headers.common = {'authorization': `Bearer ${resToken.data.data.token}`};
            this.props.setOnlyToken({token: resToken.data.data.token});

            let resUser = await axios.post('/user/data');
            this.props.setDonor({donor: resUser.data.data.donor});
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };

    }

    render(){
        return(

            <Card>
                <Card.Body>
                    <Card.Text>
                        Da bi ste postali donor bitne su nam informacije 
                        vase lokacije i poslednjeg davanja krvi kako bi 
                        vas pravovremeno obavestili o potencijalnim pacijentima.
                        Sve informacije ostaju privatne!
                    </Card.Text>
                    <Form>
                        <Form.Group controlId="blood">
                            <Form.Label>Krvna grupa:</Form.Label>
                            <Form.Control as="select">
                                {this.props.blood.map((e, i) => {
                                    console.log(e)
                                    return (
                                        <option key={i} value={e['_id']}>
                                            {e['groupType']}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="place">
                            <Form.Label>Lokacija:</Form.Label>
                            <Form.Control as="select">
                                {this.props.places.map((e, i) => {
                                    console.log(e)
                                    return (
                                        <option key={i} value={e['_id']}>
                                            {e['city']}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Datum poslednjeg davanja krvi:</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={this.state.selectedDate}
                                onChange={this.handleDate}
                            />
                            
                        </Form.Group>
                        <Form.Group>
                            <Button variant="outline-dark" type="submit" onClick={this.addDonor}>
                                Postani donor!
                            </Button>
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
        places: state.places,
        blood: state.blood
    }
};

function mapDispatchToProps(dispatch){
    return {
        setOnlyToken: data => dispatch(setOnlyToken(data)),
        setDonor: data => dispatch(setDonor(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BecomeDonor);
