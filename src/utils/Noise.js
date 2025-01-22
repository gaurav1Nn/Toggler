class Grad {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  dot2(x, y) {
    return this.x * x + this.y * y;
  }
}

export class Noise {
  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1,1,0), new Grad(-1,1,0), new Grad(1,-1,0), new Grad(-1,-1,0),
      new Grad(1,0,1), new Grad(-1,0,1), new Grad(1,0,-1), new Grad(-1,0,-1),
      new Grad(0,1,1), new Grad(0,-1,1), new Grad(0,1,-1), new Grad(0,-1,-1)
    ];

    this.p = new Array(256);
    for (let i = 0; i < 256; i++) {
      this.p[i] = i;
    }

    this.perm = new Array(512);
    this.gradP = new Array(512);

    this.seed(seed);
  }

  seed(seed) {
    if (seed > 0 && seed < 1) {
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }

    for (let i = 0; i < 256; i++) {
      let v;
      if (i & 1) {
        v = this.p[i] ^ (seed & 255);
      } else {
        v = this.p[i] ^ ((seed >> 8) & 255);
      }

      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }

  perlin2(x, y) {
    const X = Math.floor(x);
    const Y = Math.floor(y);
    x = x - X;
    y = y - Y;
    const xi = X & 255;
    const yi = Y & 255;

    const n00 = this.gradP[xi + this.perm[yi]].dot2(x, y);
    const n01 = this.gradP[xi + this.perm[yi + 1]].dot2(x, y - 1);
    const n10 = this.gradP[xi + 1 + this.perm[yi]].dot2(x - 1, y);
    const n11 = this.gradP[xi + 1 + this.perm[yi + 1]].dot2(x - 1, y - 1);

    const u = this.fade(x);

    return this.lerp(
      this.lerp(n00, n10, u),
      this.lerp(n01, n11, u),
      this.fade(y)
    );
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }
} 