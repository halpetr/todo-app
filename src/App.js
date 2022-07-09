import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Stuff from './pages/Stuff';
import Settings from './pages/Settings';
import Info from './pages/Info';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import styled from 'styled-components';
import sf from './serverfunctions';

const Container = styled.div`
  max-width: 968px;
  margin-right: auto;
  margin-left: auto;
  min-height: 100vh;
  background: ${(props) => props.background};
  color: ${(props) => props.textColor};
`;

export class App extends React.Component {
  state = {
    useDefaultBg: true,
    useDefaultColor: true,
    background: '',
    textColor: '',
  };

  componentDidMount() {
    this.getColors();
  }

  componentDidUpdate() {
    this.saveColors();
  }

  setTextColor = (color) => {
    this.setState({
      textColor: color,
      useDefaultColor: false,
    });
  };

  setBodyColor = (color) => {
    this.setState({
      useDefaultBg: false,
      background: color,
    });
  };

  getColors = async () => {
    let colors = await sf.getColors();
    this.setState({
      background: colors.background,
      textColor: colors.text,
    });
  };

  saveColors = async () => {
    let colors = {
      background: this.state.background,
      text: this.state.textColor,
    };
    await sf.saveColors(colors);
  };

  render() {
    return (
      <Container
        background={this.state.background}
        textColor={this.state.textColor}
        useDefaultBg={this.state.useDefaultBg}
        useDefaultColor={this.state.useDefaultColor}
      >
        <Navbar />
        <Routes>
          <Route
            path="*"
            exact
            element={
              <NotFound
                bgColor={this.state.background}
                textColor={this.state.textColor}
              />
            }
          />
          <Route
            path="/"
            exact
            element={
              <Stuff
                bgColor={this.state.background}
                textColor={this.state.textColor}
              />
            }
          />
          <Route
            path="/stuff"
            exact
            element={
              <Stuff
                bgColor={this.state.background}
                textColor={this.state.textColor}
              />
            }
          />
          <Route
            path="/settings"
            exact
            element={
              <Settings
                setBodyColor={this.setBodyColor}
                bgColor={this.state.background}
                textColor={this.state.textColor}
                setTextColor={this.setTextColor}
              />
            }
          />
          <Route path="/info" exact element={<Info />} />
        </Routes>
      </Container>
    );
  }
}

export default App;
