
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, DOOR_X, DOOR_Y} from "../constants/index.js";

// --------
// --------
// --------
// DOOR.

class Door extends TileSprite {
	
	constructor(x, y, name, button, rotation) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		this.frame = {x: DOOR_X, y: DOOR_Y};
		
		// Set initial position.
		this.pos = {x: x, y: y};
		this.rotation = rotation;
		
		if (rotation === 90 || rotation === -270) {
			this.pos.y += 30;
		} else if (rotation === 180 || rotation === -180) {
			this.pos.x -= 30;
			this.pos.y += 30;
		} else if (rotation === -90 || rotation === 270) {
			this.pos.x -= 30;
		}
		
		this.name = name;
		this.button = button;
		
		this.walkable = false;
		
	}
	
	update(dt, t) {
		
		// TileSprite update.
		super.update(dt);
		
		if (this.walkable) {
			this.visible = false;
		} else {
			this.visible = true;
		}
		
	}
	
}

export default Door;
