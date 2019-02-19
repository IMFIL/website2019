import React from 'react';
import propTypes from 'prop-types';
import AboutCanvas from './AboutCanvas.js';
import HomeCanvas from './HomeCanvas.js';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.c = null;
    this.canvas = null;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.canvasType !== this.props.canvasType) {
      this.canvas.stop();
      this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.getCanvas();
      this.canvas.draw()
    }
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

    this.getCanvas();

    //drawing on canvas
    this.canvas.draw()
  }

  getCanvas = () => {
    switch(this.props.canvasType) {
      case("home"):
        this.canvas = new HomeCanvas(this.c);
        break;
      case("me"):
        this.canvas = new AboutCanvas(this.c);
        break;
      default:
        this.canvas = new HomeCanvas(this.c);
        break;
    }
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
