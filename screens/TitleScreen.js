
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Assets, Container, Level, Rectangle, Text, Texture, TiledLevel} = mlopez13;

// Entities.
import Motxi from "../entities/Motxi.js";
import Tunnel from "../entities/Tunnel.js";

// Texture.
const texture = new Texture("res/images/tiles.png");

import {GAME_W, GAME_H} from "../constants/index.js";

// --------
// --------
// --------
// TITLE SCREEN.

class TitleScreen extends Container {
	
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
		
		
		// HOLES.
		
		const holes = new Container();
		const isHole = true;
		
		for (let i = 0; i < entities.holes.length; i++) {
			const hole = entities.holes[i];
			
			const xMotxi = hole.properties.find(p => p.name === "xMotxi").value;
			const yMotxi = hole.properties.find(p => p.name === "yMotxi").value;
			
			holes.add(new Tunnel(hole.x, hole.y, hole.name, isHole, xMotxi, yMotxi));
		}
		this.add(holes);
		
		
		// MOTXI.

		for (let i = 0; i < entities.motxis.length; i++) {
			const motxi = entities.motxis[i];
			
			const xMotxi = motxi.x;
			const yMotxi = motxi.y;
			
			const isBlack = motxi.properties.find(p => p.name === "black").value;
			
			if (isBlack) {
				const blackMotxi = new Motxi(xMotxi, yMotxi, isBlack);
				this.add(blackMotxi);
				this.blackMotxi = blackMotxi;
			} else {
				const whiteMotxi = new Motxi(xMotxi, yMotxi, isBlack);
				this.add(whiteMotxi);
				this.whiteMotxi = whiteMotxi;
			}
			
			if (isBlack) {
				const blackText = new Text("B",
					{font: "bold 30pt comic sans ms", fill: "#000000", align: "center"},
					{strokeStyle: "#FFFFFF", strokeWidth: 2}
				);
				blackText.pos = {x: xMotxi + 15, y: yMotxi + 50};
				this.add(blackText);
				this.blackText = blackText;
			} else {
				const whiteText = new Text("W",
					{font: "bold 30pt comic sans ms", fill: "#FFFFFF", align: "center"},
					{strokeStyle: "#000000", strokeWidth: 2}
				);
				whiteText.pos = {x: xMotxi + 15, y: yMotxi + 50};
				this.add(whiteText);
				this.whiteText = whiteText;
			}
		}
		
		// Add title.
		const title = new Text("MOTXI",
			{font: "bold 50pt comic sans ms", fill: "#FFFFFF", align: "center"}, {strokeStyle: "#000000", strokeWidth: 2}
		);
		title.pos = {x: GAME_W/2, y: GAME_H/2 - 100};
		title.pivot.y += 25;
		this.add(title);
		
		this.title = title;
		
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
		
		const {controls, nextScreen, blackMotxi, whiteMotxi} = this;
		
		if (controls.b) {
			this.state.motxi = {x: blackMotxi.pos.x,
				y: blackMotxi.pos.y,
				isBlack: true};
			this.end = true;
		} else if (controls.w) {
			this.state.motxi = {x: whiteMotxi.pos.x,
				y: whiteMotxi.pos.y,
				isBlack: false};
			this.end = true;
		}
		
		this.title.rotation = 10 * Math.sin(3 * t);
		
		this.blackText.pos.y = 260 + 5 * Math.sin(3 * t);
		this.whiteText.pos.y = 260 - 5 * Math.sin(3 * t);
		
				
		if (this.end) {
			if (this.endLife > 0) {
				this.endLife -= dt;
				if (this.alpha - 10*dt > 0) {
					this.alpha -= 10*dt;
				} else {
					this.alpha = 0;
				}
			} else {
				this.setUpFlag = true;
				this.alpha = 0;
				this.beginLife = 0.2;
				this.begin = true;
				this.endLife = 0.2;
				this.end = false;
				this.nextScreen(this.state.level);
			}
		}
		
		// Container update.
		super.update(dt, t);
		
	}
}

export default TitleScreen;
