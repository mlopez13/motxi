
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Assets, Container, entity, Level, math, Rectangle, Text, Texture, TiledLevel, TileSprite} = mlopez13;

// Entities.
import Motxi from "../entities/Motxi.js";
import Tunnel from "../entities/Tunnel.js";
import Door from "../entities/Door.js";
import Tile from "../entities/Tile.js";
import Box from "../entities/Box.js";
import Key from "../entities/Key.js";
import Sharpy from "../entities/Sharpy.js";
import Ladder from "../entities/Ladder.js";

// Texture.
const texture = new Texture("res/images/tiles.png");

// Constants.
import {TILE_W, TILE_H} from "../constants/index.js";

// --------
// --------
// --------
// GAME SCREEN.

class GameScreen extends Container {
	
	constructor(game, controls, nextScreen, finalScreen) {
		
		// Container constructor.
		super();
		
		// Width and length.
		const {w, h, state} = game;
		
		this.state = state;
		this.controls = controls;
		this.nextScreen = nextScreen;
		this.finalScreen = finalScreen;
		
		this.setUpFlag = true;
		
		this.alpha = 0;
		
		this.beginLife = 0.2;
		this.begin = true;
		
		this.endLife = 0.2;
		this.end = false;
		
		this.gameOver = false;
		
	}
	
