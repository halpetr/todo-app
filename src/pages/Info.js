import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 5%;
  max-width: 75%;
  margin: auto;
  margin-top: 5%;
  border: solid 1px lightblue;
  border-radius: 25px;
  background-color: #000000b9;
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  margin-top: 10px;
`;

export class Info extends React.Component {
  render() {
    return (
      <Container>
        <Line>
          <h1>Info about the app: </h1>
        </Line>
        <Line>
          <h3>Made by: Petr Halinen</h3>
        </Line>
        <Line>
          <h4> Usage:</h4>
        </Line>
        <Line>
          <h5>Add tasks by clicking "Add Task -button".</h5>
        </Line>
        <Line>
          <h5>Created task is added to "Stuff to do" -list.</h5>
        </Line>
        <Line>
          <h6>
            Each task has buttons. Buttons have Tooltips that explain their
            function. Just mouse over them or select them with keyboard. When
            you use buttons to move tasks into one of the other 2 lists ("In
            progress" or "Done"), the other lists are placed on the screen.
          </h6>
        </Line>
        <Line>
          <h5>
            Tasks are drag and droppable. Which means you can drag them from
            list to list or just reorder them inside one list.
          </h5>
        </Line>
        <Line>
          <h5>
            You can filter tasks by their # (tag). End filtering by pressing the
            button that is rendered next to the "Filter" -button. You can filter
            multiple times in a row without closing filtering in between just
            press filter button again. You can also reorder and drag them while
            filtering is on, but these changes are not saved to the actual
            lists.
          </h5>
        </Line>
      </Container>
    );
  }
}

export default Info;
