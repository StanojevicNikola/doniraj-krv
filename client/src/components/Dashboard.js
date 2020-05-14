import React, { Component } from 'react';
import DonorDash from "./DonorDash";
import CoordinatorDash from "./CoordinatorDash";
import UserInfoDash from "./UserInfoDash";
import {Button} from 'react-bootstrap';
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
        this.renderContent = this.renderContent.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
        this.showDonor = this.showDonor.bind(this);
        this.showCoordinator = this.showCoordinator.bind(this);
        this.showBecomeCoordinator = this.showBecomeCoordinator.bind(this);
        this.showBecomeDonor = this.showBecomeDonor.bind(this);
    }


    showUserInfo(){
        this.setState({
            propertySelected: 1
        });
    }

    showDonor(){
        this.setState({
            propertySelected: 2
        });
    }

    showCoordinator(){
        this.setState({
            propertySelected: 3
        });
    }

    showBecomeCoordinator(){
        this.setState({
            propertySelected: 4
        });
    }

    showBecomeDonor(){
        this.setState({
            propertySelected: 5
        });
    }


    renderCollections(){
        return(


            <div >
                <Button
                        style={{textAlign:'left'}}
                        onClick={this.showUserInfo}>
                    User Info
                </Button>
                <br />
                <button  className="btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                         style={{textAlign:'left'}}
                         onClick={this.showDonor}
                         disabled={!this.props.donor}
                >
                    Donor</button>
                <br />
                <button className="btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                        style={{textAlign:'left'}}
                        onClick={this.showCoordinator}
                        disabled={!this.props.coordinator}
                >
                    Coordinator
                </button>
                <br />
                {!this.props.donor
                    ? <button className="btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                              onClick={this.showBecomeDonor}>
                        Become donor
                </button> : ""}
                <br/>
                {!this.props.coordinator
                    ? <button className="btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                              onClick={this.showBecomeCoordinator}>
                        Become coordinator
                    </button> : ""}
            </div>


        );
    }

    renderContent(){

        switch (this.state.propertySelected) {
            case 1:
                return <UserInfoDash />;
            case 2:
                return <DonorDash />;
            case 3:
                return <CoordinatorDash />;
            case 4:
                return <BecomeCoordinator/>;
            case 5:
                return <BecomeDonor/>;

        }
    }

    hasToken() {
        return (
            <div className="wrapper row">
                <div className="col s2">
                    {this.renderCollections()}
                </div>

                <div className="col s8">
                        {this.renderContent()}
                </div>
            </div>
        );
    }

    render() {
        return (
          <div className="" >
              {this.props.token ? this.hasToken() : <div className="container">You need to login</div>}
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
