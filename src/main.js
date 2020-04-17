
// Library.
import mlopez13 from "../mlopez13/index.js";
const {Assets, Game, KeyControls} = mlopez13;

import {GAME_W, GAME_H, NUMBER_OF_LEVELS} from "../constants/index.js";

const defaults = () => ({
	level: "0",
	motxi: {},
	tunnels: [],
	doors: {},
	keys: {}
});

let state = defaults();

// Screens.
import LogoScreen from "../screens/LogoScreen.js";
import TitleScreen from "../screens/TitleScreen.js";
import GameScreen from "../screens/GameScreen.js";
import GameOverScreen from "../screens/GameOverScreen.js";

// GAME SETUP.
const game = new Game(GAME_W, GAME_H, state);
const controls = new KeyControls();

// LOAD ASSETS.
Assets.onProgress((done, total) => {
	console.log(`${done / total * 100}% complete`);
});

const logoScreen = new LogoScreen(newTitleScreen);
const titleScreen = new TitleScreen(game, controls, newGameScreen);

const gameScreens = [];
for (let i = 0; i < NUMBER_OF_LEVELS; i++) {
	const gameScreen = new GameScreen(game, controls, newGameScreen, newGameOverScreen);
	gameScreens.push(gameScreen);
}

const gameOverScreen = new GameOverScreen(game, controls, newTitleScreen);

// GAME LOOP.
newLogoScreen();
game.run();


// --------
// --------
// --------
// FUNCTIONS.

function newLogoScreen() {
	game.scene = logoScreen;
}

function newTitleScreen() {
	game.scene = titleScreen;
}

function newGameScreen(i) {
	game.scene = gameScreens[i];
}

function newGameOverScreen(i) {
	game.scene = gameOverScreen;
}
