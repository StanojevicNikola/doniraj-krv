import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";
import { setCoord, setOnlyToken } from "../actions";

import { Card } from "react-bootstrap";



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
        try {
            let resToken = await axios.post('/user/addRole', {role, roleData});

            axios.defaults.headers.common = {'authorization': `Bearer ${resToken.data.data.token}`};
            this.props.setOnlyToken({token: resToken.data.data.token});

            let resUser = await axios.post('/user/data');
            this.props.setCoord({coordinator: resUser.data.data.coordinator});
        } catch(err) {
            console.log(err.response)
            alert(err.response.data.message)
        };


    }

    render(){
        return(
            <div className="col s5">
                <Card>
                    <Card.Body>
                        <Card.Text>
                            Koordinator je osoba koja pomaže u organizaciji događaja prikupljana krvi.
                            Pritiskom na dugme postajete koordinator donacija.{"\n"}
                            Sve dalje komande izvrsavate u kartici koordinator.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br/>
                <button className="btn btn-large btn-outline-dark" onClick={this.addCoordinator}>Postani koordinator!</button>
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
