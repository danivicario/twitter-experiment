// Dani Vicario - prueba experiment (canvas)- Wed 6 Nov 2019 00:12:11 CET

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
  "source-over": "source-over",
  "source-in": "source-in",
  "source-out": "source-out",
  "source-atop": "source-atop",
  "destination-over": "destination-over",
  "destination-in": "destination-in",
  "destination-out": "destination-out",
  "destination-atop": "destination-atop",
  "lighter": "lighter",
  "copy": "copy",
  "xor": "xor",
  "multiply": "multiply",
  "screen": "screen",
  "overlay": "overlay",
  "darken": "darken",
  "lighten": "lighten",
  "color-dodge": "color-dodge",
  "color-burn": "color-burn",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  "difference": "difference",
  "exclusion": "exclusion",
  "hue": "hue",
  "saturation": "saturation",
  "color": "color",
  "luminosity": "luminosity"
};

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext("2d");

// eslint-disable-next-line no-unused-vars
const w = window.innerWidth;
// eslint-disable-next-line no-unused-vars
const h = window.innerHeight;
// eslint-disable-next-line no-unused-vars
const w2 = w / 2;
// eslint-disable-next-line no-unused-vars
const h2 = h / 2;
// eslint-disable-next-line no-unused-vars
const { PI } = Math;
// eslint-disable-next-line no-unused-vars
const PI_DOUBLE = 2 * Math.PI;
// eslint-disable-next-line no-unused-vars
const PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// eslint-disable-next-line no-unused-vars
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

// eslint-disable-next-line no-unused-vars
const randomArrayPosition = (array) => array[randomInt(0, array.length - 1)];

// ctx.globalCompositeOperation = globalCompositeOperationModes.difference;

function getDataModel(e, size, gap) {
  const circles = [];
  let i = 0;

  for (let column = 0; column < e; column += 1) {
    if (!(e % 2)) i++;
    for (let row = 0; row < e; row += 1) {
      i++;
      circles.push({
        row: row * gap,
        col: column * gap,
        color: randomArrayPosition(["#0d0208", "#003b00", "#008f11", "#00ff41"]), // i % 2 ? "#ff0000ff" : "#000000ff", //`#${((Math.random() * 0xffffff) << 0).toString(16)}`,
        fType: randomInt(1, 3)
      });
    }
  }
  return circles;
}
function makeMatrix(circles, size, xxx) {
  circles.forEach((x, idx) => {
    let fn;

    if (x.fType === 1) fn = Math.tan;
    if (x.fType === 2) fn = Math.cos;
    if (x.fType === 3) fn = Math.cos;

    ctx.beginPath();
    ctx.fillStyle = `${x.color}`;
    let r = Math.abs(size * fn((360 * Math.PI) / 180)) * xxx + randomFloat(0.1, 1.9);
    // r *= ;
    ctx.arc(x.row, x.col, r, 0, PI_DOUBLE);
    ctx.fill();
    // ctx.lineWidth = 0.5;
    // ctx.stroke();
    ctx.closePath();
  });
}

let xxx = 1;
const e = 100;
const size = 5;
const gap = 20;
const circles = getDataModel(e, size, gap, xxx);

let intervalID = setInterval(() => {
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(w2 - (e * gap) / 2, h2 - (e * gap) / 2);
  // xxx += 0.005;
  makeMatrix(circles, size, xxx);
  ctx.restore();

  if (xxx > 30) clearInterval(intervalID);
}, 10);
