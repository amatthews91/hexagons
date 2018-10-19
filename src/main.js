import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ width: 256, height: 256 });
document.body.appendChild(app.view);

const stage = app.stage;

// Calculate points of a hexagon where (x, y) are the coordinates of the centre
// r is the radius of the hexagon.
// Returns an array of points.
const calculateHexCoords = (x, y, r) => {
  //60 degrees in radians = 1.04718
  const offsetX = r * Math.cos(1.04718);
  const offsetY = r * Math.sin(1.04718);

  return [
    new PIXI.Point(x+r, y),
    new PIXI.Point(x+offsetX, y+offsetY),
    new PIXI.Point(x-offsetX, y+offsetY),
    new PIXI.Point(x-r, y),
    new PIXI.Point(x-offsetX, y-offsetY),
    new PIXI.Point(x+offsetX, y-offsetY),
    new PIXI.Point(x+r, y),
  ];
};

for (let i = 20; i < 260; i += 40) {
  const coordinates = calculateHexCoords(i, 20, 20);

  const nextHex = new PIXI.Graphics()
    .lineStyle(1, 0xFFFFFF)
    .drawPolygon(coordinates);
  // nextHex.hitArea = new PIXI.Polygon(coordinates);
  // nextHex.interactive = true;
  // nextHex.mouseover = (data) => {
  //   console.log(data);
  // };
  stage.addChild(nextHex);
}
