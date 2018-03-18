import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer_contact">
          <h1 className="Footer_title">Contact</h1>
          <a className="Footer_email" target="_blank" rel="noopener noreferrer" href="mailto:hello@paulpetrocco.com">hello@paulpetrocco.com</a>
        </div>
        <div className="Footer_follow">
          <h1 className="Footer_title">Follow</h1>
          <div className="socialMediaIcons">
            <a target="_blank" rel="noopener noreferrer" href="https://www.behance.net/paulpetrocd55d/">
              <img className="Footer_icon" src="/Images/behance.svg" alt=""/>
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Polypants/">
              <img className="Footer_icon" src="/Images/github.svg" alt=""/>
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/paul-petrocco-a1a52992/">
              <img className="Footer_icon" src="/Images/linkedin.svg" alt=""/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
