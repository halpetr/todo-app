import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import sf from '../serverfunctions';
import AddTask from '../components/Modals/AddTaskModal';
import AskModal from '../components/Modals/AskModal';
import EditModal from '../components/Modals/EditModal';
import FilterModal from '../components/Modals/FilterModal';
import FilterButton from '../components/Buttons/FilterButton';
import DNDContext from '../components/DNDContext/DNDContext';

const Title = styled.h3`
  padding: 8px;
  text-align: center;
`;

const StuffContainer = styled.div`
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: auto;
  background-color: ${(props) => props.background};
`;

export default class Stuff extends React.Component {
  state = {
    tasks: [],
    colOrd: [],
    columns: {},
    tags: [],
    filteredTasks: [],
    filteredCols: {},
    showAdd: false,
    showAsk: false,
    showEdit: false,
    showLists: true,
    showFilter: false,
    useFiltered: false,
    deleteID: null,
    editId: null,
    title: 'Get Stuff Done',
    question: 'Are you sure?',
  };

  constructor(props) {
    super(props);
    window.onbeforeunload = async (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      await this.saveStateToServer(this.state);
      if (e) {
        e.returnValue = ''; // Legacy method for cross browser support
      }
      return ''; // Legacy method for cross browser support
    };
  }

  componentDidMount() {
    this.initializeStateFromServer();
    console.log(this.state);
  }

  componentWillUnmount() {
    this.saveStateToServer(this.state).then(console.log('state saved!'));
  }

  updateLists() {
    this.setState({
      showLists: false,
    });
    this.setState({
      showLists: true,
    });
  }

