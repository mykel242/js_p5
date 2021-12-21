let canvas_frame = {
  width:  500,
  height: 500,
};

let cv = {};

function setup() {
  pixelDensity(1);
  //colorMode(HSB, 100);
  createCanvas(canvas_frame.width, canvas_frame.height);
  canvas_frame.aspect_ratio = canvas_frame.width / canvas_frame.height;
  background(0);

  cv.min_real       = full_mbrot.min_real;
  cv.max_real       = full_mbrot.max_real;
  cv.min_imaginary  = full_mbrot.min_imaginary;
  cv.max_imaginary  = full_mbrot.max_imaginary;
  cv.step_real      = (cv.max_real      - cv.min_real)      / canvas_frame.width;
  cv.step_imaginary = (cv.max_imaginary - cv.min_imaginary) / canvas_frame.height;
  cv.max            = 1000;

  //initColorMap(cv.max);
}

function mousePressed() {
  let a = map(mouseX, 0, canvas_frame.width,  cv.min_real, cv.max_real);
  let b = map(mouseY, 0, canvas_frame.height, cv.min_imaginary, cv. max_imaginary);

  // center the selected point
  let real_side = cv.max_real - cv.min_real;
  let imaginary_side = cv.max_imaginary - cv.min_imaginary;
  cv.min_real = a - (real_side / 4);
  cv.max_real = a + (real_side / 4);
  cv.min_imaginary = b - (imaginary_side / 4);
  cv.max_imaginary = b + (imaginary_side / 4);

  redraw();

}

function draw() {

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let a = map(x, 0, canvas_frame.width,
        cv.min_real,
        cv.max_real);

      let b = map(y, 0, canvas_frame.height,
        cv.min_imaginary,
        cv.max_imaginary);

      let iterations = mandelbrot(a, b, cv.max);
      // let iterations = julia(a, b,
      //   julia_seed_2.real,
      //   julia_seed_2.imaginary, maxiterations);

        if (iterations == cv.max) {
            setPixelValue(x,y,0);
        } else {


          let bright = map(iterations, 0, cv.max, 0, 1);
          let red   = map(sqrt(bright), 0, 1, 0, 255);
          let blue   = map(sqrt(bright), 0, 1, 0, 255);
          setPixelRGB(x,y, {
            red: red,
            green: 0,
            blue: blue,
          });

        }

    }
  }
  updatePixels();
  noLoop();
}
