import * as PIXI from 'pixi.js';

import Tile from './tile';

const width = 512;
const height = 512;
const app = new PIXI.Application({ width, height });
const renderer = app.renderer;
const stage = app.stage;
document.body.appendChild(app.view);

const startingTile = Tile.build(width / 2, height / 2, 20);
stage.addChild(startingTile.shape);

startingTile.shape.mouseover = () => {
  startingTile.shape.clear();
  startingTile.shape.beginFill(0x00FFFF);
  startingTile.shape.lineStyle(1, 0xFFFFFF)
  startingTile.shape.drawPolygon(startingTile.points);

  startingTile.getSurroundingTiles().forEach(hex => stage.addChild(hex.shape));

  renderer.render(stage);
};

startingTile.shape.mouseout = () => {
  startingTile.shape.clear();
  startingTile.shape.beginFill(0x000000);
  startingTile.shape.lineStyle(1, 0xFFFFFF)
  startingTile.shape.drawPolygon(startingTile.points);

  renderer.render(stage);
}