  saveStateToServer = async (state) => {
    let stateToSave = {
      tasks: state.tasks,
      columns: state.columns,
      columnOrder: state.colOrd,
      tags: state.tags,
    };
    try {
      if (!this.state.useFiltered) {
        await sf.saveState(stateToSave);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  initializeStateFromServer = async () => {
    try {
      let serverState = await sf.getServerState();
      this.setState({
        tasks: serverState.tasks,
        columns: serverState.columns,
        colOrd: serverState.columnOrder,
        tags: serverState.tags,
      });
    } catch (error) {
      return console.log(error);
    }
  };

  handleShowAdd = () => {
    this.setState({
      showAdd: true,
    });
  };

  handleAddClose = () => {
    this.setState({
      showAdd: false,
    });
  };

  handleShowAsk = (state) => {
    this.setState({
      showAsk: state,
    });
  };

  handleAskClose = () => {
    this.handleShowAsk(false);
  };

  handleAskYes = async () => {
    this.deleteTask();
    this.handleShowAsk(false);
  };

  handleAskNo = () => {
    this.handleShowAsk(false);
  };

  handleEditClose = async () => {
    this.setState({
      showEdit: false,
    });
  };

  // Open edit Modal
  openEdit = (id) => {
    this.setState({
      showEdit: true,
      editId: id,
    });
  };

  // Save changes made in Edit Modal
  handleEditSave = async (task) => {
    let tasks = Array.from(this.state.tasks);
    const newTasks = tasks.map((ts) => {
      if (ts.id === task.id) {
        return {
          name: ts.name,
          tag: task.tag,
          title: task.title,
          desc: task.desc,
          date: task.modded,
          id: ts.id,
        };
      } else {
        return ts;
      }
    });
    var tags = Array.from(this.state.tags);
    tags = tags.filter((tg) => tg !== task.tag);
    tags = [...tags, task.tag];
    this.setState({
      showEdit: false,
      tasks: newTasks,
      tags: tags,
    });
    try {
      await this.handleEditClose();
    } catch (error) {
      return console.log(error);
    }
    // Re-render lists
    this.updateLists();
  };

  // Get clicked task ID and show Modal to ask if sure about deleting
  getDeleteId = (id) => {
    this.setState({
      deleteID: id,
      showAsk: true,
    });
  };

  // Delete Task
  deleteTask = async () => {
    // Delete from tasks
    let id = this.state.deleteID;
    let tasks = Array.from(this.state.tasks);
    let newTasks = tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: newTasks,
    });

    // Remove corresponding taskId
    let columns = this.state.columns;
    let names = newTasks.map((t) => t.name);
    for (var key in columns) {
      var col = columns[key];
      let Ids = col.taskIds.filter((taskId) => {
        for (const name of names) {
          if (name === taskId) {
            return taskId;
          }
        }
      });

      let newCol = {
        ...col,
        taskIds: Ids,
      };
      let cols = {
        ...this.state.columns,
        [col.id]: newCol,
      };
      await this.setColumns(cols);
    }
    // Re-render Lists
    this.updateLists();
  };

  // Set Columns to state asyncronously (so that they have been updated before updateLists() is called)
  setColumns = async (columns) => {
    this.setState({
      columns: columns,
    });
  };

  // Add a task
  addTask = (tag, title, desc, date) => {
    let tasks = this.state.tasks;
    let taskNum = 1;
    if (tasks.length > 0) {
      let ids = tasks.map((task) => task.id);
      ids.sort((a, b) => b - a);
      taskNum = ids[0] + 1;
    }
    let taskname = `task-${taskNum}`;
    var tags = Array.from(this.state.tags);
    tags = tags.filter((tg) => tg !== tag);
    tags = [...tags, tag];
    let newTasks = [
      ...this.state.tasks,
      {
        name: taskname,
        tag: tag,
        title: title,
        desc: desc,
        date: 'Added: ' + date,
        id: taskNum,
      },
    ];
    let newCols = {
      ...this.state.columns,
      'column-1': {
        ...this.state.columns['column-1'],
        taskIds: [...this.state.columns['column-1'].taskIds, taskname],
      },
    };
    this.setState({
      tasks: newTasks,
      columns: newCols,
      tags: tags,
    });
    // Re-render lists
    this.updateLists();
  };

  setTaskToInProgress = async (id) => {
    let tasks = this.state.tasks;
    let filtered = tasks.filter((task) => task.id === id);
    console.log('Filtered', filtered);
    let name = filtered[0].name;

    let newCols = {
      ...this.state.columns,
      'column-2': {
        ...this.state.columns['column-2'],
        taskIds: [...this.state.columns['column-2'].taskIds, filtered[0].name],
      },
    };
    await this.setColumns(newCols);
    console.log('newCols', newCols);

    let columns = this.state.columns;
    console.log('COLS', columns);
    var Ids = [];
    for (var key in columns) {
      var col = columns[key];
      if (col.id === 'column-1') {
        console.log(true);
        Ids = col.taskIds.filter((taskId) => name !== taskId);
        let newCol = {
          ...col,
          taskIds: Ids,
        };
        let cols = {
          ...columns,
          [col.id]: newCol,
        };
        console.log('newCol', newCol);
        console.log('cols', cols);
        await this.setColumns(cols);
        this.updateLists();
      }
    }
  };

  setToDone = async (id) => {
    console.log('SET TO DONE ID:', id);
    let tasks = this.state.tasks;
    let filtered = tasks.filter((task) => task.id === id);
    console.log('Filtered', filtered);
    let name = filtered[0].name;

    let newCols = {
      ...this.state.columns,
      'column-3': {
        ...this.state.columns['column-3'],
        taskIds: [...this.state.columns['column-3'].taskIds, filtered[0].name],
      },
    };
    await this.setColumns(newCols);
    console.log('newCols', newCols);

    var Ids = [];
    for (var key in this.state.columns) {
      var col = this.state.columns[key];
      if (col.id === 'column-1' || col.id === 'column-2') {
        Ids = col.taskIds.filter((taskId) => name !== taskId);
        let newCol = {
          ...col,
          taskIds: Ids,
        };
        let cols = {
          ...this.state.columns,
          [col.id]: newCol,
        };
        this.setState({
          columns: cols,
        });
      }
    }
    this.updateLists();
  };

  // Beautiful Dnd, on ending drag reorder taskIds to correct lists
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // If no destination then do nothing
    if (!destination) {
      return;
    }
    // If destination and source the same also do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    var startCol = null;
    var endCol = null;
    // Get columns where draggable card started from and where it was dragged to
    if (this.state.useFiltered) {
      startCol = this.state.filteredCols[source.droppableId];
      endCol = this.state.filteredCols[destination.droppableId];
    } else {
      startCol = this.state.columns[source.droppableId];
      endCol = this.state.columns[destination.droppableId];
    }

    // If these two are the same (started from same list that it ended in)
    // then just reorder that one list
    if (startCol === endCol) {
      const newTaskIds = Array.from(startCol.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, `task-${draggableId}`);

      const newColumn = {
        ...startCol,
        taskIds: newTaskIds,
      };
      if (this.state.useFiltered) {
        const newStat = {
          ...this.state,
          filteredCols: {
            ...this.state.filteredCols,
            [newColumn.id]: newColumn,
          },
        };

        this.setState(newStat);
        return;
      } else {
        const newStat = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn,
          },
        };
        this.setState(newStat);
        return;
      }
    }

    // Make a taskIds array from the starting column (list) taskIds array
    const startTaskIds = Array.from(startCol.taskIds);
    // Splice dragged item from taskIds array and save the new array into newStartCol
    startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...startCol,
      taskIds: startTaskIds,
    };
    // Make a taskIds array from the ending column (list) taskIds array
    const endTaskIds = Array.from(endCol.taskIds);
    // Splice dragged item into taskIds array and save the new array into newEndCol
    endTaskIds.splice(destination.index, 0, `task-${draggableId}`);
    const newEndCol = {
      ...endCol,
      taskIds: endTaskIds,
    };
    var newState = null;
    if (this.state.useFiltered) {
      // Create newState that has the changes made to columns (lists)
      newState = {
        ...this.state,
        filteredCols: {
          ...this.state.filteredCols,
          [newStartCol.id]: newStartCol,
          [newEndCol.id]: newEndCol,
        },
      };
      // Set this state to be the new state of this component
      this.setState(newState);
    } else {
      // Create newState that has the changes made to columns (lists)
      newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStartCol.id]: newStartCol,
          [newEndCol.id]: newEndCol,
        },
      };
      // Set this state to be the new state of this component
      this.setState(newState);
    }
    console.log('newState', newState);
  };

  updateState = (newState) => {
    this.setState(newState);
  };

  setShowFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  };

  filterByTag = (tag) => {
    let tasks = Array.from(this.state.tasks);
    tasks = tasks.filter((task) => task.tag === tag);
    let names = Array.from(tasks);
    names = names.map((t) => t.name);
    console.log(tasks, names);
    for (var key in this.state.columns) {
      var col = this.state.columns[key];
      let Ids = col.taskIds.filter((taskId) => {
        for (const name of names) {
          if (name === taskId) {
            return taskId;
          }
        }
      });
      let newCol = {
        ...col,
        taskIds: Ids,
      };
      let cols = {
        ...this.state.columns,
        [col.id]: newCol,
      };
      this.setState({
        filteredCols: cols,
      });
    }
    this.setState({
      useFiltered: true,
      filteredTasks: tasks,
    });
  };

  resetFilter = () => {
    this.setState({
      showFilter: false,
      useFiltered: false,
      filteredTasks: [],
      filteredCols: {},
    });
  };

  deleteTag = (tag) => {
    let tags = Array.from(this.state.tags);
    tags = tags.filter((t) => t !== tag);
    console.log(tag, tags);
    this.setState({
      tags: tags,
    });
  };

  render() {
    return (
      <StuffContainer background={this.props.bgColor}>
        <Row id="row">
          <Col xs={7}>
            <Title>{this.state.title}</Title>
          </Col>
          <Col xs={5}>
            <Button size="sm" id="btn-addTask" onClick={this.handleShowAdd}>
              Add task
            </Button>
            <FilterButton
              useFiltered={this.state.useFiltered}
              setShowFilter={this.setShowFilter}
              resetFilter={this.resetFilter}
            />
          </Col>
        </Row>
        {this.state.showLists && (
          <Container id="stuff-container">
            <DNDContext
              colOrd={this.state.colOrd}
              columns={this.state.columns}
              filteredColumns={this.state.filteredCols}
              tasks={this.state.tasks}
              filteredTasks={this.state.filteredTasks}
              useFiltered={this.state.useFiltered}
              getDeleteId={this.getDeleteId}
              openEdit={this.openEdit}
              setToInProgress={this.setTaskToInProgress}
              setToDone={this.setToDone}
              onDragEnd={this.onDragEnd}
              updateState={this.updateState}
            />
          </Container>
        )}
        {this.state.showAdd && (
          <AddTask
            showAdd={this.state.showAdd}
            handleAddClose={this.handleAddClose}
            handleSubmit={this.addTask}
            tasks={this.state.tasks}
            tags={this.state.tags}
            deleteTag={this.deleteTag}
          />
        )}
        {this.state.showAsk && (
          <AskModal
            showAsk={this.state.showAsk}
            question={this.state.question}
            handleAskYes={this.handleAskYes}
            handleAskNo={this.handleAskNo}
          />
        )}
        {this.state.showEdit && (
          <EditModal
            showEdit={this.state.showEdit}
            handleEditClose={this.handleEditClose}
            handleEditSave={this.handleEditSave}
            id={this.state.editId}
            tasks={this.state.tasks}
            tags={this.state.tags}
          />
        )}
        {this.state.showFilter && (
          <FilterModal
            showFilter={this.state.showFilter}
            handleClose={this.setShowFilter}
            tags={this.state.tags}
            filterByTag={this.filterByTag}
          />
        )}
      </StuffContainer>
    );
  }
}
