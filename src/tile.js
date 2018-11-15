export default class Tile {

  constructor(x, y, r, points, shape) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.points = points;
    this.shape = shape;
  }

  getSurroundingTiles() {
    // 30degrees = 0.5235988r
    // Concept is the same as getting the points of the hexagon. length to side is required to do the vector calculation. Then it's the same.

    if (!this.adjacents) {
      // Length from centre of tile to the middle of a side.
      const lengthToSide = Math.cos(0.5235988) * this.r;
      const adjacentCentre1 = new PIXI.Point(this.x + ((lengthToSide * Math.cos(0.5235988)) * 2), this.y + ((lengthToSide * Math.sin(0.5235988)) * 2));
      const adjacentCentre2 = new PIXI.Point(this.x + ((lengthToSide * Math.cos(1.570796)) * 2), this.y + ((lengthToSide * Math.sin(1.570796)) * 2));
      const adjacentCentre3 = new PIXI.Point(this.x + ((lengthToSide * Math.cos(2.617994)) * 2), this.y + ((lengthToSide * Math.sin(2.617994)) * 2));
      const adjacentCentre4 = new PIXI.Point(this.x - ((lengthToSide * Math.cos(0.5235988)) * 2), this.y - ((lengthToSide * Math.sin(0.5235988)) * 2));
      const adjacentCentre5 = new PIXI.Point(this.x - ((lengthToSide * Math.cos(1.570796)) * 2), this.y - ((lengthToSide * Math.sin(1.570796)) * 2));
      const adjacentCentre6 = new PIXI.Point(this.x - ((lengthToSide * Math.cos(2.617994)) * 2), this.y - ((lengthToSide * Math.sin(2.617994)) * 2));

      //Cache so they can be removed from the stage by refence (and remove the need to recalculate)
      this.adjacents = [
        Tile.build(adjacentCentre1.x, adjacentCentre1.y, 20, true),
        Tile.build(adjacentCentre2.x, adjacentCentre2.y, 20, true),
        Tile.build(adjacentCentre3.x, adjacentCentre3.y, 20, true),
        Tile.build(adjacentCentre4.x, adjacentCentre4.y, 20, true),
        Tile.build(adjacentCentre5.x, adjacentCentre5.y, 20, true),
        Tile.build(adjacentCentre6.x, adjacentCentre6.y, 20, true)
      ];
    }

    return this.adjacents;
  }

  // Draws a hexagon where (x, y) are the coordinates of the centre
  // isPermanent is whether or not the tile is a preview tile vs a permanent
  // r is the radius of the hexagon.
  // returns: shape Polygon object
  static build(x, y, r, isPreview) {
    //60 degrees in radians = 1.04718
    // OffsetX = length between center and a point (r) * cos(60 degrees)
    // OffsetX = length between center and a point (r) * sin(60 degrees)
    // This will produce the point at the bottom right of the hex (with 0,0 being at the top left of the canvas)
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
      .lineStyle(1, 0xFFFFFF, isPreview? 0.3 : 1)
      .drawPolygon(points);

    shape.hitArea = new PIXI.Polygon(points);
    shape.interactive = true;

    return new Tile(x, y, r, points, shape);
  }
}
