
const FLIP_H = 0X80000000;
const FLIP_V = 0X40000000;
const FLIP_A = 0X20000000;

function tiledParser(json) {
	
	// Data from json input file.
	const {
		tilewidth: tileW,
		tileheight: tileH,
		width: mapW,
		height: mapH,
		layers,
		tilesets
	} = json;
	
	// Layer-fetcher-helper-function.
	const getLayer = name => {
		const layer = layers.find(l => l.name === name);
		if (!layer) {
			throw new Error(`Tiled error: missing layer "${name}".`);
		}
		return layer;
	};
	
	// BACKGROUND.
	const levelLayer = getLayer("Level");
	
	const tileset = tilesets[0];
	
	// Map the Tiled level data to our game format.
	//const props = tileset.tileproperties;
	const tilesPerRow = Math.floor(tileset.imagewidth / tileset.tilewidth);
	
	const tiles = levelLayer.data.map(cell => {
		
		let rotation = 0;
		let flipH = false;
		let flipV = false;
		
		if (cell > FLIP_H + FLIP_V + FLIP_A) {
			cell -= FLIP_H + FLIP_V + FLIP_A;
			rotation = 90;
			flipH = true;
		} else if (cell > FLIP_H + FLIP_V) {
			cell -= FLIP_H + FLIP_V;
			rotation = 180;
		} else if (cell > FLIP_H + FLIP_A) {
			cell -= FLIP_H + FLIP_A;
			rotation = 90;
		} else if (cell > FLIP_H) {
			cell -= FLIP_H;
			flipH = true;
		} else if (cell > FLIP_V + FLIP_A) {
			cell -= FLIP_V + FLIP_A;
			rotation = 270;
		} else if (cell > FLIP_V) {
			cell -= FLIP_V;
			flipV = true;
		} else if (cell > FLIP_A) {
			cell -= FLIP_A;
			rotation = 90;
			flipV = true;
		}
		
		const idx = cell - tileset.firstgid; // Get correct Tiled offset.
		const tile = tileset.tiles.find(t => t.id === idx);
		
		const walkable = typeof tile.properties.find(p => p.name === "walkable") === "undefined" ? false : tile.properties.find(p => p.name === "walkable").value;
		const button = typeof tile.properties.find(p => p.name === "button") === "undefined" ? false : tile.properties.find(p => p.name === "button").value;
		
		return {
			x: idx % tilesPerRow,
			y: Math.floor(idx / tilesPerRow),
			rotation,
			flipH,
			flipV,
			walkable,
			button,
			idx
		};
	});
	
	// ENTITIES.
	const entitiesLayer = getLayer("Entities");
	const entities = entitiesLayer.objects.map(
		({x, y, width, height, rotation, properties, type, name, gid}) => ({
			x,
			y: y - height,
			width,
			height,
			rotation,
			properties,
			type,
			name,
			gid: gid
		})
	);
	
	function getObjectsByType (entities, type) {
		return entities.filter(e => e.type === type);
	}
	
	function getObjectByName (entities, name) {
		const entity = entities.find(e => e.name === name);
		if (typeof entity === "undefined") {
			return false;
		}
		return entity;
	}
	
	return {tileW, tileH, mapW, mapH, tiles, entities, getObjectsByType, getObjectByName};
	
}

export default tiledParser;
