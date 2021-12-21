// not with box2d
let particles = [];
let max_particles = 1000;
let X_max = 360;
let Y_max = 640;
let R_max = 20;
let bkgColor;

class Particle {
  constructor() {
    this.startPosition = createVector(0, 0);
    this.position = createVector(0, 0);
    this.radius = 0;
    let nudge = random(-0.25,0.5);
    this.velocity = createVector(nudge,0);

    this.acceleration = 0.5;

    this.alpha = 75;
    //this.strokeColor = color(0,255,0);
    this.strokeColor =
      color(
        255,
        255,
        200,
        random(100)
      );
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

    this.velocity.y = sqrt(max(1, this.position.y)) * this.acceleration;
    this.position.add(this.velocity);

    this.alpha =  100 - (this.position.y / Y_max * 100);

  };

  reverse() {

    if (this.position.y < 0 - this.radius) {
      this.velocity.y = 1;
      this.position.y = Y_max + this.radius;
    }

    if (this.position.x > X_max + this.radius) {
      this.position.x = 0 - this.radius
    }

    this.velocity.y = -(sqrt(max(1, this.position.y)) * this.acceleration);
    this.position.add(this.velocity);

    this.alpha =  100 - (this.position.y / Y_max * 100);

  };


  render() {
    let c = color(0,0,255,this.alpha);
    fill(c);

    stroke(this.strokeColor);
    strokeWeight(1);

    ellipse(
      this.position.x,
      this.position.y,
      this.radius * 2.0);
  };
}


function randomColor() {
  let c = {
    red:   random(255),
    green: random(255),
    blue:  random(255),
  };
  return color(c.red, c.green, c.blue);
}

function setup() {
  createCanvas(X_max, Y_max);
  bkgColor = color('hsb(20, 65%, 100%)'); //randomColor();
  num_particles = random(500, max_particles);
  for (let i = 0; i < num_particles; i++) {
    particles[i] = new Particle();
    particles[i].setup(createVector(random(X_max), random(Y_max)));
    particles[i].radius = random(R_max);
  }

}

function draw() {

  background(bkgColor);

  for (let i = 0; i < particles.length; i++) {
    //particles[i].update();
    particles[i].acceleration = (mouseY - (height / 2)) / height;
    particles[i].update();


    particles[i].render();
  }


}
