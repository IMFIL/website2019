
const generateInitialSettingsForCircle = () => {
  let settings = {};

  const random = Math.random();

  if(random <= 0.6) {
    settings.color = "#121212";
    settings.radius = 10;
    settings.dx =(Math.random() - 0.5) * ((10 - 5) + 5);
    settings.dy =(Math.random() - 0.5) * ((10 - 5) + 5);
  }

  else if(random <= 0.93) {
    settings.color = "#000";
    settings.radius = 0.5;
    settings.dx =(Math.random() - 0.5) * ((2 - 1) + 1);
    settings.dy =(Math.random() - 0.5) * ((2 - 1) + 1);
  }

  else {
    settings.color = "#0D14ED";
    settings.radius = 0.5;
    settings.dx =(Math.random() - 0.5) * ((2 - 1) + 1);
    settings.dy =(Math.random() - 0.5) * ((2 - 1) + 1);
  }

  return settings;
}

export default class AboutCanvas {
  constructor(context) {
    this.circleAmmount = 100;
    this.c = context;
    this.circleArray = [];
    this.mouse = {
      x: null,
      y: null
    }
    this.req = null;

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
    this.circleArray = [];
    for(let i=0; i < this.circleAmmount; i++) {
      const settings = generateInitialSettingsForCircle();
      const radius = settings.radius;
      const color = settings.color;
      const dx = settings.dx;
      const dy = settings.dy;

      this.circleArray.push(
        new Circle(
          Math.random() * (window.innerWidth - (radius*2)) + radius,
          Math.random() * (window.innerHeight - (radius*2)) + radius,
          color,
          radius,
          dx,
          dy,
          this
        )
      );
    }
  }

  //loop function to redraw part of the canvas that is given in the function
  draw = () => {
    const animate = () => {
      this.req = requestAnimationFrame(animate);
      //clears part the canvas
      // startX, startY, endX, endY
      //this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.circleArray.forEach(circle => {
        circle.update();
      });
    }

    animate();
  }

  resize=() => {
    this.init();
  }
}

class Circle {
  constructor(x, y, color, radius, dx, dy, parent) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.c = parent.c;
    this.mouse = parent.mouse;

    this.adjustedSize = this.radius;

    this.dx = dx;
    this.dy = dy;
  }

  draw = () => {
    this.c.beginPath();
    //arc(x, y, r, startAngle, endAngle, counterClockwise)
    this.c.arc(this.x, this.y, this.adjustedSize, 0, Math.PI * 2, false);
    this.c.strokeStyle = this.color;
    this.c.fillStyle = this.color;
    this.c.stroke();
    this.c.fill();

  }

  update = () => {
    const xV = this.x - this.mouse.x;
    const yV = this.y - this.mouse.y;

    const mouseDistance = Math.sqrt( xV*xV + yV*yV );

    if(this.x + this.radius >= window.innerWidth ||
      this.x - this.radius <= 0) {
      this.dx *= -1;
    }

    if(this.y + this.radius >= window.innerHeight ||
      this.y - this.radius <= 0) {
      this.dy *= -1;
    }

    // if(mouseDistance <= 100) {
    //   this.adjustedSize = this.adjustedSize >= 3 ? this.adjustedSize : this.adjustedSize + 1;
    // }
    //
    // else {
    //   this.adjustedSize = this.adjustedSize <= this.radius ? this.radius : this.adjustedSize - 1;
    // }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}
