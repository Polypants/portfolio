import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../Views/Home/Home';
import ProjectDetail from '../Views/ProjectDetail/ProjectDetail';
import Cursor from '../Cursor/Cursor';
import Data from '../data.json';

const ProjectsRoutes = Data.projects.map((project) => {
  return (
    <Route path={project.aboutURL} key={project.key} render={() => (
      <ProjectDetail project={project} />
    )}/>
  );
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInApp: false,
      mousePos: { x: 0, y: 0 },
      isIntro: true,
      isMouseInsideProjectItem: false
    };
  }

  onProjectItemMouseHoverStateChange = ( bool ) => {
    this.setState({ isMouseInsideProjectItem: bool });
  }

  onIntroVisibilityChange = (isVisible) => {
    this.setState({ isIntro: isVisible });
  }

  onMouseEnter = (e) => {
    this.setState({ isMouseInApp: true });
  }

  onMouseMove = (e) => {
    this.setState({
      isMouseInApp: true,
      mousePos: { x: e.clientX, y: e.clientY }
    });
  }

  onMouseLeave = (e) => {
    this.setState({ isMouseInApp: false });
  }

  render() {
    return (
      <div className="App"
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.onMouseLeave }
        onMouseMove={ this.onMouseMove }
      >
        <Switch>
          <Route exact path="/" render={() => (
            <Home
              onProjectItemMouseHoverStateChange={ this.onProjectItemMouseHoverStateChange } 
              onIntroVisibilityChange={ this.onIntroVisibilityChange }
            />
          )}/>
          { ProjectsRoutes }
          { /* <Route component={} /> */ }
        </Switch>
        <Cursor 
          isMouseInsideProjectItem={ this.state.isMouseInsideProjectItem }
          isIntro={ this.state.isIntro }
          isMouseInApp={ this.state.isMouseInApp }
          mousePos={ this.state.mousePos }
        />
      </div>
    );
  }
}

export default App;
