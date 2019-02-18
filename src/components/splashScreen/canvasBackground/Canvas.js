import React from 'react';
import propTypes from 'prop-types';
import PracticeCanvas from './PracticeCanvas.js';
import HomeCanvas from './HomeCanvas.js';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.c = null;
    this.canvas = null;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.canvas.removeListeners();
  }

  componentDidMount() {
    //Adding the handler for resizing
    window.addEventListener("resize", this.handleResize);
    //Drawing context of the canvas
    this.c = this.canvasRef.current.getContext('2d');
    //Manually sizing the canvas
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;

    switch(this.props.canvasType) {
      case("home"):
        this.canvas = new HomeCanvas(this.c);
        break;
      case("practice"):
        this.canvas = new PracticeCanvas(this.c);
        break;
      default:
        this.canvas = new PracticeCanvas(this.c);
        break;
    }

    //drawing on canvas
    this.canvas.draw()
  }

  handleResize = () => {
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;

    this.canvas.resize();
  }
  render() {
    return(
      <div style={styles.canvasContainer}>
        <canvas ref={this.canvasRef}/>
      </div>
    )
  }
}

const styles = {
  canvasContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden"
  }
}

Canvas.propTypes = {
  canvasType: propTypes.string.isRequired,
};


export default Canvas
