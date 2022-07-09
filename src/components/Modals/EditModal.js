import React, { Component } from 'react';
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';

export class EditModal extends Component {
  state = {
    task: {},
    currentTag: '',
    currentTitle: '',
    currentDesc: '',
  };

  componentDidMount() {
    this.getThisTask();
  }

  getThisTask = () => {
    let t = this.props.tasks;
    if (this.props.id !== null) {
      let tasks = t.filter((ta) => ta.id === this.props.id);
      this.setState({
        task: tasks[0],
        currentTag: tasks[0].tag,
        currentTitle: tasks[0].title,
        currentDesc: tasks[0].desc,
      });
    }
  };

  handleTitleChange = (e) => {
    e.preventDefault();
    this.setState({
      currentTitle: e.target.value.trim(),
      isButtonDisabled: false,
    });
  };

  handleDescChange = (e) => {
    e.preventDefault();
    this.setState({
      currentDesc: e.target.value.trim(),
      isButtonDisabled: false,
    });
  };

  handleTagChange = (e) => {
    e.preventDefault();
    this.setState({
      currentTag: e.target.value.trim(),
    });
  };

  getCurrentTime = () => {
    return new Date().toLocaleString();
  };

  updateThisTask = async () => {
    this.setState({
      task: {
        ...this.state.task,
        tag: this.state.currentTag,
        title: this.state.currentTitle,
        desc: this.state.currentDesc,
        modded: 'Modified: ' + this.getCurrentTime(),
      },
    });
  };

  sendChanges = async () => {
    await this.updateThisTask();
    this.props.handleEditSave(this.state.task);
  };

  setSelectedTag = (tag) => {
    this.setState({
      currentTag: tag,
    });
  };

  render() {
    return (
      <Form>
        <Modal id="edit-modal" show={this.props.showEdit}>
          <Modal.Body id="modal-body">
            Edit task:
            <br></br>
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
                    onClick={() => this.setSelectedTag(tag)}
                  >
                    {tag}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => this.handleTagChange(e)}
                value={this.state.currentTag}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Title:
              </InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => this.handleTitleChange(e)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Description:
              </InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(e) => this.handleDescChange(e)}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer id="modal-footer">
            <Button id="modal-btn" onClick={() => this.sendChanges()}>
              Save Changes
            </Button>
            <Button id="modal-btn" onClick={() => this.props.handleEditClose()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
}

export default EditModal;
