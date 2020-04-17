
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, LADDER_X, LADDER_Y} from "../constants/index.js";

// --------
// --------
// --------
// LADDER.

class Ladder extends TileSprite {
	
	constructor(x, y, bottom) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		let displace = 0;
		if (!bottom) {
			displace = 1;
		}
		
		this.frame = {x: LADDER_X + displace, y: LADDER_Y};
		
		// Set initial position.
		this.pos = {x: x, y: y};
		
		this.bottom = bottom;
	}
	
}

export default Ladder;
