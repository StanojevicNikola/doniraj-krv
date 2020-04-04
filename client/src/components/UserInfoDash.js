import React, { Component } from 'react';

class UserInfoDash extends Component{
    render(){
        return(
            <div className="col s5">
                <div>
                    <label>Name</label>
                    <input type="text" value="Nikola Stanojevic" disabled />
                </div>


                <div>
                    <label>username</label>
                    <input type="text" value="ov3rlord" disabled />
                </div>

                <div>
                    <label>Email</label>
                    <input type="text" value="asdASDasdsa@asd.com" disabled />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" value="asdasd2e22" disabled />
                </div>

            </div>
        )
    };
}

export default UserInfoDash;