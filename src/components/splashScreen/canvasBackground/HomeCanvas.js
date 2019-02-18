
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

    this.mouse = {
      x: null,
      y: null
    }


    this.init();
    window.USER_CAN_TOUCH = false;
    window.addEventListener('mousemove', (event) => {this.trackMouse(event)});
    window.addEventListener('touchstart', (event) => {this.onFirstTouch(event)}, false);

    window.setTimeout(() => {
      window.removeEventListener('touchstart', this.onFirstTouch, false);
    },  60000);
  }


  onFirstTouch = (event) => {
    window.USER_CAN_TOUCH = true;
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
      requestAnimationFrame(animate);
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

  getWidthOfExplosion = () => {
    const x = Math.floor(Math.floor((Math.random()-0.5) * (window.innerWidth/5)) /  this.reconstructionSpeed) * this.reconstructionSpeed;
    return x;
  }

  getHeightOfExplosion = () => {
    const y = Math.floor(Math.floor((Math.random()-0.5) * (window.innerHeight/5)) /  this.reconstructionSpeed) * this.reconstructionSpeed;
    return y;
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
    if(mouseDistance <= 40) {
      if(!window.USER_CAN_TOUCH) {
        this.adjustedSize = this.adjustedSize >= 3 ? this.adjustedSize : this.adjustedSize + 1;
        if(this.adjustedX !== this.x) {
          this.adjustedX = this.adjustedX > this.x ? this.adjustedX-this.reconstructionSpeed : this.adjustedX+this.reconstructionSpeed;
          if(Math.abs(this.adjustedX - this.x) <= this.reconstructionSpeed) {
            this.adjustedX = this.x;
          }
        }

        else {
          const propulsionX = this.getWidthOfExplosion();
          const propulsionY = this.getHeightOfExplosion();
          this.adjustedX += propulsionX;
          this.adjustedY += propulsionY;
        }

        if(this.adjustedY !== this.y) {
          this.adjustedY = this.adjustedY > this.y ? this.adjustedY-this.reconstructionSpeed : this.adjustedY+this.reconstructionSpeed;
          if(Math.abs(this.adjustedY - this.y) <= this.reconstructionSpeed) {
            this.adjustedY = this.y;
          }
        }

        else {
          const propulsionX = this.getWidthOfExplosion();
          const propulsionY = this.getHeightOfExplosion();
          this.adjustedY += propulsionX;
          this.adjustedX += propulsionY;
        }
      }
    }

    else {
      if(!window.USER_CAN_TOUCH) {
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
