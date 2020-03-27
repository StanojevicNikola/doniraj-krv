import React, { Component } from "react";

import { Link } from "react-router-dom";

import logo from "../img/blood-donation.png";

class NavBar extends Component {
    render() {
        return (
            <nav className=" red accent-4">
                <div className="container nav-wrapper">
                    <ul>
                        <li>
                            <Link to="/">
                                <img
                                    className="img-logo responsive-img logo"
                                    src={logo}
                                    alt="Logo"
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="right">
                            <Link to="/about">About</Link>
                        </li>
                        <li className="right">
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;
