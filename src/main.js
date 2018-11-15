import * as PIXI from 'pixi.js';

const width = 512;
const height = 512;
const app = new PIXI.Application({ width, height });
const renderer = app.renderer;
const stage = app.stage;
document.body.appendChild(app.view);


// Draws a hexagon where (x, y) are the coordinates of the centre
// r is the radius of the hexagon.
// returns: shape Polygon object
const getHex = (x, y, r, renderer, stage) => {
  //60 degrees in radians = 1.04718
  const offsetX = r * Math.cos(1.04718);
  const offsetY = r * Math.sin(1.04718);

  const points = [
    new PIXI.Point(x+r, y),
    new PIXI.Point(x+offsetX, y+offsetY),
    new PIXI.Point(x-offsetX, y+offsetY),
    new PIXI.Point(x-r, y),
    new PIXI.Point(x-offsetX, y-offsetY),
    new PIXI.Point(x+offsetX, y-offsetY),
    new PIXI.Point(x+r, y),
  ];

  const shape = new PIXI.Graphics()
    .lineStyle(1, 0xFFFFFF)
    .drawPolygon(points);

  shape.hitArea = new PIXI.Polygon(points);
  shape.interactive = true;
  shape.mouseover = () => {
    shape.clear();
    shape.beginFill(0x00FFFF);
    shape.lineStyle(1, 0xFFFFFF)
    shape.drawPolygon(points);

    renderer.render(stage);
  };

  shape.mouseout = () => {
    shape.clear();
    shape.beginFill(0x000000);
    shape.lineStyle(1, 0xFFFFFF)
    shape.drawPolygon(points);

    renderer.render(stage);
  }

  return shape;
}

const startingPoint = getHex(width / 2, height / 2, 20, renderer, stage);
stage.addChild(startingPoint);