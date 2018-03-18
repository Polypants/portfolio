import React, { Component } from 'react';
import Footer from '../../Footer/Footer';
import './ProjectDetail.css';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: window.scrollY
    };
  }

  componentDidMount() {
    document.body.style.backgroundColor = this.props.project.backgroundColor;
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    this.setState({
      scrollTop: window.scrollY
    });
  }

  render() {
    return (
      <div className="ProjectDetail" style={{color: this.props.project.textColor}}>
        <div className="ProjectDetail_backgroundCircles" style={{transform: `translateY(-${this.state.scrollTop * .30}px)`}}>
          <div className="ProjectDetail_backgroundCircles_circle"></div>
        </div>
        <div className="ProjectDetail_foreground">
          <div className="ProjectDetail_intro">
            <h1 className="ProjectDetail_title">{this.props.project.title}</h1>
            <h2 className="ProjectDetail_subtitle">{this.props.project.subtitle}</h2>
            <h3 className="ProjectDetail_year">––– {this.props.project.year}</h3>
          </div>
          <div className="ProjectDetail_desktop">
            <div className="ProjectDetail_desktop_screen">
              <img className="ProjectDetail_desktop_screen_shine" src="Images/shine.svg" alt=""/>
              <img className="ProjectDetail_desktop_screen_image" src={this.props.project.desktop1ImgSrc} alt=""/>
            </div>
            <div className="ProjectDetail_desktop_base"></div>
          </div>
          <div className="ProjectDetail_text">
            <p className="ProjectDetail_description ProjectDetail_paragraph">{this.props.project.description}</p>
          </div>
          <div className="ProjectDetail_text">
            <h4 className="ProjectDetail_heading">{this.props.project.heading1}</h4>
            <p className="ProjectDetail_paragraph">{this.props.project.para1}</p>
          </div>
          <div className="ProjectDetail_desktop">
            <div className="ProjectDetail_desktop_screen">
              <img className="ProjectDetail_desktop_screen_shine" src="Images/shine.svg" alt=""/>
              <img className="ProjectDetail_desktop_screen_image" src={this.props.project.desktop2ImgSrc} alt=""/>
            </div>
            <div className="ProjectDetail_desktop_base"></div>
          </div>
          <div className="ProjectDetail_text">
            <h4 className="ProjectDetail_heading">{this.props.project.heading2}</h4>
            <p className="ProjectDetail_paragraph">{this.props.project.para2}</p>
          </div>
          <a target="_blank" href={this.props.project.link}>
            <div className="ProjectDetail_goToProjectButton">view website<div className="ProjectDetail_goToProjectButton_arrow"><div className="ProjectDetail_goToProjectButton_arrow_head"></div></div></div>
          </a>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProjectDetail;
