import React, { Component } from 'react';
import {
  Button,
  Dropdown,
  DropdownButton,
  InputGroup,
  Modal,
} from 'react-bootstrap';

export class FilterModal extends Component {
  handleSelect = (tag) => {
    this.props.filterByTag(tag);
    this.props.handleClose();
  };

  render() {
    return (
      <Modal id="filter-modal" show={this.props.showFilter}>
        <Modal.Body id="filter-body">
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="Tags"
              id="dropdownButton"
            >
              {this.props.tags.map((tag, index) => (
                <Dropdown.Item
                  className="ml-2 mr-2 text-center"
                  key={index}
                  onClick={() => this.handleSelect(tag)}
                >
                  {tag}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer id="filter-footer">
          <Button id="modal-btn" onClick={() => this.props.handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FilterModal;
