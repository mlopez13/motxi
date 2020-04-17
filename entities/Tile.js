
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, TILE_X, TILE_Y, BUTTON_X, BUTTON_Y} from "../constants/index.js";

// --------
// --------
// --------
// TILE.

class Tile extends TileSprite {
	
	constructor(x, y, name, button, visible) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		let xFrame = TILE_X;
		let yFrame = TILE_Y;
		let displace = 0;
		
		if (button) {
			xFrame = BUTTON_X;
			yFrame = BUTTON_Y;
		} else {
			if (name === "o") {
				displace = 1;
			} else if (name === "s") {
				displace = 2;
			} else if (name === "e") {
				displace = 3;
			}
		}
				
		this.frame = {x: xFrame + displace, y: yFrame};
		
		// Set initial position.
		this.pos = {x: x, y: y};
		
		this.button = button;
		
		this.visible = visible;
		
	}
	
}

export default Tile;
