var c;

var SQUARE_SIZE = 500;
var MARGIN = 10;
var N_SQ = 20;
var SIZE_STEP = 24;
var RANDOM_SCALE = 2;
var BEZIER_SCALE = 0.3 * 20;

// -------------
// Setup
// -------------
function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noLoop();
}

// -------------
// Draw
// -------------
function draw() {
  background('#EDEDE6');
  noFill();
  stroke('#555');
  strokeWeight(0.7);

  var size = SQUARE_SIZE - MARGIN;

  push();
    translate(width / 2, height / 2);

    for (var n = 0; n < N_SQ; ++n) {
      var xL = -size / 2 + randomGaussian(0, RANDOM_SCALE);
      var yU = -size / 2 + randomGaussian(0, RANDOM_SCALE);
      var xR =  size / 2 + randomGaussian(0, RANDOM_SCALE);
      var yB =  size / 2 + randomGaussian(0, RANDOM_SCALE);

      beginShape();

      bezierSome(xL, yU, xR, yU);
      bezierSome(xR, yU, xR, yB);
      bezierSome(xR, yB, xL, yB);
      bezierSome(xL, yB, xL, yU);

      endShape();

      size -= SIZE_STEP;
    }
  pop();
}

function bezierSome(x1, y1, x4, y4) {
  var dx = x4 - x1;
  var dy = y4 - y1;
  var alongX = abs(dy) < 1;

  dx = abs(dx) > 1 ? dx * 0.5 : randomGaussian(-1, 1) * BEZIER_SCALE;
  dy = abs(dy) > 1 ? dy * 0.5 : randomGaussian(-1, 1) * BEZIER_SCALE;

  var x2, y2, x3, y3;
  if (alongX) {
    x2 = x1 + dx;
    x3 = x4 - dx;

    if (random() < 0.5) {
      y2 = y1 + dy;
      y3 = y4 + dy;
    } else {
      y2 = y1 - dy;
      y3 = y4 - dy;
    }
  } else {
    y2 = y1 + dy;
    y3 = y4 - dy;

    if (random() < 0.5) {
      x2 = x1 + dx;
      x3 = x4 + dx;
    } else {
      x2 = x1 - dx;
      x3 = x4 - dx;
    }
  }

  bezier(x1, y1, x2, y2, x3, y3, x4, y4);
}

function mouseClicked() {
  redraw();
}
