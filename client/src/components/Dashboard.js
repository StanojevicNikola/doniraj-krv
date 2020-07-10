import React, { Component } from 'react';
import DonorDash from "./DonorDash";
import CoordinatorDash from "./CoordinatorDash";
import UserInfoDash from "./UserInfoDash";
import {Row, Tab, Col, Nav, Button} from 'react-bootstrap';
import {connect} from "react-redux";
import BecomeCoordinator from "./BecomeCoordinator";
import BecomeDonor from "./BecomeDonor";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            propertySelected: 0
        };

        this.renderCollections = this.renderCollections.bind(this);
        
    }


    renderCollections(){
        return(
            <div className="container">
            <Tab.Container defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item >
                                <Nav.Link className="btn btn-outline-dark" eventKey="1">Profil</Nav.Link>
                            </Nav.Item>
                            <br/>
                            <Nav.Item>
                                <Nav.Link disabled={!this.props.donor} className="btn btn-outline-dark" eventKey="2">Donor</Nav.Link>
                            </Nav.Item>
                            <br/>
                            <Nav.Item>
                                <Nav.Link disabled={!this.props.coordinator} className="btn btn-outline-dark" eventKey="3">Koordinator</Nav.Link>
                            </Nav.Item>
                            <br/>
                            <Nav.Item>
                                <Nav.Link disabled={this.props.donor} className="btn btn-outline-dark" eventKey="4">Postani donor</Nav.Link>
                            </Nav.Item>
                            <br/>
                            <Nav.Item>
                                <Nav.Link disabled={this.props.coordinator} className="btn btn-outline-dark" eventKey="5">Postani koordinator</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="1">
                                <UserInfoDash />
                            </Tab.Pane>
                            <Tab.Pane unmountOnExit={true} eventKey="2">
                                <DonorDash />
                            </Tab.Pane>
                            <Tab.Pane eventKey="3">
                                <CoordinatorDash />
                            </Tab.Pane>
                            <Tab.Pane eventKey="4">
                                <BecomeDonor/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="5">
                                <BecomeCoordinator/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </div>



        );
    }


    hasToken() {
        return (
            <div className="container">
            
                    {this.renderCollections()}
                
            </div>
        );
    }

    render() {
        console.log(this.props.token)
        return (
          <div className="" >
              {this.props.token ? this.hasToken() : <div className="container">Morate da se ulogujete</div>}
          </div>
        );
    }



}

const mapStateToProps = state => {
    return {
        token: state.token,
        donor: state.donor,
        coordinator: state.coordinator
    }
};

export default connect(mapStateToProps, {})(Dashboard);
