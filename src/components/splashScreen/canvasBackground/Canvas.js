import React from 'react';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.c = null;
  }

  componentDidMount() {
    //Adding the handler for resizing
    window.addEventListener("resize", () => this.handleResize());
    //Drawing context of the canvas
    this.c = this.canvasRef.current.getContext('2d');
    //Manually sizing the canvas
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;

    //drawing on canvas
    this.drawCanvas();
  }

  drawCanvas = () => {
    // for(let i=0; i < 100; i++) {
    //   //colors all the fills of the rectangle
    //   this.c.fillStyle ="rgba(13,20,237,0.5)";
    //   //x, y, width, height
    //   this.c.fillRect(100+i, 100+i, 100, 100);
    //   //this fill only is applied to all rectangles created after
    //   this.c.fillStyle ="rgba(255,0,0,0.5)";
    //   this.c.fillRect(100+i, 300+i, 100, 100);
    //   //this fill only is applied to all rectangles created after
    //   this.c.fillStyle ="rgba(0,255,0,0.5)";
    //   this.c.fillRect(200+i, 200+i, 100, 100);
    // }
    //
    // for(let i=0; i < 100; i++) {
    //   //Line
    //   this.c.beginPath();
    //   //starts the path
    //   this.c.moveTo(50, 300);
    //   //draws a line from past point to here
    //   this.c.lineTo(300+i, 100+i);
    //   this.c.lineTo(400+i, 300+i);
    //   //styling the line (stroke)
    //   this.c.strokeStyle= "#0D14ED";
    //   //you need stroke to draw the line
    //   this.c.stroke();
    // }

    //Arc / Circle
    for(let i=0; i < 1000; i++) {
      //this is done to end the previous line, otherwise the line and circle would be connected
      this.c.beginPath();
      //arc(x, y, r, startAngle, endAngle, counterClockwise)
      this.c.arc(300 + i, 300 + i, 30, 0, Math.PI * 2, false);
      this.c.strokeStyle= "#242424";
      this.c.stroke();
    }

    for(let i=0; i < 1000; i++) {
      //this is done to end the previous line, otherwise the line and circle would be connected
      this.c.beginPath();
      //arc(x, y, r, startAngle, endAngle, counterClockwise)
      this.c.arc(window.innerWidth-300 - i, 200 + i, 30, 0, Math.PI * 2, false);
      this.c.strokeStyle= "#FFF";
      this.c.stroke();
    }

    for(let i=0; i < 1000; i++) {
      //this is done to end the previous line, otherwise the line and circle would be connected
      this.c.beginPath();
      //arc(x, y, r, startAngle, endAngle, counterClockwise)
      this.c.arc(500 + i/2, 50 + i, 30, 0, Math.PI * 2, false);
      this.c.strokeStyle= "red";
      this.c.stroke();
    }

  }

  handleResize = () => {
    this.canvasRef.current.width = window.innerWidth;
    this.canvasRef.current.height = window.innerHeight;

    this.drawCanvas();
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

export default Canvas
