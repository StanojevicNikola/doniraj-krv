import React, { Component } from 'react';
import {connect} from "react-redux";

class UserInfoDash extends Component{


    render(){
        return(
            <div className="col s5">
                <div>
                    <label>Name: </label>
                    <input type="text" value={this.props.name} disabled />
                </div>


                <div>
                    <label>Username:</label>
                    <input type="text" value={this.props.username} disabled />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="text" value={this.props.email} disabled />
                </div>

            </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        token: state.token,
        name: state.name,
        email: state.email,
        username: state.username
    }
};

export default connect(mapStateToProps, {})(UserInfoDash);
