import * as PIXI from 'pixi.js';

import Tile from './tile';

const width = 512;
const height = 512;
const app = new PIXI.Application({ width, height, antialias: true });
const renderer = app.renderer;
const stage = app.stage;
document.body.appendChild(app.view);

const TILE_RADIUS = 20;
const previewTiles = [];

const map = {
  tiles: []
};

const togglePreviewTiles = (selectedTile) => {
  if (previewTiles.length === 0) {
    selectedTile.select();
    const newPreviewTiles = selectedTile.getSurroundingTiles();
    previewTiles.push(...newPreviewTiles);
    previewTiles.forEach(tile => stage.addChild(tile.shape));
  } else {
    previewTiles.forEach(tile => stage.removeChild(tile.shape));
    previewTiles.splice(0, previewTiles.length);
  }

  renderer.render(stage);
};

const addPermanentTile = (x, y, renderer) => {
  const newTile = Tile.build(x, y, TILE_RADIUS);
  map.tiles.push(newTile);
  stage.addChild(newTile.shape);

  newTile.shape.mousedown = () => {
    togglePreviewTiles(newTile, renderer);
  };
};

addPermanentTile(width / 2, height / 2, TILE_RADIUS);
