import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Mapa from './map/Mapa'

class DonorDash extends Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedDis: 0,
            places: []
        };

        this.findGeo = this.findGeo.bind(this);
        this.handleDis = this.handleDis.bind(this);
    }

    handleDis(event) {
        this.setState({selectedDis: event.target.value});
    }

    async findGeo() {
        console.log(this.state)
        let resGeo = await axios.post('/donor/findPlaces', {
            query: {  },
            constraint: { distance: this.state.selectedDis }
        });
        console.log(resGeo.data);
        this.setState({
            places: resGeo.data.data
        })
    }

    render() {
        return (
            <div>
               <div className="card blue-grey darken-1">
                   <div className="card-content white-text">
                       <p> Blood Type: {this.props.donor['blood']['groupType']} </p>

                       <br />
                       <p>Location: {this.props.donor['geolocation']['city']} </p>
                   </div>
               </div>
                <div>
                    <label>Distance:</label>
                    <select className="form-control" value={this.state.selectedDis} onChange={this.handleDis}>
                        <option value={0}>0</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                        <option value={500}>500</option>
                    </select>
                    <button className="btn btn-danger" onClick={this.findGeo}>Find</button>
                </div>

                <Mapa data={this.state.places}/>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        token: state.token,
        donor: state.donor,
        places: state.places
    }
};

export default connect(mapStateToProps, {})(DonorDash);
