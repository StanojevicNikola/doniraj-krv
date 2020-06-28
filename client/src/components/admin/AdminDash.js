import React, { Component } from 'react';
import NewsPanel_v2 from './NewsPanel_v2';
import EventsPanel from './EventsPanel';
import LocationDash from './LocationDash';
import {Row, Tab, Col, Nav} from 'react-bootstrap';
import { connect } from 'react-redux';

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
            <div className="container">
            <Tab.Container defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item >
                                <Nav.Link className="btn btn-outline-dark" eventKey="first">Novosti</Nav.Link>
                            </Nav.Item>
                            <br/>
                            <Nav.Item>
                                <Nav.Link className="btn btn-outline-dark" eventKey="second">Događaji</Nav.Link>
                            </Nav.Item>
                            <br/>
                            <Nav.Item>
                                <Nav.Link className="btn btn-outline-dark" eventKey="third">Bolnice</Nav.Link>
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
                            <Tab.Pane unmountOnExit={true} eventKey="third">
                                <LocationDash/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </div>

        );
    }

    render(){
        const admin = this.props.isAdmin;
        return(
            
        <div>{admin ?  this.renderCollections() : <div>Morate da se ulogujete ko administrator</div> }</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        isAdmin: state.isAdmin
    }
};

export default connect(mapStateToProps, {})(AdminDash);
