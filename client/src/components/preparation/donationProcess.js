import React, {Component} from 'react';
import pic from '../../img/donation_proces_reworked.png'

class DonationProcess extends Component{
    render(){
        return(
          <>
              <h1 className="landing-title">Donation Process</h1>
              <h4 className="landing-title">Follow these 10 easy steps</h4>
              <img src={pic} />
          </>
        );
    }
}

export default DonationProcess;