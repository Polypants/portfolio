import React, { Component } from 'react';
import './Cursor.css';
import classNames from 'classnames';

class Cursor extends Component {
  render() {
    var cursorClasses = classNames(
      'Cursor',
      { 'Cursor--visible': this.props.isMouseInApp },
      { 'Cursor--intro': this.props.isIntro },
      { 'Cursor--projectItem': this.props.isMouseInsideProjectItem }
    );
    return (
      <div className={ cursorClasses }>
        <div className="Cursor_introCenterContainer" style={{ transform: `translate(${ this.props.mousePos.x + 0 }px, ${ this.props.mousePos.y + 0 }px)` }}>
          <div className="Cursor_introCenter"></div>
        </div>
        <div className="Cursor_introTrailContainer" style={{ transform: `translate(${ this.props.mousePos.x + -10 }px, ${ this.props.mousePos.y + -13 }px)` }}>
          <div className="Cursor_introTrail"></div>
        </div>
        <div className="Cursor_projectContainer" style={{ transform: `translate(${ this.props.mousePos.x + -40 }px, ${ this.props.mousePos.y + -45 }px)` }}>
          <div className="Cursor_project">
            <div className="Cursor_projectPoint"></div>
            <div className="Cursor_projectShaft"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cursor;