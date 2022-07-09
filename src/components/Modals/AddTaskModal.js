import React, { Component } from 'react';
import MyForm from '../MyForm/MyForm';
import { Button, Modal } from 'react-bootstrap';

export class AddTaskModal extends Component {
  render() {
    return (
      <Modal id="modal" show={this.props.showAdd}>
        <Modal.Body id="modal-body">
          <MyForm
            handleSubmit={this.props.handleSubmit}
            tasks={this.props.tasks}
            tags={this.props.tags}
            deleteTag={this.props.deleteTag}
          />
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <Button id="modal-btn" onClick={() => this.props.handleAddClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddTaskModal;
