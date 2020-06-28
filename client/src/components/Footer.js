import React, { Component } from 'react';

class Footer extends Component{

    render() {
        return (
            <footer className="page-footer text-light bg-dark">
                <div className="container d-flex justify-content-center">
                    <div className="row center">
                        
                        <div className="col ">
                            <h5 className="white-text">Linkovi</h5>
                            <ul>
                                <li><a className="grey-text text-light" href="https://www.redcross.org.rs/">www.redcross.org.rs</a></li>
                                <li><a className="grey-text text-light" href="http://www.nbti.org.rs/">www.nbti.org.rs</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright d-flex justify-content-center">
                    <div className="container center">
                        © 2020 Blood donation
                    </div>
                </div>
            </footer>
        );
    }


}

export default Footer;
