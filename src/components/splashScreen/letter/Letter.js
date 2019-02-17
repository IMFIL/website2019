import React, { Component } from 'react';
import propTypes from 'prop-types';
import anime from 'animejs';
import uuidv1 from 'uuid/v1';

import './letter.css';

const colors = [
  "#19FF74",
  "#A4FF50",
  "#F6FF56",
  "#FF8F43",
  "#FF4A4B",
  "#3BFFEC",
  "#61C3FF",
  "#5987FF",
  "#8454E3",
  "#C26EFF",
  "#FB89FB"
]

class Letter extends Component {

  constructor(props) {
    super(props);

    this.divRef = React.createRef();
    this.id = uuidv1();

    this.xDirection = 0;
    this.yDirection = 0;

    this.state = {
      clicked: false,
      x: 0,
      y: 0,
      color: "#c0c0c0",
      width: 70,
      height: 70,
      fontSize: 35,
      numberFontSize: 10
    }
  }

    componentDidMount() {
      this.moveThroughSpace();
      this.letterAnimation.pause();
      this.adjustSizes();

      window.addEventListener("resize", () => this.adjustSizes());
    }

    componentDidUpdate(prevProps) {
      if(prevProps.requiresUpdatedLetters && !this.props.requiresUpdatedLetters) {
        this.setState(
          {
            clicked: false,
            x: 0,
            y: 0,
          }
        );
      }
    }

    adjustSizes = () => {
      const wWidth = window.innerWidth;

      let width = 70;
      let height = 70;
      let fontSize = 35;
      let numberFontSize = 10;

      if(wWidth >= 700 && wWidth <= 1281) {
        width = 60;
        height = 60;
      }

      else if(wWidth >= 550 && wWidth < 700) {
        width = 50;
        height = 50;
        fontSize = 25;
        numberFontSize = 9;
      }

      else if(wWidth < 550) {
        width = 40;
        height = 40;
        fontSize = 15;
        numberFontSize = 6;
      }

      this.setState({
        width,
        height,
        fontSize,
        numberFontSize
      })
    }

  moveThroughSpace() {
    const position = this.getOffsetPosition(this.id);
    let deltaX = 0;
    let deltaY = 0;

    if(window.innerWidth - position.left < (this.state.width -1) ||
      position.left < 0.1) {
        deltaX = position.left <= 1 ? 10 : -10;
        this.xDirection = this.xDirection * -1;
        this.generateRandomColor();
    }

    if(window.innerHeight - position.top < (this.state.width -1) ||
      position.top < 0.1) {
        deltaY = position.top <= 1 ? 10 : -10;
        this.yDirection = this.yDirection * -1;
        this.generateRandomColor();
      }

    const newX = deltaX + this.state.x + this.xDirection;
    const newY = deltaY + this.state.y + this.yDirection;

    this.setState(
      {
        x: newX,
        y: newY
      },
    this._moveThroughSpace(this.state.x, this.state.y));
  }

  _moveThroughSpace = (newX, newY) => {
    this.letterAnimation = anime({
      targets: this.divRef.current,
      translateX: newX,
      translateY: newY,
      duration: 0,
      loop: false,
      autostart: false,
      complete: () => {this.moveThroughSpace()}
    });
  }

  generateRandomColor() {
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  getOffsetPosition(id) {
    const element =  document.getElementById(id).getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: element.top + scrollTop, left: element.left + scrollLeft }
  }

  handleClick = () => {
    this.props.handleLetterMovement(this.id, this.divRef);
    if(!this.state.clicked) {

      this.xDirection = (Math.random() * (2 - 1) + 1) * (Math.random() >= 0.5 ? 1 : -1);
      this.yDirection = (Math.random() * (2 - 1) + 1) * (Math.random() >= 0.5 ? 1 : -1);

      this.letterAnimation.play();
    }
    else {
      this.letterAnimation.pause();
    }

    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    let positionStyle = {
      left: this.state.x,
      top: this.state.y
    }

    if(this.state.x === 0 && this.state.y === 0) {
      positionStyle.transform = "none";
    }

    const letterBoxStyle = {
      ...styles.letterContainer,
      ...positionStyle,
      width: this.state.width,
      height: this.state.height
    };

    const letterFontStyle = {
      ...styles.letterText,
      color: this.state.color,
      fontSize: this.state.fontSize
    }

    const numberStyle = {
      ...styles.letterNumber,
      fontSize: this.state.numberFontSize
    }

    return (
      <div
      id={this.id}
      onClick={this.handleClick}
      ref={ this.divRef }
      style={letterBoxStyle}>
        <p style={numberStyle}>
          { this.props.number }
        </p>
        <p
        style={letterFontStyle}>
          { this.props.letter }
        </p>
      </div>
    );
  }
}

const styles = {
  letterContainer:{
    cursor: "pointer",
    width: 80,
    height: 80,
    backgroundColor: "#121212",
    border: "#4D5050 solid 1px",
    borderRadius: "0.25em",
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  letterText: {
    padding: "0",
    fontWeight: 200,
    fontFamily: "'Nunito', sans-serif"
  },
  letterNumber: {
    position: "absolute",
    color: "#4D5050",
    top: 0,
    left: 5
  }
}

Letter.propTypes = {
  number: propTypes.number.isRequired,
  letter: propTypes.string.isRequired,
  handleLetterMovement: propTypes.func.isRequired
};

export default Letter;
