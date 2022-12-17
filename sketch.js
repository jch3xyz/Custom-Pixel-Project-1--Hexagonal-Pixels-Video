//https://www.redblobgames.com/grids/hexagons/
//https://www.youtube.com/watch?v=rNqaw8LT2ZU&ab_channel=TheCodingTrain

/*creates a downscaled resolution video, and iterates through that smaller amount of pixels before upscaling the calculation results to the full canvas to improve performance*/

let capture;
let vScale = 10;
let slider;
let p;
let canvas;
let scl = 25;

function setup() {
  canvas = createCanvas(windowWidth * (16 / scl), windowHeight * (9 / scl));
  canvas.parent("sketch-holder");

  capture = createCapture(VIDEO);
  capture.size(width / vScale, height / vScale);
  capture.hide();

  angleMode(DEGREES);

  p = createP("Resolution");
  p.style("color", "white");
  p.parent("sketch-holder");

  slider = createSlider(120, 1080, 480, 120);
  slider.parent("sketch-holder");
}

function draw() {
  //background(220);

  let r = width / slider.value();
  let h = 2 * r;
  let w = Math.sqrt(3) * r;

  capture.loadPixels();
  let counter = 0;
  for (let y = 0; y < capture.height + r; y += (3 * h) / 4) {
    for (let x = 0; x < capture.width + r; x += w) {
      fill(capture.get(capture.width - x - 1, y));
      if (counter % 2 != 0)
        hexagon((x + w / 2) * vScale, y * vScale, r * vScale);
      else hexagon(x * vScale, y * vScale, r * vScale);
    }
    counter++;
  }
}

function hexagon(x, y, r) {
  //how to make a hexagon
  push();
  translate(x, y);
  noStroke();
  beginShape();
  for (let i = 0; i < 7; i++) {
    let angle = 60 * i - 30;
    vertex(r * cos(angle), r * sin(angle));
  }
  endShape();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth * (16 / scl), windowHeight * (9 / scl));
}
