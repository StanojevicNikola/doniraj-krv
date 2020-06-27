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
import Mapa from './map/Mapa';

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
        let date = new Date(this.state.date)
        return(
            <Card style={{ width: '18rem', height: '15rem'}}>
                <Card.Body>
                    <Card.Title>
                        {this.state.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {date.getDay()+"."+date.getMonth()+"."+date.getFullYear()} {this.state.hour ? " u " + this.state.hour : ""}
                    </Card.Subtitle>
                    <br/>
                    <br/>
                    <Card.Text>
                        {this.state.description}
                    </Card.Text>
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
        try {
        let resCities = await axios.get('/app/getCities');
        console.log(resCities.data.data)
        this.props.setPlaces({places: resCities.data.data});

        let resEvents = await axios.get('/app/getEvents');
        this.props.setEvents({events: resEvents.data.data});

        let resBlood = await axios.get('/app/getBloodGroups');
        this.props.setBlood({blood: resBlood.data.data});

        let resNews = await axios.get('/app/getNews');
        this.props.setNews({news: resNews.data.data});

        let resHospitals = await axios.get('/app/getPlaces');
        this.props.setHospitals({hospitals: resHospitals.data.data});
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };

    }

    render() {
        // console.log(this.state.upcomingEvents[2].title);
        let events = this.props.events.slice(this.props.events.length-3,this.props.events.length);
        console.log(events)
        console.log(this.props.news)
        let news = this.props.news.slice(this.props.news.length-3,this.props.news.length);
        return (
            <div className="container">
                <div className="landing-title">
                    <h2>Počni da pomažeš kao:</h2>
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
                                <span>Koordinator</span>
                            </div>
                        </Link>
                    </section>
                </div>

                <br/>
                <br/>

                <h2 className="landing-title">Kako se pripremiti?</h2>
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
                                    Donatorski proces
                                </h4>
                                <h5 style={{fontWeight: 'bold'}}>
                                    Transformiši nečiji život u samo nekoliko koraka.
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
                                    Proveri podobnost
                                </h4>
                                <h5 style={{fontWeight: 'bold'}}>
                                    Proveri naše uslove da postaneš donor.
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
                                    Tipovi donacija
                                </h4>
                                <h5 style={{fontWeight: 'bold'}}>
                                   Proveri kako određena donacija može da utiče na nečiji život.
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
                        <h2>Budući događaji</h2>
                        <br/>
                    </div>

                    <Container>
                        <Row>
                            {events.length != 0 ?
                                events.map((e, i) => {
                                    return (
                                        <Col key={e._id}>
                                            <EventCard
                                                event={e}
                                            />
                                        </Col>
                                    )
                                })
                                :
                                "Nema događaja"
                            }
                        </Row>
                    </Container>

                </div>
                
                <div className="">
                    <div className="landing-title">
                        <br />
                        <h2>Novosti</h2>
                        <br/>
                    </div>

                    <Container>
                        <Row>
                            {news.length != 0 ?
                                news.map((e, i) => {
                                    return (
                                        <Col key={e._id}>
                                            <EventCard
                                                event={e}
                                            />
                                        </Col>
                                    )
                                })
                                :
                                "Nema novosti"
                            }
                        </Row>
                    </Container>

                </div>

                <div className="">
                    <div className="landing-title">
                        <br />
                        <h2>Mapa sa bolnicama u kojima možete donirati:</h2>
                        <br/>
                    </div>

                    <Mapa cluster={false} data={this.props.hospitals}/>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        token: state.token,
        events: state.events,
        news: state.news,
        hospitals: state.hospitals
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
