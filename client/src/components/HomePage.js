import React, { Component } from "react";

import logo from "./logo.png";

class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="center ">
                    <h3>Start helping as</h3>
                </div>

                <div className="main-wrapper">
                    <section className="donor">
                        <a href="#">
                            <span>Donor</span>
                        </a>
                    </section>

                    <section className="coordinator">
                        <a href="#">
                            <span>Coordinator</span>
                        </a>
                    </section>

                    <div className="box">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className="line divider" />

                <div className="">
                    <div className="center">
                        <h3>How to prepare</h3>
                    </div>
                    <div className="row center">
                        <div className="col s4">
                            <a className="btn-floating btn-large waves-effect waves-light red">
                                +
                            </a>
                            <h5>Donation Process</h5>
                        </div>
                        <div className="col s4">
                            <a className="btn-floating btn-large waves-effect waves-light red">
                                +
                            </a>
                            <h5>Check Eligibility</h5>
                        </div>
                        <div className="col s4">
                            <a className="btn-floating btn-large waves-effect waves-light red">
                                +
                            </a>
                            <h5>Donation Types</h5>
                        </div>
                    </div>
                </div>
                <div className="line divider" />

                <div className="">
                    <div className="center">
                        <h3>Upcoming events:</h3>
                    </div>
                    <div className="row center">
                        <div className="col s4">
                            <div className="card">
                                <div className="card-image">
                                    <img
                                        className="img-logo responsive-img"
                                        src={logo}
                                        alt="Logo"
                                    />
                                    <span className="card-title">
                                        Card Title
                                    </span>
                                </div>
                                <div className="card-content">
                                    <p>
                                        I am a very simple card. I am good at
                                        containing small bits of information. I
                                        am convenient because I require little
                                        markup to use effectively.
                                    </p>
                                </div>
                                <div className="card-action">
                                    <a href="#">This is a link</a>
                                </div>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="card">
                                <div className="card-image">
                                    <img
                                        className="img-logo responsive-img"
                                        src={logo}
                                        alt="Logo"
                                    />
                                    <span className="card-title">
                                        Card Title
                                    </span>
                                </div>
                                <div className="card-content">
                                    <p>
                                        I am a very simple card. I am good at
                                        containing small bits of information. I
                                        am convenient because I require little
                                        markup to use effectively.
                                    </p>
                                </div>
                                <div className="card-action">
                                    <a href="#">This is a link</a>
                                </div>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="card">
                                <div className="card-image">
                                    <img
                                        className="img-logo responsive-img"
                                        src={logo}
                                        alt="Logo"
                                    />
                                    <span className="card-title">
                                        Card Title
                                    </span>
                                </div>
                                <div className="card-content">
                                    <p>
                                        I am a very simple card. I am good at
                                        containing small bits of information. I
                                        am convenient because I require little
                                        markup to use effectively.
                                    </p>
                                </div>
                                <div className="card-action">
                                    <a href="#">This is a link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;