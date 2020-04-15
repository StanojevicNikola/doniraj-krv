import React, { Component } from "react";

import { Link } from "react-router-dom";

import logo from "../img/blood-donation.png";
import {connect} from "react-redux";
import {deleteToken} from "../actions";
import {Form, Button, Navbar, Nav, FormControl, Container} from "react-bootstrap";


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.logoutMe = this.logoutMe.bind(this);
    }


    logoutMe() {
        this.props.deleteToken();
    }

        render(){
            return(
                <>
                    <Navbar bg="dark" variant="dark" className="">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    className="img-logo responsive-img logo"
                                     src={logo}
                                     alt="Logo"
                                />
                            </Navbar.Brand>
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            </Nav>
                            <Nav className="justify-content-end">
                                <Nav.Link href='/admindash'>Admin</Nav.Link>
                                <Nav.Link href='/about'>About</Nav.Link>
                            </Nav>
                            <Nav className="justify-content-end">
                                <Nav.Item>
                                    {this.props.token ?  <Button variant="outline-danger" onClick={this.logoutMe}><Nav.Link href="/">Logout</Nav.Link></Button> : <Button variant="danger"><Nav.Link href="/login">Login</Nav.Link></Button> }
                                </Nav.Item>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            );
        }

    // render() {
    //     return (
    //         <nav className=" red accent-4">
    //             <div className="container nav-wrapper">
    //                 <ul>
    //                     <li>
    //                         <Link to="/">
    //                             <img
    //                                 className="img-logo responsive-img logo"
    //                                 src={logo}
    //                                 alt="Logo"
    //                             />
    //                         </Link>
    //                     </li>
    //                     <li>
    //                         <Link to="/">Home</Link>
    //                     </li>
    //
    //                     <li>
    //                         <Link to="/dashboard">Dashboard</Link>
    //                     </li>
    //
    //                     <li className="right">
    //                         <Link to='/admindash'>Admin</Link>
    //                     </li>
    //
    //                     <li className="right">
    //                         <Link to="/about">About</Link>
    //                     </li>
    //                     <li className="right">
    //                         {this.props.token ?  <div onClick={this.logoutMe}><Link to="/">Logout</Link></div> : <Link to="/login">Login</Link> }
    //                     </li>
    //                 </ul>
    //             </div>
    //         </nav>
    //     );
    // }
}

const mapStateToProps = state => {
    return { token: state.token }
};

function mapDispatchToProps(dispatch){
    return {
        deleteToken: data => dispatch(deleteToken(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);