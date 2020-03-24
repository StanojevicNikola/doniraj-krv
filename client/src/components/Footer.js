import React, { Component } from 'react';

class Footer extends Component{

    render() {
        return (
            <footer className="page-footer red accent-4 footer">
                <div className="container">
                    <div className="row center">
                        <div className="col ">
                            <h5 className="white-text">Footer Content</h5>
                            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your
                                footer content.</p>

                        </div>
                        <div className="col ">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container center">
                        © 2020 Blood donation
                    </div>
                </div>
            </footer>
        );
    }


}

export default Footer;
