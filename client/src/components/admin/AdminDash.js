import React, { Component } from 'react';
import NewsPanel_v2 from './NewsPanel_v2';
import EventsPanel from './EventsPanel';
import {Row, Tab, Col, Nav} from "react-bootstrap";
import Mapa from "../map/Mapa";

class AdminDash extends Component {

    constructor(props) {
        super(props);

        this.state = {
            propertySelected: 0
        };

        this.renderCollections = this.renderCollections.bind(this);
        // this.renderContent = this.renderContent.bind(this);
        this.showNewsPanel = this.showNewsPanel.bind(this);
        this.showEventsPanel = this.showEventsPanel.bind(this);
        this.showLocationsPanel = this.showLocationsPanel.bind(this);
    }


    showNewsPanel(){
        this.setState({
            propertySelected: 1
        });
    }
    showEventsPanel(){
        this.setState({
            propertySelected: 2
        });
    }

    showLocationsPanel(){
        this.setState({
            propertySelected: 3
        });
    }

    renderCollections(){
        return(


            <div className="dash col s2" >
                <button className= "btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                        style={{textAlign:'left'}}
                        onClick={this.showNewsPanel}>
                    News
                </button>
                <br />
                <button  className="btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                         style={{textAlign:'left'}}
                         onClick={this.showEventsPanel} >
                    Events
                </button>
                <br />
                <button className="btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                        style={{textAlign:'left'}}
                        onClick={this.showLocationsPanel}>
                    Locations
                </button>
            </div>


        );
    }

    render(){
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">News</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Events</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Locations</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <NewsPanel_v2 />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <EventsPanel />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Mapa />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

export default AdminDash;