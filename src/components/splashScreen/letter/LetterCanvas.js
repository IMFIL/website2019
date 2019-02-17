import React, { Component } from 'react';
import Letter from './Letter';
import Canvas from '../canvasBackground/Canvas';
import { Button, Icon, Input } from 'semantic-ui-react';
import './LetterCanvas.css';
import anime from 'animejs';

const originalName = [
  "I",
  "M",
  ".",
  "F",
  "I",
  "L"
];

const originalNumbers = [
  9,
  53,
  96,
  34,
  15,
  9,
  453,
  66,
  132,
  75,
];

class LetterCanvas extends Component {
  constructor(props) {
    super(props);

    this.hiddenInputRef = React.createRef();

    this.state = {
      resetLettersEnabled: false,
      requiresUpdatedLetters: false,
      displayName: originalName,
      displayNumbers: originalNumbers,
      clickedLetters: {},
      hiddenInputText: ""
    }
  }
  handleLetterMovement = (letterId, movementRef) => {
    let clickedLetters = this.state.clickedLetters;
    clickedLetters[letterId] = movementRef;

    let updatedState = {
      resetLettersEnabled: true,
      clickedLetters
    }

    if(Object.keys(clickedLetters).length === this.state.displayName.length) {
      updatedState.enableUserNameInput = true;
    }
    this.setState({
      ...updatedState
    })
  }

  handleHiddenInputChange = (event) => {
    this.deleteAnimeRef();

    const value = event.target.value.trim().replace(/\s/g, '').toUpperCase();
    const name = value.split("");

    this.setState({
      hiddenInputText: value,
      displayName: name,
      requiresUpdatedLetters: true,
      displayNumbers: (() => {
        return name.map(letter => {
          return Math.floor(Math.random() * (100 - 1) + 1)
        })
      })()
    }, () => {
      this.setState({requiresUpdatedLetters: false})
    })
  }

  deleteAnimeRef = () => {
    Object.keys(this.state.clickedLetters).forEach(letter => {
      const ref = this.state.clickedLetters[letter];
      anime.remove(ref.current);
    })
  }

  handleResetLettersClick = () => {
    this.deleteAnimeRef();
    this.setState({
      resetLettersEnabled: false,
      enableUserNameInput: false,
      requiresUpdatedLetters: true,
      hiddenInputText: "",
      clickedLetters: {},
      displayName: originalName,
      displayNumbers: originalNumbers
    }, () => {
      this.setState({requiresUpdatedLetters: false})
    }
  )
  }
  render() {
    const letters = this.state.displayName.map((letter, index) => {
      return(
        <Letter
        key={letter+index}
        requiresUpdatedLetters={this.state.requiresUpdatedLetters}
        number={this.state.displayNumbers[index]}
        letter={letter}
        handleLetterMovement={this.handleLetterMovement}/>
      )
    })
    return (
      <div style={{height: "100%", width: "100%", position: "relative"}}>
        <Canvas/>
        <div style={styles.appContainer}>
          <div style={styles.lettersContainer}>
            {letters}
          </div>
        </div>
        {this.state.resetLettersEnabled &&
          <Button
            icon
            className="resetLettersButton"
            style={styles.resetLettersButton}
            onClick={this.handleResetLettersClick}>
              <Icon name='undo' />
          </Button>
        }
        {this.state.enableUserNameInput &&
          <Input
          className="wowGreatJobYouFoundIt"
          ref={this.hiddenInputRef}
          placeholder="And you are ?"
          onChange={(event) => this.handleHiddenInputChange(event)}/>
        }
      </div>
    );
  }
}

const styles = {
  appContainer:{
    overflow: "hidden",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  lettersContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  introText: {
    padding: "0",
    fontSize: 22,
    fontWeight: 200,
    color: "#FFF",
    fontFamily: "'Nunito', sans-serif"
  },
  resetLettersButton: {
    position: "absolute",
    bottom: 10,
    right: 10
  }
}

export default LetterCanvas;