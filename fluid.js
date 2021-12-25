let N = 40;
let iter = 16;
let scale = 2;
let density = 0;

function IX(x, y) {
  x = constrain(x, 0, N - 1);
  y = constrain(y, 0, N - 1);
  return x + y * N;
}

class Fluid {
  constructor(dt, diff, visc) {
    this.size = N;
    this.dt = dt;
    this.diff = diff; // control the diffusion of the fluid (how much flow is happening)
    this.visc = visc; // control thickness of the fluid
    this.s = new Array(N * N).fill(0);
    this.density = new Array(N * N).fill(0);

    // velocity
    this.Vx = new Array(N * N).fill(0);
    this.Vy = new Array(N * N).fill(0);
    this.Vz = new Array(N * N).fill(0);

    // previos velocity
    this.Vx0 = new Array(N * N).fill(0);
    this.Vy0 = new Array(N * N).fill(0);
    this.Vz0 = new Array(N * N).fill(0);
  }

  buildFluid() {
    let N = this.size;
    let visc = this.visc;
    let diff = this.diff;
    let dt = this.dt;
    let Vx = this.Vx;
    let Vy = this.Vy;
    let Vz = this.Vz;
    let Vx0 = this.Vx0;
    let Vy0 = this.Vy0;
    let Vz0 = this.Vz0;
    let s = this.s;
    let density = this.density;

    diffuse(1, Vx0, Vx, visc, dt);
    diffuse(2, Vy0, Vy, visc, dt);

    project(Vx0, Vy0, Vx, Vy);

    advect(1, Vx, Vx0, Vx0, Vy0, dt);
    advect(2, Vy, Vy0, Vx0, Vy0, dt);

    project(Vx, Vy, Vx0, Vy0);

    diffuse(0, s, density, diff, dt);
    advect(0, density, s, Vx, Vy, dt);
  }

  addDensity(x, y, amount) {
    let index = IX(x, y);
    this.density[index] += amount;
  }

  addVelocity(x, y, mountX, mounty) {
    let index = IX(x, y);
    this.Vx[index] += mountX;
    this.Vy[index] += mounty;
  }

  addfadeFluid() {
    for (let i = 0; i < this.density.length; i++) {
      let d = this.density[i];
      this.density[i] = constrain(d - 19, 0, 255);
    }
  }

  renderFluid() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let x = i * scale;
        let y = j * scale;
        let d = this.density[IX(i, j)];
        fill(d);
        noStroke();
        ellipse(x, y, scale, scale);
      }
    }
  }
} // class bracket
