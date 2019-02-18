
export default class HomeCanvas {
  constructor(context) {
    this.c = context;
    this.circleAmmount = 110;
    this.distance = 3;
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
    window.addEventListener('mousemove', (event) => {this.trackMouse(event)})
  }

  trackMouse = (event) => {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
  }

  init = () => {
    this.circles = [];
    const radius = 1.3;
    const initialPositionX = (window.innerWidth - ((radius*2+this.distance)*this.circleAmmount))/2;
    const initialPositionY = (window.innerHeight - radius*2)/2;
      for(let sN = 0; sN < this.snakeNumber ; sN++){
        for(let i = 0; i < this.circleAmmount; i++){
          this.circles.push(
            new Circle(
              initialPositionX + (radius*2+this.distance)*i,
              sN*this.distance + initialPositionY,
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

    this.angle = angle;
    this.height = height;
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
    if(mouseDistance <= 100) {
      this.adjustedSize = this.adjustedSize >= 3 ? this.adjustedSize : this.adjustedSize + 1;

      if(this.adjustedX !== this.x) {
        this.adjustedX = this.adjustedX > this.x ? this.adjustedX-1 : this.adjustedX+1;
      }

      else {
        const propulsionX = Math.floor((Math.random()-0.5) * (window.innerWidth/2));
        const propulsionY = Math.floor((Math.random()-0.5) * (window.innerHeight/5));
        this.adjustedX += propulsionX;
        this.adjustedY += propulsionY;
      }

      if(this.adjustedY !== this.y) {
        this.adjustedY = this.adjustedY > this.y ? this.adjustedY-1 : this.adjustedY+1;
      }

      else {
        const propulsionX = Math.floor((Math.random()-0.5) * (window.innerWidth/2));
        const propulsionY = Math.floor((Math.random()-0.5) * (window.innerHeight/5));
        this.adjustedY += propulsionX;
        this.adjustedX += propulsionY;
      }
    }

    else {
      this.adjustedSize = this.adjustedSize <= this.radius ? this.radius : this.adjustedSize - 1;
      if(this.adjustedX !== this.x) {
        this.adjustedX = this.adjustedX > this.x ? this.adjustedX-1 : this.adjustedX+1;
      }

      if(this.adjustedY !== this.y) {
        this.adjustedY = this.adjustedY > this.y ? this.adjustedY-1 : this.adjustedY+1;
      }
    }

    this.draw();
  }
}
