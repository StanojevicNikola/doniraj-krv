import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from 'axios';
import logo from "../img/blood-donation.png";
import {connect} from "react-redux";
import {deleteToken} from "../actions";
import {Button, Navbar, Nav, Container} from "react-bootstrap";


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.logoutMe = this.logoutMe.bind(this);
    }


    logoutMe() {
        this.props.deleteToken();
        delete axios.defaults.headers.common['authorization'];
    }

        render(){
            return(
                <>
                    <Navbar className="text-light bg-dark">
                        <Container>
                            <Navbar.Brand>
                                <img
                                    className="img-logo responsive-img logo"
                                     src={logo}
                                     alt="Logo"
                                />
                            </Navbar.Brand>
                            <Nav className="mr-auto d-flex justify-content-around">
                                <Link to="/" style={{color:'white', 'marginRight': '10px'}}>Naslovna</Link>{' '}
                                {this.props.token ? <Link to='/dashboard' style={{color:'white'}}>Korisnički panel</Link> : ''}
                            </Nav>
                            <Nav className="d-flex justify-content-around">
                                {this.props.isAdmin ? <Link to='/admindash' style={{color:'white', 'marginRight': '10px'}}>Admin panel</Link> : ""}
                                <Link to='/about' style={{color:'white', 'marginRight': '10px'}}>O nama</Link>
                            </Nav>
                            <Nav className="d-flex justify-content-around">
                                <Nav.Item>
                                    {
                                        this.props.token ?
                                        <Link to='/' style={{color:'white'}}>
                                            <Button variant="danger" onClick={this.logoutMe}>
                                                Izloguj se
                                            </Button>
                                        </Link>
                                        :
                                        <Link to="/login" style={{color:'white'}}>
                                            <Button variant="danger">
                                                Uloguj se
                                            </Button>
                                        </Link>
                                    }
                                </Nav.Item>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            );
        }

}

const mapStateToProps = state => {
    return {
        token: state.token,
        isAdmin: state.isAdmin
    }
};

function mapDispatchToProps(dispatch){
    return {
        deleteToken: data => dispatch(deleteToken(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
