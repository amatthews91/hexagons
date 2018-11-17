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

function selectTile(selectedTile) {
  map.tiles.forEach(tile => tile.deselect());

  if (selectedTile.isPreview) {
    // If tile selected is preview, we will remove all preview tiles and add a permanent in this place. Then select it.
    previewTiles.forEach(previewTile => stage.removeChild(previewTile.shape));
    previewTiles.splice(0, previewTiles.length);
    const newTile = addPermanentTile(selectedTile.x, selectedTile.y);
    selectTile(newTile);
  } else {
    // If the selected tile is permanent...
    if (previewTiles.length === 0) {
      // ...and there are NO preview tiles currently displayed...
      // ...then select the current tile and add the preview tiles surrounding it.
      selectedTile.select();
      const newPreviewTiles = selectedTile.getSurroundingTiles();
      previewTiles.push(...newPreviewTiles);

      previewTiles.forEach(tile => {
        stage.addChild(tile.shape);
        tile.shape.pointertap = () => {
          selectTile(tile);
        }
      });
    } else {
      // ...and there ARE preview tiles currently displayed...
      // ...then make sure the tile is deselected and remove all preview tiles.
      selectedTile.deselect();
      previewTiles.forEach(tile => stage.removeChild(tile.shape));
      previewTiles.splice(0, previewTiles.length);
    }
  }

  renderer.render(stage);
}

function addPermanentTile(x, y) {
  const newTile = Tile.build(x, y, TILE_RADIUS);
  map.tiles.push(newTile);
  stage.addChild(newTile.shape);

  newTile.shape.pointertap = () => {
    selectTile(newTile);
  };

  return newTile;
};

addPermanentTile(width / 2, height / 2, TILE_RADIUS);
