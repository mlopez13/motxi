
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Container, Rectangle, Text} = mlopez13;

import {GAME_W, GAME_H} from "../constants/index.js";

// --------
// --------
// --------
// LOGO SCREEN.

class LogoScreen extends Container {
	
	constructor(nextScreen) {
		
		// Container constructor.
		super();
		
		// Add rectangle.
		this.add(new Rectangle(GAME_W, GAME_H, "#000000"));
		
		// Add text.
		const text = this.add(new Text("a mlopez13 game",
			{font: "bold 15pt georgia", fill: "#FFFFFF", align: "center"}
		));
		text.pos = {x: GAME_W/2, y: GAME_H/2 - 20};
		
		// Add life and reference to next screen.
		this.life = 3;
		this.nextScreen = nextScreen;
		
	}
	
	update(dt, t) {
		
		const {nextScreen} = this;
		
		// Timer.
		this.life -= dt;
		if (this.life < 0) {
			nextScreen();
		}
		
	}
}

export default LogoScreen;
