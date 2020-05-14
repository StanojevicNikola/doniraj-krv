import React, { Component } from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import {setDonor, setOnlyToken, setToken} from "../actions";

class BecomeDonor extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            bloodGroups: [],
            selectedBloodGroup: '',
            selectedCity: ''
        };

        this.handleBloodType = this.handleBloodType.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.addDonor = this.addDonor.bind(this)
    }

    handleBloodType(event) {
        this.setState({selectedBloodGroup: event.target.value});
    }

    handleCity(event) {
        this.setState({selectedCity: event.target.value});
    }

    async addDonor() {
        const role = 'DONOR';
        const roleData = {
            blood: this.state.selectedBloodGroup,
            geolocation: this.state.selectedCity
        };

        let resToken = await axios.post('/user/addRole', {role, roleData});

        axios.defaults.headers.common = {'authorization': `Bearer ${resToken.data.data.token}`};
        this.props.setOnlyToken({token: resToken.data.data.token});

        let resUser = await axios.post('/user/data');
        this.props.setDonor({donor: resUser.data.data.donor});

    }

    render(){
        return(
            <div className="col s5">
                <div>
                    <label>Blood type: </label>
                    <select value={this.state.selectedBloodGroup} onChange={this.handleBloodType}>
                        {this.props.blood.map((e, i) => {
                            return(
                                <option key={i} value={e['_id']}>{e['groupType']}</option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <label>Location:</label>
                    <select value={this.state.selectedCity} onChange={this.handleCity}>
                        {this.props.places.map((e, i) => {
                            return(
                                <option key={i} value={e['_id']}>{e['city']}</option>
                            )
                        })}
                    </select>
                </div>
                <button className="btn" onClick={this.addDonor}>Add</button>
            </div>
        )
    };


}

const mapStateToProps = state => {
    return {
        token: state.token,
        places: state.places,
        blood: state.blood
    }
};

function mapDispatchToProps(dispatch){
    return {
        setOnlyToken: data => dispatch(setOnlyToken(data)),
        setDonor: data => dispatch(setDonor(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BecomeDonor);
