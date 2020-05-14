import React, { Component } from 'react';
import Mapa from './map/Mapa';
import axios from 'axios'
import {connect} from "react-redux";

class CoordinatorDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedDis: 0,
            selectedCity: this.props.places[0]['city'],
            selectedBloodGroup: this.props.blood[0]['groupType']
        };

        this.handleDis = this.handleDis.bind(this);
        this.handleBloodType = this.handleBloodType.bind(this);
        this.handleCity = this.handleCity.bind(this);

        this.notify = this.notify.bind(this)
    }

    handleDis(event) {
        this.setState({selectedDis: event.target.value});
    }

    handleBloodType(event) {
        this.setState({selectedBloodGroup: event.target.value});
    }

    handleCity(event) {
        this.setState({selectedCity: event.target.value});
    }

    async notify() {

        let body = {
            city: this.state.selectedCity,
            places: ["5e7ce738482b4961e51a4a0b"],
            radius: this.state.selectedDis,
            queryType: 'COMPATIBLE',
            groups: [this.state.selectedBloodGroup]
        };

        const resNotify = await axios.post('/recipient/requestBlood', body);
        console.log(resNotify.data);

    }

    render() {
        return (
            <div className="">
                <div className="">
                    <label>Location:</label>
                    <select value={this.state.selectedCity} onChange={this.handleCity}>
                        {this.props.places.map((e, i) => {
                            return(
                                <option key={i} value={e['city']}>{e['city']}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="">
                    <label>Blood type: </label>
                    <select value={this.state.selectedBloodGroup} onChange={this.handleBloodType}>
                        {this.props.blood.map((e, i) => {
                            return(
                                <option key={i} value={e['groupType']}>{e['groupType']}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="">
                    <label>Distance:</label>
                    <select className="form-control" value={this.state.selectedDis} onChange={this.handleDis}>
                        <option value={0}>0</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={250}>250</option>
                        <option value={500}>500</option>
                    </select>

                </div>

                <button className="btn btn-danger" onClick={this.notiyf}>Notify</button>
            </div>
        );
    }


}
const mapStateToProps = state => {
    return {
        token: state.token,
        coordinator: state.coordinator,
        places: state.places,
        blood: state.blood
    }
};

export default connect(mapStateToProps, {}) (CoordinatorDash);
