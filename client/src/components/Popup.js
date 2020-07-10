import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Popup extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{this.props.msg}</p>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        );
    }


}

export default Popup;
