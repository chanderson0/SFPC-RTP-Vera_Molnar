var c;

var N_XY = 60;
var GRID_MARGIN = 10;
var GRID_START_X = 0;
var GRID_START_Y = 0;
var LINE_LENGTH = 18;
var STROKE_WEIGHT = 1;
var STROKE_COLOR = '#555';
var BACKGROUND_COLOR = '#FBFAF2';

var N_GAPS = 10;
var P_GAP_CONTINUE = 0.2;

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

  var lineGrid = [];
  for (var i = 0; i < N_XY; ++i) {
    var lineRow = [];
    for (var j = 0; j < N_XY; ++j) {
      lineRow.push(true);
    }
    lineGrid.push(lineRow);
  }

  var gaps = N_GAPS;
  while (gaps > 0) {
    var i = floor(random() * N_XY);
    var j = floor(random() * N_XY);

    if (!lineGrid[i][j]) continue;

    walkLines(i, j, lineGrid);
    --gaps;
  }

  for (var i = 0; i < N_XY; ++i) {
    for (var j = 0; j < N_XY; ++j) {
      if (!lineGrid[i][j]) continue;

      push();

      translate(i * GRID_MARGIN + GRID_START_X, j * GRID_MARGIN + GRID_START_Y);
      rotate(PI * 2 * random());
      line(-LINE_LENGTH / 2.0, 0, LINE_LENGTH / 2.0, 0);

      pop();
    }
  }
}

function walkLines(i, j, grid) {
  // console.log('walked', i, j);
  if (!grid[i][j]) return;

  grid[i][j] = false;

  for (var di = -1; di <= 1; ++di) {
    for (var dj = -1; dj <= 1; ++dj) {
      var i2 = i + di;
      var j2 = j + dj;

      if (i2 < 0 || i2 >= grid.length || j2 < 0 || j2 >= grid[i].length)
        continue;

      if (random() < P_GAP_CONTINUE) {
        walkLines(i + di, j + dj, grid);
      }
    }
  }
}

function mouseClicked() {
  redraw();
}
