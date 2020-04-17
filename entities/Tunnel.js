
// Library.
import mlopez13 from "../mlopez13/index.js";
const {TileSprite, Texture} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, TUNNEL_X, TUNNEL_Y, HOLE_X, HOLE_Y} from "../constants/index.js";

// --------
// --------
// --------
// TUNNEL.

class Tunnel extends TileSprite {
	
	constructor(x, y, name, isHole, xMotxi, yMotxi, rotation, nose) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		if (isHole) {
			this.frame = {x: HOLE_X, y: HOLE_Y};
		} else {
			this.frame = {x: TUNNEL_X, y: TUNNEL_Y};
		}
		
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
		
		this.xMotxi = xMotxi;
		this.yMotxi = yMotxi;
		
		this.nose = nose;
		
	}
	
}

export default Tunnel;
