
import Texture from "./Texture.js";
import TileMap from "./TileMap.js";
import tiledParser from "./utils/tiledParser.js";

// Texture.
const texture = new Texture("res/images/tiles.png");

class TiledLevel extends TileMap {
	
	constructor(json) {
		const {tileW, tileH, mapW, mapH, tiles, entities, getObjectsByType, getObjectByName} = tiledParser(json);
		super(tiles, mapW, mapH, tileW, tileH, texture);
		
		this.entities = entities;
		this.getObjectsByType = getObjectsByType;
		this.getObjectByName = getObjectByName;
		
	}
	
	getEntities() {
		
		const {entities, getObjectsByType, getObjectByName} = this;
		
		return {
			motxi: getObjectByName(entities, "Motxi"),
			motxis: getObjectsByType(entities, "Motxi"),
			tunnels: getObjectsByType(entities, "Tunnel"),
			doors: getObjectsByType(entities, "Door"),
			tiles: getObjectsByType(entities, "Tile"),
			holes: getObjectsByType(entities, "Hole"),
			boxes: getObjectsByType(entities, "Box"),
			keys: getObjectsByType(entities, "Key"),
			sharpies: getObjectsByType(entities, "Sharpy"),
			ladders: getObjectsByType(entities, "Ladder")
		};
	}
	
	
}

export default TiledLevel;
