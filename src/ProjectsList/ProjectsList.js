import React, { Component } from 'react';
import './ProjectsList.css';
import ProjectListItem from '../ProjectListItem/ProjectListItem';
import BackgroundLines from '../BackgroundLines/BackgroundLines';
import Data from '../data';

class ProjectsList extends Component {
  render() {
    const Projects = Data.projects.map((project) => {
      return <ProjectListItem project={project} key={project.key} onProjectItemMouseHoverStateChange={ this.props.onProjectItemMouseHoverStateChange } />
    });
    return (
      <div className="ProjectsList">
        <BackgroundLines />
        {Projects}
      </div>
    );
  }
}

export default ProjectsList;