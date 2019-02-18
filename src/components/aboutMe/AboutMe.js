import React, { Component } from 'react';
import './AboutMe.css';

class AboutMe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: "70%"
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const wWidth = window.innerWidth;
    let width = "70%"

    if(wWidth >= 550 && wWidth <= 1000) {
      width = "85%"
    }

    else if(wWidth <= 550) {
      width = "90%"
    }

    this.setState({
      width,
    })
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    let aboutMeContainerProps = {
      ...styles.aboutMeContainer,
      width: this.state.width
    };
    return (
      <div style={aboutMeContainerProps}>
      </div>
    );
  }
}

const styles = {
  aboutMeContainer: {
    backgroundColor: "red",
    height: "100%"
  }
}

export default AboutMe;
