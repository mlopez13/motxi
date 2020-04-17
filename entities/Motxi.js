
// Library.
import mlopez13 from "../mlopez13/index.js";
const {math, Texture, TileSprite} = mlopez13;

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H, MOTXI_Y} from "../constants/index.js";

// --------
// --------
// --------
// MOTXI.

class Motxi extends TileSprite {
	
	constructor(x, y, isBlack, controls) {
		
		// TileSprite constructor.
		super(texture, TILE_W, TILE_H);
		
		// Width and length.
		this.w = TILE_W;
		this.h = TILE_H;
		
		// Set initial position.
		this.pos = {x, y};
		
		let yMotxi = MOTXI_Y;
		if (!isBlack) {
			yMotxi += 1;
		}
		
		// Animations.
		const {anims} = this;
		const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
		anims.add("idle", list.map(x => ({x, y: yMotxi})), 0.05);
		anims.play("idle");
		
		// Controls.
		this.controls = controls;
		this.stopTime = 0.2;
		
	}
	
	update(dt, t) {
		
		// TileSprite update.
		super.update(dt);
		
	}
	
}

export default Motxi;
