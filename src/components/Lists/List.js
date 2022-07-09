import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CardsList from './CardsList';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const TaskList = styled.div`
  flex-grow: 1;
  min-height: 50vh;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'none')};
`;

const Title = styled.h4`
  padding: 8px;
  margin-top: 2px;
  margin-left: 2px;
  margin-right: 2px;
  color: whitesmoke;
  text-align: center;
  background-color: ${(props) => props.color};
  border-radius: 7px;
`;

const Container = styled.div`
  border: 2px solid;
  border-color: ${(props) => props.color};
  border-radius: 10px;
  margin-bottom: 15px;
`;

export class List extends Component {
  state = {
    color: 'whitesmoke',
  };

  componentDidMount() {
    if (this.props.column.id === 'column-1') {
      this.setState({
        color: 'whitesmoke',
      });
    } else if (this.props.column.id === 'column-2') {
      this.setState({
        color: 'lightcoral',
      });
    } else {
      this.setState({
        color: 'lightgreen',
      });
    }
  }

  render() {
    return (
      <Container id="list-container" color={this.state.color}>
        <Title color={this.state.color}>
          <Row>
            <Col>{this.props.column.title}</Col>
          </Row>
        </Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <CardsList
                tasks={this.props.tasks}
                column={this.props.column}
                getDeleteId={this.props.getDeleteId}
                openEdit={this.props.openEdit}
                setToInProgress={this.props.setToInProgress}
                setToDone={this.props.setToDone}
              />
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
export default List;
