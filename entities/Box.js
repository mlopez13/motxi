
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, BOX_X, BOX_Y} from "../constants/index.js";

// --------
// --------
// --------
// BOX.

class Box extends TileSprite {
	
	constructor(x, y) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		this.frame = {x: BOX_X, y: BOX_Y};
		
		// Set initial position.
		this.pos = {x: x, y: y};
		
	}
	
}

export default Box;
