var c;

var SQUARE_SIZE = 600;
var MARGIN = 10;
var N_SQ = 26;
var SIZE_STEP = 23;
var RANDOM_SCALE = 4;
var BEZIER_SCALE = 0.03;

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
  strokeWeight(1.5);

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
  var alongX = dy == 0;

  dx = dx ? dx : randomGaussian(-BEZIER_SCALE, BEZIER_SCALE) * dy;
  dy = dy ? dy : randomGaussian(-BEZIER_SCALE, BEZIER_SCALE) * dx;

  var x2 = x1 + alongX ? dx : dx;
  var y2 = y1 + alongX ? dy : dy;
  var x3 = x4 + alongX ? dx : dx;
  var y3 = y4 + alongX ? dy : dy;

  bezier(x1, y1, x2, y2, x3, y3, x4, y4);
}

function mouseClicked() {
  redraw();
}
