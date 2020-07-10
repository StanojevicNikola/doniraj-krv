import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Mapa from './map/Mapa'
import {Button, Form, Card } from "react-bootstrap";
import { setDonor } from '../actions/index';
import DatePicker from "react-datepicker";


class DonorDash extends Component{

    constructor(props) {
        super(props);

        this.state = {
            places: null,
            selectedDate: new Date(this.props.donor.lastDonation),
            editDate: false
        };

        this.findGeo = this.findGeo.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.editDateBool = this.editDateBool.bind(this);
        this.saveDate = this.saveDate.bind(this);
    }

    componentDidMount() {
        this.setState({
            places: []
        })
    }

    handleDate(date ) {
        this.setState({selectedDate: date});
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

    editDateBool() {
        this.setState({editDate: true})
    }

    async saveDate() {
        try{

            let resDateSave = await axios.post('/donor/updateDonation', { lastDonation: this.state.selectedDate })
            console.log(resDateSave);
            let resUser = await axios.post('/user/data');
            console.log(resUser.data.data.donor)
            await this.props.setDonor({donor: resUser.data.data.donor})
            this.setState({editDate: false})
            alert("Uspešno ste sačuvali datum")
        } catch(err) {
            console.log(err);
            alert(err.response.data.message)
        }
    }

    render() {
        console.log(this.props.donor)
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
                        <Form.Group>
                            <Form.Label>Datum poslednjeg davanja krvi:</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={this.state.selectedDate}
                                onChange={this.handleDate}
                                disabled={!this.state.editDate}
                                maxDate={new Date()}
                            />
                            <br/>
                            <Button variant="outline-dark" disabled={this.state.editDate} onClick={this.editDateBool}>
                               Izmeni datum
                            </Button>
                            <Button variant="outline-dark" disabled={!this.state.editDate} onClick={this.saveDate}>
                               Sačuvaj datum
                            </Button>
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

function mapDispatchToProps(dispatch){
    return {
        setDonor: data => dispatch(setDonor(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorDash);
