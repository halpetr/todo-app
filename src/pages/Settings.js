import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import SelectColorModal from '../components/Modals/SelectColorModal';
import { COLORS } from '../css/DefaultColors';

const Container = styled.div`
  text-align: center;
  margin-top: 2%;
`;

const H1 = styled.h1`
  margin-top: 4%;
`;

export default class Settings extends React.Component {
  state = {
    selectBodyColor: false,
    selectTextColor: false,
  };

  setShowBodyColorPicker = () => {
    this.setState({
      selectBodyColor: !this.state.selectBodyColor,
    });
  };

  setShowTextColorPicker = () => {
    this.setState({
      selectTextColor: !this.state.selectTextColor,
    });
  };

  changeBodyColor = (color) => {
    this.props.setBodyColor(color);
    this.setShowBodyColorPicker();
  };

  changeTextColor = (color) => {
    this.props.setTextColor(color);
    this.setShowTextColorPicker();
  };

  changeToDefault = () => {
    this.changeTextColor(`${COLORS.color}`);
    this.changeBodyColor(`${COLORS.background}`);
    this.setState({
      selectBodyColor: false,
      selectTextColor: false,
    });
  };

  render() {
    return (
      <>
        <Container background={this.props.bgColor}>
          <H1>Change text color: </H1>
          <Button
            style={{ marginTop: '15px' }}
            id="card-btn"
            onClick={this.setShowTextColorPicker}
          >
            Text
          </Button>
          <H1>Change background color: </H1>
          <Button
            style={{ marginTop: '15px' }}
            id="card-btn"
            onClick={this.setShowBodyColorPicker}
          >
            Background
          </Button>
          <H1>Change back to default:</H1>
          <Button
            style={{ marginTop: '15px' }}
            id="card-btn"
            onClick={this.changeToDefault}
          >
            Default
          </Button>
        </Container>
        {this.state.selectBodyColor && (
          <SelectColorModal
            showColorPicker={this.state.selectBodyColor}
            changeColor={this.changeBodyColor}
          />
        )}
        {this.state.selectTextColor && (
          <SelectColorModal
            showColorPicker={this.state.selectTextColor}
            changeColor={this.changeTextColor}
          />
        )}
      </>
    );
  }
}
