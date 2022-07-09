import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import List from '../Lists/List';

export class DNDContext extends Component {
  render() {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        {this.props.colOrd.map((columnId) => {
          var column = null;
          let tasks = [];
          if (this.props.useFiltered) {
            column = this.props.filteredColumns[columnId];
            tasks = this.props.filteredTasks;
          } else {
            column = this.props.columns[columnId];
            tasks = this.props.tasks;
          }
          const taskIds = column.taskIds;

          if (taskIds.length !== 0) {
            const mapped = [];
            for (const taskID of taskIds) {
              for (const task of tasks) {
                if (task.name === taskID) {
                  mapped.push(task);
                }
              }
            }
            return (
              <List
                key={columnId}
                column={column}
                tasks={mapped}
                getDeleteId={this.props.getDeleteId}
                openEdit={this.props.openEdit}
                setToInProgress={this.props.setToInProgress}
                setToDone={this.props.setToDone}
              />
            );
          } else {
            return <div key={columnId}></div>;
          }
        })}
      </DragDropContext>
    );
  }
}

export default DNDContext;
