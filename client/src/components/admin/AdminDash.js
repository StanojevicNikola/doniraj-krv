import React, { Component } from 'react';
import NewsPanel from "./NewsPanel";
import EventsPanel from './EventsPanel';
import LocationsPanel from './LocationsPanel';

class AdminDash extends Component {

    constructor(props) {
        super(props);

        this.state = {
            propertySelected: 0
        };

        this.renderCollections = this.renderCollections.bind(this);
        this.renderContent = this.renderContent.bind(this);
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

    renderContent(){
        switch (this.state.propertySelected) {
            case 1:
                return <NewsPanel />;
                break;
            case 2:
                return <EventsPanel />;
                break;
            case 3:
                return <LocationsPanel />;
                break;
        }
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
}

export default AdminDash;