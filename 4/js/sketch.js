let X_max = 360;
let Y_max = 640;
let bkgColor;
let actors = [];
let engine;
let world;
let ground;

let Engine = Matter.Engine,
    World  = Matter.World,
    Bodies = Matter.Bodies;

class MyBox {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  };

  draw() {

    this.x = this.body.position.x;
    this.y = this.body.position.y;

    push();
    translate(this.x, this.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    stroke(200);
    fill(0);
    strokeWeight(1);
    rect(0,0, this.width, this.height);
    pop();
  }
}

function addToWorld(actor) {
  let options = {
    friction: 0.1,
    restitution: 0.0,
  };
  actor.body = Bodies.rectangle(actor.x, actor.y, actor.width, actor.height, options);
  World.add(world, actor.body);
  print(actor);
}

function addGround() {
  let options = {
    isStatic: true,
    friction: 0.0,
    restitution: 0.0,
  };
  ground = Bodies.rectangle(width/2, height, width, 20, options);
  World.add(world, ground);
}

function drawGround() {
  rectMode(CENTER);
  noStroke();
  fill(90,90,180);
  rect(width/2, height, width, 20);
}

function mousePressed() {

  let i = actors.push(new MyBox(mouseX,mouseY,
    random(10,50),random(10,50)));
  addToWorld(actors[i-1]);
}

function setup() {
  bkgColor = color('hsb(210, 45%, 60%)');
  createCanvas(X_max, Y_max);
  engine = Engine.create();
  world  = engine.world;

  addGround();

  Engine.run(engine);
}

function draw() {
  background(bkgColor);
  drawGround();
  actors.forEach(function (a) {
    a.draw();
  });

}
