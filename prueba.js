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

function makeMatrix(e, size, gap, xxx) {
  ctx.save();
  ctx.translate(w2 - (e * gap) / 2, h2 - (e * gap) / 2);
  const circles = [];
  let i = 0;

  for (let column = 0; column < e; column += 1) {
    if (!(e % 2)) i++;
    for (let row = 0; row < e; row += 1) {
      i++;
      circles.push([row * gap, column * gap, !(i % 2) ? "#ff0000ff" : "#000000ff"]);
    }
  }

  circles.forEach((x, idx) => {
    ctx.beginPath();
    ctx.fillStyle = `${x[2]}`;
    ctx.arc(
      x[0] + size,
      x[1] + size,
      Math.abs(size * Math.sin(((idx / 45) * Math.PI) / 180)) * xxx,
      0,
      PI_DOUBLE
    );
    // ctx.fill();
    ctx.stroke();
    ctx.closePath();
  });
  ctx.restore();
}

let xxx = 1;
setInterval(() => {
  xxx += 0.01;
  ctx.clearRect(0, 0, w, h);
  makeMatrix(60, 10, 30, xxx);
}, 10);
