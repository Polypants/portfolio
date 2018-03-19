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
    setTimeout(() => {
      console.log("fired");
      window.scrollTo(0, this.props.homeScrollPos);
    }, 1200);
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
