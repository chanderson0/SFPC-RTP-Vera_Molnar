var c;

var N_XY = 30;
var GRID_MARGIN = 20;
var GRID_START_X = 0;
var GRID_START_Y = 0;
var LINE_LENGTH = 30;
var STROKE_WEIGHT = 1;
var STROKE_COLOR = '#555';
var BACKGROUND_COLOR = '#EDEDE6';

// -------------
// Setup
// -------------
function setup() {
  c = createCanvas(windowWidth, windowHeight);

  GRID_START_X = windowWidth / 2.0 - N_XY / 2.0 * GRID_MARGIN;
  GRID_START_Y = windowHeight / 2.0 - N_XY / 2.0 * GRID_MARGIN;

  noLoop();
}

// -------------
// Draw
// -------------
function draw() {
  background(BACKGROUND_COLOR);
  noFill();
  stroke(STROKE_COLOR);
  strokeWeight(STROKE_WEIGHT);

  for (var i = 0; i < N_XY; ++i) {
    for (var j = 0; j < N_XY; ++j) {
      push();

      translate(i * GRID_MARGIN + GRID_START_X, j * GRID_MARGIN + GRID_START_Y);
      rotate(PI * 2 * random());
      line(-LINE_LENGTH / 2.0, 0, LINE_LENGTH / 2.0, 0);


      pop();
    }
  }
}

function mouseClicked() {
  redraw();
}
