const colors = [
  "#78FFD6",
  "#E1FAF9",
  "#0AD3FF",
  "#C3979F",
  "#023C40"
]

const generateRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
}

export default class PracticeCanvas {
  constructor(context) {
    this.circleAmmount = 800;
    this.c = context;
    this.circleArray = [];
    this.mouse = {
      x: null,
      y: null
    }

    this.init();
    window.addEventListener('mousemove', (event) => {this.trackMouse(event)});
  }

  trackMouse = (event) => {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
  }

  init = () => {
    for(let i=0; i < this.circleAmmount; i++) {
      const radius = Math.floor(Math.random() * ((7 - 1) + 1));
      this.circleArray.push(
        new Circle(
          Math.random() * (window.innerWidth - (radius*2)) + radius,
          Math.random() * (window.innerHeight - (radius*2)) + radius,
          generateRandomColor(),
          radius,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          this
        )
      );
    }
  }

  //loop function to redraw part of the canvas that is given in the function
  draw = () => {
    const animate = () => {
      requestAnimationFrame(animate);
      //clears part the canvas
      // startX, startY, endX, endY
      this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);
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
      this.color = generateRandomColor();
    }

    if(this.y + this.radius >= window.innerHeight ||
      this.y - this.radius <= 0) {
      this.dy *= -1;
      this.color = generateRandomColor();
    }

    if(mouseDistance <= 100) {
      this.adjustedSize = this.adjustedSize >= 20 ? this.adjustedSize : this.adjustedSize + 1;
    }

    else {
      this.adjustedSize = this.adjustedSize <= this.radius ? this.radius : this.adjustedSize - 1;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}
