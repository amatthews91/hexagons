import * as PIXI from 'pixi.js';

import Tile from '../shared/tile';
import './style.css';

const width = 512;
const height = 512;
const app = new PIXI.Application({ width, height, antialias: true });
const renderer = app.renderer;
const stage = app.stage;
document.getElementById('view').appendChild(app.view);

const TILE_RADIUS = 20;
const previewTiles = [];

const mapData = {
  tiles: []
};

function selectTile(selectedTile) {
  mapData.tiles.forEach(tile => tile.deselect());

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

      // Make sure not to add any preview tiles if there exists a permanent tile in its place already.
      const newPreviewTiles = selectedTile.getSurroundingTiles()
        .filter(newPreviewTile => !mapData.tiles.some(permanentTile => permanentTile.x === newPreviewTile.x && permanentTile.y === newPreviewTile.y));

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
1
  renderer.render(stage);
}

function addPermanentTile(x, y) {
  const newTile = Tile.build(x, y, TILE_RADIUS);
  mapData.tiles.push(newTile);
  stage.addChild(newTile.shape);

  newTile.shape.pointertap = () => {
    selectTile(newTile);
  };

  document.getElementById('map-data').innerHTML = convertMapDataToJSON(mapData);

  return newTile;
};

addPermanentTile(width / 2, height / 2, TILE_RADIUS);

function convertMapDataToJSON(map) {
  const exportData = {
    ...map,
    tiles: map.tiles.map(tile => {
      return {
        x: tile.x,
        y: tile.y
      }
    })
  };
  return JSON.stringify(exportData, null, '\t')
    .replace(/\n/g,'<br />')
    .replace(/\t/g,'&nbsp;&nbsp;&nbsp;');
}

function exportMapJSON() {

}