import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export class AskModal extends Component {
  render() {
    return (
      <Modal id="modal-ask" show={this.props.showAsk}>
        <Modal.Body id="modal-body">
          <Modal.Title>{this.props.question}</Modal.Title>
          <Button
            id="ask-btn"
            variant="success"
            onClick={() => this.props.handleAskYes()}
          >
            Yes
          </Button>
          <Button
            id="ask-btn"
            variant="danger"
            onClick={() => this.props.handleAskNo()}
          >
            No
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AskModal;
