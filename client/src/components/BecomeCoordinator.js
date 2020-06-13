import React, { Component } from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import {setCoord, setOnlyToken, setToken} from "../actions";

class BecomeCoordinator extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            bloodGroups: [],
            selectedBloodGroup: this.props.blood[0]['_id'],
        };

        this.handleBloodType = this.handleBloodType.bind(this);
        this.addCoordinator = this.addCoordinator.bind(this)
    }


    handleBloodType(event) {
        this.setState({selectedBloodGroup: event.target.value});
    }


    async addCoordinator() {
        const role = 'RECIPIENT';
        const roleData = {
            blood: this.state.selectedBloodGroup['_id'],
        };

        let resToken = await axios.post('/user/addRole', {role, roleData});

        axios.defaults.headers.common = {'authorization': `Bearer ${resToken.data.data.token}`};
        this.props.setOnlyToken({token: resToken.data.data.token});

        let resUser = await axios.post('/user/data');
        this.props.setCoord({coordinator: resUser.data.data.coordinator});


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

                <button className="btn" onClick={this.addCoordinator}>Add</button>
            </div>
        )
    };


}

const mapStateToProps = state => {
    return {
        token: state.token,
        blood: state.blood
    }
};

function mapDispatchToProps(dispatch){
    return {
        setOnlyToken: data => dispatch(setOnlyToken(data)),
        setCoord: data => dispatch(setCoord(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BecomeCoordinator);
