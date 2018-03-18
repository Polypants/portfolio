import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import classNames from 'classnames';
import './ProjectListItem.css';

class ProjectListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  onMouseEnter = (e) => {
    var container = e.currentTarget.querySelector(".ProjectListItem_Container");
    container.style.transition = "transform 0.15s ease-out";
    setTimeout(function() {
      container.style.transition = "transform 0.0s";
    }, 150);

    this.props.onProjectItemMouseHoverStateChange( true );
  }

  onMouseMove = (e) => {
    // set 3d styling to mouse position
    var rotateY = ((e.clientX / window.innerWidth) - 0.5) * 30;
    var rotateX = -((e.clientY / window.innerHeight) - 0.5) * 30;
    var container = e.currentTarget.querySelector(".ProjectListItem_Container");
    container.style.transform = "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
  }

  onMouseLeave = (e) => {
    // reset 3d styling defaults
    var container = e.currentTarget.querySelector(".ProjectListItem_Container");
    container.style.transform = "rotateY(0) rotateX(0)";
    container.style.transition = "transform 0.7s ease-in-out";

    this.props.onProjectItemMouseHoverStateChange( false );
  }

  onChange = (isVisible) => {
    if ( isVisible ) {
      this.setState({ isVisible: true });
    }
  }

  onChangeForTheme = (isVisible) => {
    // if ( isVisible ) {
    //   if (this.props.project.theme === 'dark') {
    //     document.body.style.backgroundColor = '#161616';
    //   } else if (this.props.project.theme === 'light') {
    //     document.body.style.backgroundColor = 'white';
    //   }
    // }
    
  }

  onContainerClick = () => {
    this.props.onProjectItemMouseHoverStateChange( false );
  }

  render() {
    var containerClasses = classNames(
      "ProjectListItem", 
      { "ProjectListItem--visible": this.state.isVisible } 
    );
    var textClasses = classNames(
      'ProjectListItem_text',
      { 'ProjectListItem_text--light': this.props.project.theme === 'light' },
      { 'ProjectListItem_text--dark': this.props.project.theme === 'dark' }
    );
    return (
      <VisibilitySensor onChange={ this.onChangeForTheme }>
        <VisibilitySensor
          onChange={ this.onChange }
          partialVisibility={ true }
          offset={{ bottom: 50 }}
        >
          <div
            className={ containerClasses }
            onMouseMove={ this.onMouseMove }
            onMouseEnter={ this.onMouseEnter }
            onMouseLeave={ this.onMouseLeave }
            onClick={ this.onContainerClick }
          >
            <Link to={ this.props.project.aboutURL }>
              <div className="ProjectListItem_Container">
                <div className="ProjectListItem_imageContainer">
                  <img className="ProjectListItem_image" src={ this.props.project.imgSrc } alt=""/>
                </div>
                <div className={ textClasses }>
                  <h1>{ this.props.project.title }</h1>
                  <h2>{ this.props.project.technology }</h2>
                </div>
              </div>
            </Link>
          </div>
        </VisibilitySensor>
      </VisibilitySensor>
    );
  }
}

export default ProjectListItem;
