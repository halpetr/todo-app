import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import styled from 'styled-components';
import { BiEditAlt, BiTrash, BiCheck } from 'react-icons/bi';
import { VscDebugStart } from 'react-icons/vsc';

const Cardt = styled.div`
  margin-right: 3px;
  margin-left: 3px;
  margin-bottom: 5px;
  margin-top: 5px;
  text-shadow: none;
  text-align: center;
  background-color: ${(props) => props.color};
  border-width: 15px;
  border-radius: 10px;
`;

export default class MyCard extends React.Component {
  state = {
    card_name: this.props.task.title,
    card_text: this.props.task.desc,
    card_date: this.props.task.date,
    date_text: 'Added:',
    card_tag: this.props.task.tag,
    showProgress: true,
    showDone: true,
    card_color: 'whitesmoke',
  };

  componentDidMount() {
    this.setShowProgress();
    this.setIsDone();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task.date !== this.props.task.date) {
      console.log(true);
      this.updateDateText();
    }
  }

  updateDateText = () => {
    this.setState({
      date_text: 'Edited: ',
    });
    this.props.openEdit(this.props.task.id);
  };

  setShowProgress = () => {
    if (this.props.column.id === 'column-2') {
      this.setState({
        showProgress: false,
        showDone: true,
        card_color: 'lightcoral',
      });
    }
  };

  setIsDone = () => {
    if (this.props.column.id === 'column-3') {
      this.setState({
        showProgress: false,
        showDone: false,
        card_color: 'lightgreen',
      });
    }
  };

  render() {
    return (
      <Draggable
        draggableId={this.props.task.id.toString()}
        index={this.props.index}
      >
        {(provided) => (
          <Cardt
            id="card"
            color={this.state.card_color}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card.Body>
              <Row>
                <Card.Text id="tag">
                  <b>#</b> {this.state.card_tag}
                </Card.Text>
              </Row>
              <Row>
                <Card.Text id="date">
                  {this.props.task.date.substring(
                    0,
                    this.props.task.date.length - 3
                  )}
                </Card.Text>
              </Row>

              <Row id="title-row">
                <Card.Title id="title">{this.state.card_name}</Card.Title>
              </Row>
              <Row>
                <Card.Text id="desc">{this.state.card_text}</Card.Text>
              </Row>

              <Card.Footer id="card-footer">
                <Row id="footer-row">
                  {/* Start task */}
                  {this.state.showProgress && (
                    <Col xs={2} id="card-col">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Start task.</Tooltip>}
                      >
                        <Button
                          size="sm"
                          id="card-btn"
                          onClick={() =>
                            this.props.setToInProgress(this.props.task.id)
                          }
                        >
                          <VscDebugStart style={{ marginBottom: '3px' }} />
                        </Button>
                      </OverlayTrigger>
                    </Col>
                  )}

                  {/* Task DONE */}
                  {this.state.showDone && (
                    <Col xs={2} id="card-col">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Mark as Done.</Tooltip>}
                      >
                        <Button
                          size="sm"
                          id="card-btn"
                          onClick={() =>
                            this.props.setToDone(this.props.task.id)
                          }
                        >
                          <BiCheck style={{ marginBottom: '3px' }} />
                        </Button>
                      </OverlayTrigger>
                    </Col>
                  )}

                  {/* Edit TASK */}
                  <Col xs={2} id="card-col">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Edit task.</Tooltip>}
                    >
                      <Button
                        size="sm"
                        id="card-btn"
                        onClick={() => this.updateDateText()}
                      >
                        <BiEditAlt style={{ marginBottom: '3px' }} />
                      </Button>
                    </OverlayTrigger>
                  </Col>

                  {/* Delete TASK */}
                  <Col xs={2} id="card-col">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Delete task.</Tooltip>}
                    >
                      <Button
                        id="card-btn"
                        size="sm"
                        onClick={() =>
                          this.props.getDeleteId(this.props.task.id)
                        }
                      >
                        <BiTrash style={{ marginBottom: '3px' }} />
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Card.Footer>
            </Card.Body>
          </Cardt>
        )}
      </Draggable>
    );
  }
}
