import React, { Component } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import {Button, Container, Row, Col, Card} from "react-bootstrap";
import icon_1 from '../img/icon_1.jpg';
import icon_2 from '../img/icon_2.png';
import icon_3 from '../img/icon_3.png';

import axios from 'axios';
import {setBlood, setEvents, setNews, setPlaces, setHospitals} from "../actions";

const fakeEvent = {
    title: 'BRAVO',
    description: 'ovo je opis',
    date: '23.23.23012',
    hour: '15h',
    geolocation: 's223asd'
};


class EventCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: props.event.title,
            description: props.event.description,
            date: props.event.date,
            hour: props.event.hour,
            geolocation: props.event.geolocation
        }

    }

    render(){
        return(
            <Card style={{ width: '18rem', height: '15rem'}}>
                <Card.Body>
                    <Card.Title>
                        {this.state.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {this.state.date} at {this.state.hour}
                    </Card.Subtitle>
                    <br/>
                    <br/>
                    <Card.Text>
                        {this.state.description}
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        );
    }
}

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upcomingEvents: [1,2,3]
        }
    }

    async componentDidMount() {
        let resCities = await axios.get('/app/getCities');
        this.props.setPlaces({places: resCities.data.data});

        let resEvents = await axios.get('/app/getEvents');
        this.props.setEvents({events: resEvents.data.data});

        let resBlood = await axios.get('/app/getBloodGroups');
        this.props.setBlood({blood: resBlood.data.data});

        let resNews = await axios.get('/app/getNews');
        this.props.setNews({news: resNews.data.data});

        let resHospitals = await axios.get('/app/getPlaces');
        this.props.setHospitals({hospitals: resHospitals.data.data});

    }

    render() {
        // console.log(this.state.upcomingEvents[2].title);

        return (
            <div>
                <div className="landing-title">
                    <h2>Start helping as</h2>
                </div>

                <div className="main-wrapper">

                    <section className="donor">
                        <Link to={this.props.token ? '/dashboard' : '/login'}>
                            <div>
                                <span>Donor</span>
                            </div>
                        </Link>
                    </section>

                    <section className="coordinator">
                        <Link to={this.props.token ? '/dashboard' : '/login'}>
                            <div>
                                <span>Coordinator</span>
                            </div>
                        </Link>
                    </section>
                </div>

                <br/>
                <br/>

                <h2 className="landing-title">How to prepare</h2>
                <br />
                {/* How to prepare sekcija*/}
                <Container>
                    <Row>
                        <Col>
                            <Link to="/donationProcess">
                                <img src={icon_1} />
                            </Link>
                            <div>
                                <br />
                                <h4>
                                    Donation Process
                                </h4>
                                <h5 style={{fontWeight: 'bold'}}>
                                    Transform lives in just 10 easy steps.
                                </h5>
                            </div>
                        </Col>
                        <Col>
                            <Link to="/eligibility">
                                <img src={icon_2} />
                            </Link>
                            <div>
                                <br />
                                <h4>
                                    Check Eligibility
                                </h4>
                                <h5 style={{fontWeight: 'bold'}}>
                                    Review our eligibility requirements.
                                </h5>
                            </div>
                        </Col>
                        <Col>
                            <Link to="/donationTypes">
                                <img src={icon_3} />
                            </Link>
                                <div>
                                <br />
                                <h4>
                                    Donation Types
                                </h4>
                                <h5 style={{fontWeight: 'bold'}}>
                                    Discover how certain donations impact more lives.
                                </h5>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                </Container>

                <div className="">
                    <div className="landing-title">
                        <br />
                        <h2>Upcoming events</h2>
                        <br/>
                    </div>

                    <Container>
                        <Row>
                            <Col>
                                <EventCard
                                    event={fakeEvent}
                                />
                            </Col>
                            <Col>
                                <EventCard
                                    event={fakeEvent}
                                />
                            </Col>
                            <Col>
                                <EventCard
                                    event={fakeEvent}
                                />
                            </Col>
                        </Row>
                    </Container>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { token: state.token }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
