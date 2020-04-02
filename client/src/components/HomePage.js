import React, { Component } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="center ">
                    <h3>Start helping as</h3>
                </div>

                <div className="main-wrapper">

                    <section className="donor">
                        <Link to={this.props.token ? '/donor' : '/login'}>
                            <div>
                                <span>Donor</span>
                            </div>
                        </Link>
                    </section>


                    <section className="coordinator">
                        <Link to={this.props.token ? '/coordinator' : '/login'}>
                            <div>
                                <span>Coordinator</span>
                            </div>
                        </Link>
                    </section>


                    <div className="box">
                        <span/>
                        <span/>
                        <span/>
                    </div>
                </div>

                <div className="line divider" />

                <div className="">
                    <div className="center">
                        <h3>How to prepare</h3>
                    </div>
                    <div className="row center">
                        <div className="col s4">
                            <div className="btn-floating btn-large waves-effect waves-light red">
                                +
                            </div>
                            <h5>Donation Process</h5>
                        </div>
                        <div className="col s4">
                            <div className="btn-floating btn-large waves-effect waves-light red">
                                +
                            </div>
                            <h5>Check Eligibility</h5>
                        </div>
                        <div className="col s4">
                            <div className="btn-floating btn-large waves-effect waves-light red">
                                +
                            </div>
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

                                <div className="card-content">
                                    <p>
                                        I am a very simple card. I am good at
                                        containing small bits of information. I
                                        am convenient because I require little
                                        markup to use effectively.
                                    </p>
                                </div>
                                <div className="card-action">
                                    <div >This is a link</div>
                                </div>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="card">

                                <div className="card-content">
                                    <p>
                                        I am a very simple card. I am good at
                                        containing small bits of information. I
                                        am convenient because I require little
                                        markup to use effectively.
                                    </p>
                                </div>
                                <div className="card-action">
                                    <div >This is a link</div>
                                </div>
                            </div>
                        </div>
                        <div className="col s4">
                            <div className="card">

                                <div className="card-content">
                                    <p>
                                        I am a very simple card. I am good at
                                        containing small bits of information. I
                                        am convenient because I require little
                                        markup to use effectively.
                                    </p>
                                </div>
                                <div className="card-action">
                                    <div >This is a link</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { token: state.token }
};

export default connect(mapStateToProps, {})(HomePage);
