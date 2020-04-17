
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, SHARPY_X, SHARPY_Y} from "../constants/index.js";

// --------
// --------
// --------
// SHARPY.

class Sharpy extends TileSprite {
	
	constructor(x, y, visible) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		this.frame = {x: SHARPY_X, y: SHARPY_Y};
		
		// Set initial position.
		this.pos = {x: x, y: y};
		
		this.visible = visible;
	}
	
}

export default Sharpy;
