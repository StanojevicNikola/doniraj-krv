import React, { Component } from 'react';
import Mapa from './map/Mapa';
import axios from 'axios'

class CoordinatorDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cities: []
        }
    }

    async componentDidMount() {
        let res = await axios('/app/getCities');
        console.log(res.data);
        this.setState({
            cities: res.data.data
        });
    }

    render() {
        return (
            <div>
                KOORDINATOR
                <Mapa data={this.state.cities}/>
            </div>
        );
    }


}

export default CoordinatorDash;
