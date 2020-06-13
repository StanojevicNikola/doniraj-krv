import React, { Component } from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import {setDonor, setOnlyToken, setToken} from "../actions";
import DatePicker from "react-datepicker";

class BecomeDonor extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            bloodGroups: [],
            selectedBloodGroup: this.props.blood[0]['_id'],
            selectedCity: this.props.places[0]['_id'],
            selectedDate: new Date()
        };

        this.handleBloodType = this.handleBloodType.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.addDonor = this.addDonor.bind(this)
        this.handleDate = this.handleDate.bind(this);
    }

    handleBloodType(event) {
        this.setState({selectedBloodGroup: event.target.value});
    }

    handleCity(event) {
        this.setState({selectedCity: event.target.value});
    }

    handleDate(date ) {
        this.setState({selectedDate: date});
    }

    async addDonor() {
        const role = 'DONOR';
        const roleData = {
            blood: this.state.selectedBloodGroup,
            geolocation: this.state.selectedCity,
            lastDonation: this.state.selectedDate
        };

        let resToken = await axios.post('/user/addRole', {role, roleData});
        console.log(resToken)
        axios.defaults.headers.common = {'authorization': `Bearer ${resToken.data.data.token}`};
        this.props.setOnlyToken({token: resToken.data.data.token});

        let resUser = await axios.post('/user/data');
        this.props.setDonor({donor: resUser.data.data.donor});

    }

    render(){
        return(
            <div className="col s5">

                <br/>
                <br/>
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

                <div>
                    <DatePicker
                        selected={this.state.selectedDate}
                        onChange={this.handleDate}
                    />
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
