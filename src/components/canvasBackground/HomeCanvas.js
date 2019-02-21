
export default class HomeCanvas {
  constructor(context) {
    this.reconstructionSpeed = 4;
    this.c = context;
    this.circleAmmount = 110;
    this.distanceX = 0.5;
    this.distanceY = 1.2;
    this.snakeNumber = 5;
    this.circles = [];
    this.colors = [
      "#0d14ed",
      "#1b22f3",
      "#2e34f4",
      "#4046f5",
      "#5358f6"
    ];

    this.req = null;


    this.mouse = {
      x: null,
      y: null
    }


    this.init();
    window.addEventListener('mousemove', this.trackMouse);
  }

  removeListeners = () => {
    window.removeEventListener('mousemove', this.trackMouse);
  }

  stop = () => {
    cancelAnimationFrame(this.req);
  }

  trackMouse = (event) => {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
  }

  init = () => {
    this.circles = [];
    const radius = 1;
    const initialPositionX = (window.innerWidth - ((radius*2+this.distanceX)*this.circleAmmount))/2;
    const initialPositionY = (window.innerHeight - radius*2)/2 - 80;
      for(let sN = 0; sN < this.snakeNumber ; sN++){
        for(let i = 0; i < this.circleAmmount; i++){
          this.circles.push(
            new Circle(
              initialPositionX + (radius*2+this.distanceX)*i,
              sN*this.distanceY + initialPositionY,
              this.colors[sN],
              radius,
              Math.PI*2/this.circleAmmount * i,
              10,
              this
            )
          );
        }
      }
  }

  draw = () => {
    const animate = () => {
      this.req = requestAnimationFrame(animate);
      //clears part the canvas
      // startX, startY, endX, endY
      this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.circles.forEach(circle => {
        circle.update()
      });
    }

    animate();
  }

  resize=() => {
    this.init();
  }
}

class Circle {
  constructor(x, y, color, radius, angle, height, parent) {
    this.x = x;
    this.y = y;
    this.deltaX = 0;
    this.deltaY = 0;
    this.adjustedX = this.x;
    this.adjustedY = this.y;

    this.color = color;
    this.radius = radius;
    this.adjustedSize = this.radius;

    this.c = parent.c;
    this.mouse = parent.mouse;
    this.reconstructionSpeed = parent.reconstructionSpeed;

    this.angle = angle;
    this.height = height;
  }

  getSizeOfExplosion = (type) => {
    let size = null;
    switch(type) {
      case "height":
        size = window.innerHeight;
        break;
      case "width":
        size = window.innerWidth;
        break;
      default:
        size = window.innerWidth;
        break;
    }
    const x = Math.floor(Math.floor((Math.random()-0.5) * (size/5)) /  this.reconstructionSpeed) * this.reconstructionSpeed;
    return x;
  }

  adjustCoordinate = (coord) => {
    let currentCordAdjusted = null;
    let currentCord = null;
    switch(coord) {
      case "x":
        currentCordAdjusted = this.adjustedX;
        currentCord = this.x;
        break;
      case "y":
        currentCordAdjusted = this.adjustedY
        currentCord = this.y;
        break;
      default:
        currentCordAdjusted = this.adjustedX
        currentCord = this.x;
        break;
    }
    if(currentCordAdjusted !== currentCord) {
      currentCordAdjusted= currentCordAdjusted > currentCord ? currentCordAdjusted-this.reconstructionSpeed : currentCordAdjusted+this.reconstructionSpeed;
      if(Math.abs(currentCordAdjusted - currentCord) <= this.reconstructionSpeed) {
        if(coord === "x") {
          this.adjustedX = this.x;
        }
        else if(coord === "y") {
          this.adjustedY = this.y;
        }
      }
    }

    else {
      const propulsionX = this.getSizeOfExplosion("width");
      const propulsionY = this.getSizeOfExplosion("height");
      this.adjustedX += propulsionX;
      this.adjustedY += propulsionY;
    }
  }

  draw = () => {
    this.c.beginPath();
    //arc(x, y, r, startAngle, endAngle, counterClockwise)
    this.c.arc(this.adjustedX, Math.sin(this.angle) * this.height + this.adjustedY, this.adjustedSize, 0, Math.PI * 2, false);
    this.c.strokeStyle = this.color;
    this.c.fillStyle = this.color;
    this.c.stroke();
    this.c.fill();

  }

  update = () => {
    this.angle += Math.PI/180*4;
    const xV = this.adjustedX - this.mouse.x;
    const yV = this.adjustedY - this.mouse.y;

    const mouseDistance = Math.sqrt( xV*xV + yV*yV );
    if(!window.USER_CAN_TOUCH) {
      if(mouseDistance <= 20) {
        this.adjustedSize = this.adjustedSize >= 2 ? this.adjustedSize : this.adjustedSize + 1;
        this.adjustCoordinate("x");
        this.adjustCoordinate("y");
      }

      else {
        this.adjustedSize = this.adjustedSize <= this.radius ? this.radius : this.adjustedSize - 1;
        if(this.adjustedX !== this.x) {
          this.adjustedX = this.adjustedX > this.x ? this.adjustedX-this.reconstructionSpeed : this.adjustedX+this.reconstructionSpeed;
          if(Math.abs(this.adjustedX - this.x) <= this.reconstructionSpeed) {
            this.adjustedX = this.x;
          }
        }

        if(this.adjustedY !== this.y) {
          this.adjustedY = this.adjustedY > this.y ? this.adjustedY-this.reconstructionSpeed : this.adjustedY+this.reconstructionSpeed;
          if(Math.abs(this.adjustedY - this.y) <= this.reconstructionSpeed) {
            this.adjustedY = this.y;
          }
        }
      }
    }

    this.draw();
  }
}
