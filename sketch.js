let fluid;
let gifLength = 180;
let canvas;

function setup() {
  var p5Canvas = createCanvas(N * scale, N * scale);
  canvas = p5Canvas;

  frameRate(22);

  fluid = new Fluid(0.1, 0, 0.001);
}

function draw() {
  background(0);

  let t = 0;

  let cx = int((0.5 * width) / scale);
  let cy = int((0.5 * height) / scale);
  fluid.addDensity(cx, cy, random(100, 200));

  let angle = noise(t) * TWO_PI;
  let v = p5.Vector.fromAngle(angle);
  v.mult(1);
  t += 100;
  fluid.addVelocity(cx, cy, v.x, v.y);

  fluid.buildFluid();
  fluid.renderFluid();
  fluid.addfadeFluid();
}
