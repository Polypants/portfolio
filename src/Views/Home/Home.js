import React, { Component } from 'react';
import Intro from '../../Intro/Intro';
import ProjectsList from '../../ProjectsList/ProjectsList';
import Footer from '../../Footer/Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectItemIndex: 0
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = "white";
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  render() {
    return (
      <div className="Home">
        <Intro onIntroVisibilityChange={this.props.onIntroVisibilityChange} />
        <ProjectsList onProjectItemMouseHoverStateChange={ this.props.onProjectItemMouseHoverStateChange }/>
        <Footer />
      </div>
    );
  }
}

export default Home;
