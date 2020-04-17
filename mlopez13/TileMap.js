
import Container from "./Container.js";
import math from "./utils/math.js";
import TileSprite from "./TileSprite.js";

class TileMap extends Container {
	
	constructor(tiles, mapW, mapH, tileW, tileH, texture) {
		
		// tiles is an array of frame data to draw: [{x: 1, y: 0}, ...].
		// mapW is the width of the map in tiles (number of columns),
		// mapH is the height of the map in tiles (number of rows), so:
		// tiles.length = mapW * mapH.
		
		super(); // Gets pos.x, pos.y, children = [].
		this.mapW = mapW; // Width in tiles.
		this.mapH = mapH; // Height in tiles.
		this.tileW = tileW;
		this.tileH = tileH;
		this.w = mapW * tileW; // Width in pixels.
		this.h = mapH * tileH; // Height in pixels.
		
		// Add TileSprites.
		this.children = tiles.map((info, i) => {
			const s = new TileSprite(texture, tileW, tileH);
			s.frame = {x: info.x, y: info.y};
			s.rotation = info.rotation;
			s.scale = {x: info.flipH === true ? -1 : 1, y: info.flipV === true ? -1 : 1};
			s.walkable = info.walkable;
			s.button = info.button;
			s.id = info.idx;
			s.pos.x = (i % mapW) * tileW;
			s.pos.y = Math.floor(i / mapW) * tileH;
			return s;
		});
	}
	
	// From pixel to map position.
	// {123, 68} --> {123 / 30, 68 / 30} --> {4, 2}
	pixelToMapPos(pos) {
		const {tileW, tileH} = this;
		return {
			x: Math.floor(pos.x / tileW),
			y: Math.floor(pos.y / tileH)
		};
	}
	
	// From map to pixel position.
	// {4, 2} --> {120, 60}
	mapToPixelPos(mapPos) {
		const {tileW, tileH} = this;
		return {
			x: mapPos.x * tileW,
			y: mapPos.y * tileH
		};
	}
	
	// Get tile at some map position.
	// {4, 2} --> tile
	tileAtMapPos(mapPos) {
		return this.children[mapPos.y * this.mapW + mapPos.x];
	}
	
	tileAtPixelPos(pos) {
		return this.tileAtMapPos(this.pixelToMapPos(pos));
	}
	
	// Check if tile is walkable.
	checkTile(pos) {
		return this.tileAtPixelPos(pos);
	}
}

export default TileMap;
