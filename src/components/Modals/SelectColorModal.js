import React, { Component } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div`
  background-color: black;
  color: whitesmoke;
`;

const InnerContainer = styled.div`
  text-shadow: none;
`;

export class SelectColorModal extends Component {
  state = {
    backgroundColor: '',
  };

  setCurrentColor = (e) => {
    this.setState({
      backgroundColor: e.target.value,
    });
  };

  handleClose = () => {
    this.props.changeColor(this.state.backgroundColor);
  };

  render() {
    return (
      <Modal
        style={{ width: 'max-content', marginLeft: '45vw', marginTop: '15vh' }}
        show={this.props.showColorPicker}
      >
        <Container>
          <Modal.Body>
            <InnerContainer>
              <Form.Label htmlFor="exampleColorInput">Pick a Color!</Form.Label>
              <Form.Control
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
                type="color"
                id="exampleColorInput"
                defaultValue="#012276"
                title="Choose your color"
                onChange={(e) => this.setCurrentColor(e)}
              />
              <Button
                id="card-btn"
                style={{
                  marginTop: '15px',
                  marginLeft: '15px',
                }}
                onClick={() => this.handleClose()}
              >
                Save
              </Button>
            </InnerContainer>
          </Modal.Body>
        </Container>
      </Modal>
    );
  }
}

export default SelectColorModal;
