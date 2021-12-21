  const maxiterations = 100;

  const full_mbrot = {
    min_real:      -1.75,
    max_real:       0.75,
    min_imaginary: -1.25,
    max_imaginary:  1.25,
  };

  const julia_seed_1 = {
    real: -0.707176,
    imaginary: -0.3842,
  };

  const julia_seed_2 = {
    real: -0.602,
    imaginary: -0.447,
  };

  /* mandelbrot and Julia Fractal equations */
  /*
      f(z) = z^2 + c
      C = ( a + bi) * ( a + bi)
        =  a^2 + abi + abi + (bi)^2
        = a^2 + 2abi - b^2
        = (a^2 - b^2) + 2abi
  */

  function mandelbrot(a, b, max) {
    let ca = a; // C.real
    let cb = b; // C.imaginary
    let iterations = 0;
    while (iterations < max) {
      let aa = a * a - b * b;
      let bb = 2 * a * b;
      a = aa + ca;
      b = bb + cb;
      if (a + b > 4) break;
      iterations++;
    }
    return iterations;
  }

  function julia(a, b, ak, bk, max) {
      let iterations = 0;
      while (iterations < max) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ak;
        b = bb + bk;
        if (a + b > 4) break;
        iterations++;
      }
      return iterations;
  }
