// not with box2d
let particles = [];
let max_particles = 1000;
let num_particles = 1;
let X_max = 360;
let Y_max = 720; //640;
let R_max = 4;
let bkgColor;

class Particle {
  constructor() {
    this.startPosition = createVector(0, 0);
    this.position = createVector(0, 0);
    this.radius = 0;
    this.velocity = createVector(4,0);
  };

  setup(position) {
    this.startPosition = position;
    this.position = position;
  };


  update() {

    if (this.position.y > Y_max + this.radius) {
      this.velocity.y = 1;
      this.position.y = 0 - this.radius;
    }

    if (this.position.x > X_max + this.radius) {
      this.position.x = 0 - this.radius
    }

    this.velocity.y = sqrt(max(1, this.position.y));
    this.position.add(this.velocity);

  };

  render() {
    ellipse(
      this.position.x,
      this.position.y,
      this.radius * 2.0);
  };
}


function randomColor() {
  let color = {
    red:   random(255),
    green: random(255),
    blue:  random(255),
  };
  return color;
}

function setup() {
  createCanvas(X_max, Y_max);
  bkgColor = randomColor();
  num_particles = random(500, max_particles);
  for (let i = 0; i < num_particles; i++) {
    particles[i] = new Particle();
    particles[i].setup(createVector(random(X_max), random(Y_max)));
    particles[i].radius = random(R_max);
  }

}

function draw() {

  background(bkgColor.red, bkgColor.green, bkgColor.blue);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].render();
  }


}
