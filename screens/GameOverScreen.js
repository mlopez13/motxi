
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Assets, Container, Level, Rectangle, Text, Texture, TiledLevel} = mlopez13;

// Entities.
import Motxi from "../entities/Motxi.js";
import Ladder from "../entities/Ladder.js";

// Texture.
const texture = new Texture("res/images/tiles.png");

import {GAME_W, GAME_H} from "../constants/index.js";

const defaults = () => ({
	level: "0",
	motxi: {},
	tunnels: [],
	doors: {},
	keys: {}
});

// --------
// --------
// --------
// GAME OVER SCREEN.

class GameOverScreen extends Container {
	
	constructor(game, controls, nextScreen) {
		
		// Container constructor.
		super();
		
		// State.
		const {state} = game;
		
		this.state = state;
		this.controls = controls;
		this.nextScreen = nextScreen;
		
		this.setUpFlag = true;
		
		this.alpha = 0;
		this.beginLife = 0.5;
		this.begin = true;
		
		this.endLife = 0.5;
		this.end = false;
		
	}
	
	setUpLevel(json) {
		
		const level = new TiledLevel(json);
		this.add(level);
		
		const entities = level.getEntities(level.entities);
		
		
		// LADDERS.
		
		const ladders = new Container();
		
		for (let i = 0; i < entities.ladders.length; i++) {
			const ladder = entities.ladders[i];
			const bottom = ladder.properties.find(p => p.name === "bottom").value;
			ladders.add(new Ladder(ladder.x, ladder.y, bottom));
		}
		this.add(ladders);
		
		
		// Add title.
		const title = new Text("YOU ESCAPED!",
			{font: "bold 30pt comic sans ms", fill: "#FFFFFF", align: "center"}, {strokeStyle: "#000000", strokeWidth: 2}
		);
		title.pos = {x: GAME_W/2, y: GAME_H/2 - 100};
		title.pivot.y += 25;
		this.add(title);
		
		// Add replay text.
		const replay = new Text("REPLAY? (R)",
			{font: "bold 20pt comic sans ms", fill: "#000000", align: "center"}, {strokeStyle: "#FFFFFF", strokeWidth: 1}
		);
		replay.pos = {x: GAME_W/2, y: GAME_H/2 + 130};
		this.add(replay);
		
		this.title = title;
		this.replay = replay;
		
	}
	
	update(dt, t) {
		
		// SET UP LEVEL, if not done before.
		if (this.setUpFlag) {
			const levelUrl = `res/levels/${this.state.level}.json`;
				
			const promise = Assets.json(levelUrl)
				.then(json => this.setUpLevel(json));
			
			this.setUpFlag = false;
		}
		
		if (this.begin) {
			if (this.beginLife > 0) {
				this.beginLife -= dt;
				this.alpha += 10*dt;
			} else {
				this.alpha = 1;
				this.begin = false;
			}
		}
		
		const {controls, nextScreen} = this;
		
		if (controls.r) {
			this.state.level = "0";
			this.end = true;
		}
		
		this.title.rotation = 10 * Math.sin(3 * t);
		this.replay.pos.y = GAME_H/2 + 130 + 10 * Math.sin(3 * t);
		
		if (this.end) {
			if (this.endLife > 0) {
				this.endLife -= dt;
				if (this.alpha - 10*dt > 0) {
					this.alpha -= 10*dt;
				} else {
					this.alpha = 0;
				}
			} else {
				this.state = defaults();
				this.nextScreen(this.state.level);
			}
		}
		
		// Container update.
		super.update(dt, t);
		
	}
}

export default GameOverScreen;
