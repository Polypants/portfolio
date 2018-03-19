import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import './viewTransition.css';
import Home from '../Views/Home/Home';
import ProjectDetail from '../Views/ProjectDetail/ProjectDetail';
import Cursor from '../Cursor/Cursor';
import Data from '../data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInApp: false,
      mousePos: { x: 0, y: 0 },
      isIntro: true,
      isMouseInsideProjectItem: false,
      homeScrollPos: 0
    };
  }

  setIsIntroForProjectDetail = () => {
    this.setState({ isIntro: false });
  }

  onScroll = (e) => {
    if ( window.location.pathname === '/' ) {
      this.setState({ homeScrollPos: window.scrollY });
    }
  }

  componentDidMount() {
    window.addEventListener( 'scroll', this.onScroll );

    if ( 'scrollRestoration' in window.history ) {
      window.history.scrollRestoration = 'manual';
    }
  }

  onProjectItemMouseHoverStateChange = ( bool ) => {
    this.setState({ isMouseInsideProjectItem: bool });
  }

  onIntroVisibilityChange = (isVisible) => {
    if ( window.location.pathname === '/' ) {
      this.setState({ isIntro: isVisible });
    }
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
    const ProjectsRoutes = Data.projects.map((project) => {
      return (
        <Route path={ project.aboutURL } key={ project.key } render={() => (
          <ProjectDetail
            project={ project }
            setIsIntroForProjectDetail={ this.setIsIntroForProjectDetail }
          />
        )}/>
      );
    });

    return (
      <Route render={({ location }) => (
        <div className="App"
          onMouseEnter={ this.onMouseEnter }
          onMouseLeave={ this.onMouseLeave }
          onMouseMove={ this.onMouseMove }
        >
          <TransitionGroup>
            <CSSTransition
              key={ location.key }
              classNames="view"
              timeout={ 2200 }
            >
              <Switch location={location}>
                <Route exact path="/" render={() => (
                  <Home
                    onProjectItemMouseHoverStateChange={ this.onProjectItemMouseHoverStateChange } 
                    onIntroVisibilityChange={ this.onIntroVisibilityChange }
                    homeScrollPos={ this.state.homeScrollPos }
                  />
                )}/>
                { ProjectsRoutes }
                { /* <Route component={} /> */ }
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Cursor 
            isMouseInsideProjectItem={ this.state.isMouseInsideProjectItem }
            isIntro={ this.state.isIntro }
            isMouseInApp={ this.state.isMouseInApp }
            mousePos={ this.state.mousePos }
          />
        </div>
      )}/>
    );
  }
}

export default App;
