import React, { Component } from 'react';
import DonorDash from "./DonorDash";
import CoordinatorDash from "./CoordinatorDash";
import UserInfoDash from "./UserInfoDash";

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
    }

    componentDidMount() {

    }

    renderCollections(){
        return(


            <div className="dash col s2" >
                <button className= "btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                        style={{textAlign:'left'}}
                        onClick={this.showUserInfo}>
                    User Info
                </button>
                <br />
                <button  className="btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                         style={{textAlign:'left'}}
                         onClick={this.showDonor} >
                    Donor</button>
                <br />
                <button className="btn-large waves-effect waves-light red darken-1 white-text btn-flat"
                        style={{textAlign:'left'}}
                        onClick={this.showCoordinator}>
                    Coordinator
                </button>
                <br />
                <button className="btn-large waves-effect waves-light red darken-1 white-text btn-flat" style={{textAlign:'left'}}>Alvin</button>
            </div>


        );
    }

    renderContent(){

        switch (this.state.propertySelected) {
            case 1:
                return <UserInfoDash />;
                break;
            case 2:
                return <DonorDash />;
                break;
            case 3:
                return <CoordinatorDash />

        }
    }

    render() {
        return (
          <div className="wrapper row" >
                <div className="col s2">
                    {this.renderCollections()}
                </div>

                <div className="col s8">
                     {this.renderContent()}
                </div>
          </div>
        );
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



    renderUserInfo(){
        return(
            <div>UserInfo</div>
        )
    }

};

export default Dashboard;