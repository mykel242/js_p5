const colorsRed   = [];
const colorsGreen = [];
const colorsBlue  = [];

function initColorMap(max) {
  const saturation = 255;
  const brightness = 150;
  for(let n = 0; n < max; n++) {
    let hue   = sqrt(n/max);
    let tempcolor  = color(hue, saturation, brightness);
    colorsRed[n]   = red(tempcolor);
    colorsGreen[n] = green(tempcolor);
    colorsBlue[n]  = blue(tempcolor);
  }
}

function setPixelValue(x,y, v) {
  setPixelRGB(x, y, {red: v, green: v, blue: v});
}

function setPixelRGB(x, y, c) {
  let pix = (x + y * width) * 4;
  pixels[pix + 0] = c.red;
  pixels[pix + 1] = c.green;
  pixels[pix + 2] = c.blue;
}
