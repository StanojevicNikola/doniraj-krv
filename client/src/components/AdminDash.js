import React, { Component } from 'react';

class AdminDash extends Component {

    constructor(props) {
        super(props);

        this.renderCollections = this.renderCollections.bind(this);
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
                    {}
                </div>
            </div>
        );
    }
}

export default AdminDash;