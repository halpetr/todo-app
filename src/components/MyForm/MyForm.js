import React from 'react';
import {
  Form,
  Button,
  InputGroup,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from 'react-bootstrap';

export class MyForm extends React.Component {
  state = {
    form_title: 'Stuff to Do:',
    form_name_example: '"Take out the trash"',
    form_desc: 'Description or other notes:',
    form_desc_example: '"The trash will smell if I don´t take it out"',
    currentTag: '',
    currentTitle: '',
    currentDesc: '',
    isButtonDisabled: true,
  };

  getCurrentTime = () => {
    return new Date().toLocaleString();
  };

  handleSubmitPress = (e) => {
    e.preventDefault();
    this.props.handleSubmit(
      this.state.currentTag,
      this.state.currentTitle,
      this.state.currentDesc,
      this.getCurrentTime()
    );
    this.setState({
      isButtonDisabled: true,
      currentTitle: '',
      currentDesc: '',
      currentTag: '',
    });
    e.target.reset();
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

  setSelectedTag = (tag) => {
    this.setState({
      currentTag: tag,
    });
  };

  render() {
    return (
      <div id="form">
        <h4>Add more stuff to do!</h4>
        <br></br>
        <Form.Label>Tag:</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Text input with dropdown button"
            type="textarea"
            autoComplete="off"
            onChange={this.handleTagChange}
            value={this.state.currentTag}
          />
          <DropdownButton
            variant="outline-secondary"
            title="Tags"
            id="dropdownButton"
            style={{ alignItems: 'center' }}
          >
            {this.props.tags.map((tag, index) => (
              <Row key={index}>
                <Col xs={8}>
                  <Dropdown.Item
                    key={index}
                    onClick={() => this.setSelectedTag(tag)}
                  >
                    {tag}
                  </Dropdown.Item>
                </Col>
                <Col xs={1}>
                  <Button
                    size="sm"
                    id="card-btn"
                    onClick={() => this.props.deleteTag(tag)}
                  >
                    X
                  </Button>
                </Col>
              </Row>
            ))}
          </DropdownButton>
        </InputGroup>

        <Form onSubmit={this.handleSubmitPress}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>{this.state.form_title}</Form.Label>
            <Form.Control
              type="textarea"
              autoComplete="off"
              placeholder={this.state.form_name_example}
              onChange={this.handleTitleChange}
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formDescription">
            <Form.Label>{this.state.form_desc}</Form.Label>
            <Form.Control
              as="textarea"
              autoComplete="off"
              placeholder={this.state.form_desc_example}
              onChange={this.handleDescChange}
              style={{ height: '100px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formButton"></Form.Group>
          <Button
            id="form-submit-btn"
            type="submit"
            disabled={this.state.isButtonDisabled}
          >
            Add task
          </Button>
        </Form>
      </div>
    );
  }
}

export default MyForm;
