import React, { Component } from 'react';
import MyCard from '../MyCard/MyCard';

export class CardsList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <>
        {this.props.tasks.map((task, index) => {
          return (
            <MyCard
              key={task.id}
              index={index}
              task={task}
              column={this.props.column}
              getDeleteId={this.props.getDeleteId}
              openEdit={this.props.openEdit}
              setToInProgress={this.props.setToInProgress}
              setToDone={this.props.setToDone}
            />
          );
        })}
      </>
    );
  }
}

export default CardsList;
