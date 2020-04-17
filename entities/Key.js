
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, KEY_X, KEY_Y} from "../constants/index.js";

// --------
// --------
// --------
// KEY.

class Key extends TileSprite {
	
	constructor(x, y, name) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		this.frame = {x: KEY_X, y: KEY_Y};
		
		// Set initial position.
		this.pos = {x: x, y: y};
		
		this.name = name;
	}
	
}

export default Key;
