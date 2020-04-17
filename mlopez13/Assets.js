
const cache = {};
let remaining = 0;
let total = 0;

const readyListeners = [];
const progressListeners = [];

let completed = false;

const Assets = {
	
	image(url) {
		return load(url, (url, onAssetLoad) => {
			const img = new Image();
			img.src = url;
			img.addEventListener("load", onAssetLoad, false);
			return img;
		});
	},
	
	json(url) {
		return load(url, (url, onAssetLoad) =>
			fetch(url)
				.then(response => response.json())
				.then(json => onAssetLoad(json))
				.catch(e => console.error(e))
		);
	},
	
	onReady(cb) {
		readyListeners.push(cb);
		// No assets to load in this game!
		if (remaining === 0) {
			done();
		}
	},
	
	onProgress(cb) {
		progressListeners.push(cb);
	}
	
};

// Helper function for queuing assets.

function load(url, maker) {
	
	if (cache[url]) {
		return cache[url];
	}
	
	const asset = maker(url, onAssetLoad);
	remaining++;
	total++;
	
	cache[url] = asset;
	return asset;
	
}

function onAssetLoad(e) {
	
	if (completed) {
		console.warn("Warning: asset defined after preload.", e.target);
		return e;
	}
	
	// Update listeners with the new state.
	remaining--;
	progressListeners.forEach(cb => cb(total - remaining, total));
	if (remaining === 0) {
		// We're done loading!
		done(e);
	}
	return e;
}

function done(e) {
	completed = true;
	readyListeners.forEach(cb => cb());
	return e;
}

export default Assets;