	setUpLevel(json) {
		
		const level = new TiledLevel(json);
		this.add(level);
		
		const entities = level.getEntities(level.entities);
		
		
		// TUNNELS.
		
		const tunnels = new Container();
		let isHole = false;
		
		for (let i = 0; i < entities.tunnels.length; i++) {
			const tunnel = entities.tunnels[i];
			
			const xMotxi = tunnel.properties.find(p => p.name === "xMotxi").value;
			const yMotxi = tunnel.properties.find(p => p.name === "yMotxi").value;
			
			const nose = tunnel.properties.find(p => p.name === "nose");
			
			if (typeof nose !== "undefined") {
				tunnels.add(new Tunnel(tunnel.x, tunnel.y, tunnel.name, isHole, xMotxi, yMotxi, tunnel.rotation, nose.value));
			} else {
				tunnels.add(new Tunnel(tunnel.x, tunnel.y, tunnel.name, isHole, xMotxi, yMotxi, tunnel.rotation));
			}
			
		}
		this.add(tunnels);
		
		
		// DOORS.
		
		const doors = new Container();
		
		for (let i = 0; i < entities.doors.length; i++) {
			const door = entities.doors[i];
			if (this.state.doors[door.name] !== true) {
				
				let button = door.properties;
				
				if (typeof button !== "undefined") {
					button = button.find(p => p.name === "button").value;
				} else {
					button = false;
				}
				
				doors.add(new Door(door.x, door.y, door.name, button, door.rotation));
			}
		}
		this.add(doors);
		
		
		// TILES.
		
		const tiles = new Container();
		
		for (let i = 0; i < entities.tiles.length; i++) {
			const tile = entities.tiles[i];
			const isBlack = tile.properties.find(p => p.name === "black");
			let button = tile.properties.find(p => p.name === "button");
			
			if (typeof button === "undefined") {
				button = false;
			} else {
				button = button.value;
			}
			
			let visible = true;
			
			if (typeof isBlack !== "undefined" &&
				isBlack.value !== this.state.motxi.isBlack) {
					visible = false;
			}
			
			tiles.add(new Tile(tile.x, tile.y, tile.name, button, visible));
			
		}
		this.add(tiles);
		
		this.numberOfButtons = tiles.children.filter(t => t.button === true).length;
		
		// HOLES.
		
		const holes = new Container();
		isHole = true;
		
		for (let i = 0; i < entities.holes.length; i++) {
			const hole = entities.holes[i];
			
			const xMotxi = hole.properties.find(p => p.name === "xMotxi").value;
			const yMotxi = hole.properties.find(p => p.name === "yMotxi").value;
			
			holes.add(new Tunnel(hole.x, hole.y, hole.name, isHole, xMotxi, yMotxi));
		}
		this.add(holes);
		
		
		// BOXES.
		
		const boxes = new Container();
		
		for (let i = 0; i < entities.boxes.length; i++) {
			const box = entities.boxes[i];
			boxes.add(new Box(box.x, box.y));
		}
		this.add(boxes);
		
		
		// KEYS.
		
		const keys = new Container();
		
		for (let i = 0; i < entities.keys.length; i++) {
			const key = entities.keys[i];
			if (this.state.keys[key.name] !== true) {
				keys.add(new Key(key.x, key.y, key.name));
			}
		}
		this.add(keys);
		
		
		// SHARPIES.
		
		const sharpies = new Container();
		
		for (let i = 0; i < entities.sharpies.length; i++) {
			const sharpy = entities.sharpies[i];
			const isBlack = sharpy.properties;
			let visible = false;
			if (typeof isBlack === "undefined" || this.state.motxi.isBlack === isBlack.find(p => p.name === "black").value) {
				visible = true;
			}
			sharpies.add(new Sharpy(sharpy.x, sharpy.y, visible));
			
		}
		this.add(sharpies);
		
		
		// LADDERS.
		
		const ladders = new Container();
		
		for (let i = 0; i < entities.ladders.length; i++) {
			const ladder = entities.ladders[i];
			const bottom = ladder.properties.find(p => p.name === "bottom").value;
			ladders.add(new Ladder(ladder.x, ladder.y, bottom));
		}
		this.add(ladders);
		
		
		// MOTXI.
		
		let xMotxi = 5;
		let yMotxi = 5;
		let isBlack = true;
		
		if (typeof this.state.motxi.x !== "undefined") {
			xMotxi = this.state.motxi.x;
			yMotxi = this.state.motxi.y;
			isBlack = this.state.motxi.isBlack;
		} else if (typeof entities.motxi !== "undefined") {
			xMotxi = entities.motxi.x;
			yMotxi = entities.motxi.y;
			isBlack = entities.motxi.properties.find(p => p.name === "black").value;
		}
		
		const motxi = new Motxi(xMotxi, yMotxi, isBlack, this.controls);
		this.add(motxi);
		
		// Keep references.
		
		this.level = level;
		this.tunnels = tunnels;
		this.doors = doors;
		this.tiles = tiles;
		this.holes = holes;
		this.boxes = boxes;
		this.keys = keys;
		this.sharpies = sharpies;
		this.ladders = ladders;
		this.motxi = motxi;
		
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
		
		// UPDATE.
		const {level, tunnels, doors, tiles, holes, boxes, keys, sharpies, ladders, motxi} = this;
		const {controls, w, h} = motxi;
		
		const checkTunnel = pos => {
			const tunnel = tunnels.children.find(t => t.pos.x === pos.x && t.pos.y === pos.y);
			if (typeof tunnel !== "undefined") {
				enterTunnel(tunnel);
				return true;
			} else {
				return false;
			}
		};
		
		const enterTunnel = tunnel => {
			if (typeof tunnel.nose !== "undefined") {
				if (checkNose(tunnel.nose)) {
					this.state.level = (parseInt(tunnel.name) + 2).toString();
				} else if (this.state.level !== tunnel.name) {
					this.state.level = tunnel.name;
				} else {
					this.justMoveMotxi = true;
				}
				this.state.tunnels.push(tunnel.nose);
			} else {
				this.state.level = tunnel.name;
			}
			this.state.motxi.x = TILE_W * tunnel.xMotxi;
			this.state.motxi.y = TILE_H * tunnel.yMotxi;
			this.alpha = 1;
			this.end = true;
		}
		
		const checkNose = nose => {
			const array = this.state.tunnels;
			const length = array.length;
			if (array[length - 3] === "n" &&
				array[length - 2] === "o" &&
				array[length - 1] === "s" &&
				nose === "e") {
				return true;
			} else {
				return false;
			}
		}
		
		const checkDoor = pos => {
			const door = doors.children.find(d => d.pos.x === pos.x && d.pos.y === pos.y);
			if (typeof door !== "undefined" && !door.walkable) {
				return true;
			} else {
				return false;
			}
		};
		
		const checkHole = pos => {
			const hole = holes.children.find(h => h.pos.x === pos.x && h.pos.y === pos.y);
			if (typeof hole !== "undefined") {
				enterTunnel(hole);
			}
		};
		
		const checkKey = pos => {
			const key = keys.children.find(k => k.pos.x === pos.x && k.pos.y === pos.y);
			if (typeof key !== "undefined") {
				
				// Destroy key.
				key.dead = true;
				
				// Open door.
				const door = doors.children.find(d => d.name === key.name);
				
				if (typeof door !== "undefined") {
					door.dead = true;
				}
				
				// Save it to game state.
				this.state.doors[key.name] = true;
				this.state.keys[key.name] = true;
				
			}
		};
		
		const checkBox = pos => {
			return boxes.children.find(b => b.pos.x === pos.x && b.pos.y === pos.y);
		};
		
		const checkButton = pos => {
			const tile = tiles.children.find(t => t.pos.x == pos.x && t.pos.y === pos.y);
			if (typeof tile !== "undefined" && tile.button === true) {
				return true;
			} else {
				return false;
			}
		};
		
		const checkSharpy = pos => {
			const sharpy = sharpies.children.find(s => s.pos.x === pos.x && s.pos.y === pos.y);
			if (typeof sharpy !== "undefined") {
				return true;
			} else {
				return false;
			}
		};
		
		const checkLadder = pos => {
			const ladder = ladders.children.find(l => l.pos.x === pos.x && l.pos.y === pos.y);
			if (typeof ladder !== "undefined") {
				if (ladder.bottom) {
					this.end = true;
					this.gameOver = true;
					return false;
				} else {
					return true;
				}
			}
			return false;
		};
		
		if (!this.setUpFlag && !this.end) {
		
			// MOVEMENT.
			if (motxi.stopTime < 0) {
				if (controls.x !== 0 || controls.y !== 0) {
					
					const oldPos = {x: motxi.pos.x, y: motxi.pos.y};
					const newPos = {x: oldPos.x + controls.x * w, y: oldPos.y + controls.y * h};
					const nextPos = {x: oldPos.x + 2 * controls.x * w, y: oldPos.y + 2 * controls.y * h};
					
					// Check for walls or closed doors.
					if (!checkDoor(newPos) && !checkLadder(newPos) && (level.checkTile(newPos).walkable || checkTunnel(newPos))) {
						
						// Check hole.
						checkHole(newPos);
						
						// Check for boxes.
						const box = checkBox(newPos);
						const nextBox = checkBox(nextPos);
						if (typeof box === "undefined") {
							
							// (MOTXI)
							motxi.pos = newPos;
							motxi.stopTime = 0.1;
							checkKey(newPos);
							
							if (checkSharpy(newPos)) {
								this.state.level = "0";
								this.state.motxi.x = TILE_W * 5;
								this.state.motxi.y = TILE_H * 7;
								this.alpha = 1;
								this.end = true;
							}
							
						} else if (typeof nextBox === "undefined" && level.checkTile(nextPos).walkable && !checkDoor(nextPos) && !checkSharpy(nextPos)) {
							
							// (MOTXI)
							motxi.pos = newPos;
							motxi.stopTime = 0.1;
							checkKey(newPos);
							
							// (BOX)
							box.pos = nextPos;
							if (checkButton(newPos) && !checkButton(nextPos)) {
								this.numberOfButtons++;
								if (this.numberOfButtons === 1) {
									doors.children.find(d => d.button === true).walkable = false;
								}
							} else if (!checkButton(newPos) && checkButton(nextPos)) {
								this.numberOfButtons--;
								if (this.numberOfButtons === 0) {
									doors.children.find(d => d.button === true).walkable = true;
								}
							}
						}
					}
				}
			} else {
				motxi.stopTime -= dt;
			}
						
		} else {
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
				if (this.justMoveMotxi) {
					motxi.pos.x = this.state.motxi.x;
					motxi.pos.y = this.state.motxi.y;
					this.justMoveMotxi = false;
				} else {
					if (this.gameOver === true) {
						this.finalScreen(this.state.level);
					} else {
						this.nextScreen(this.state.level);
					}
				}
			}
		}
			
		// Container update.
		super.update(dt, t);
		
	}
}

export default GameScreen;
