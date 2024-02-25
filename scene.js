

// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/world1.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [6, 6], [0, 32], world1);

	// Create entities
	this.player = new Player(150, 150, this.map);
	this.bubble = new Bubble(360, 112);
	this.coin = new Coin(260, 112);

	this.bubbleActive = true;
	this.coinActive = true;

	// Store current time
	this.currentTime = 0
}

Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Update entities
	this.player.update(deltaTime);
	this.bubble.update(deltaTime);
	this.coin.update(deltaTime);

	// Check for collision between entities
	if (this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;
	if (this.player.collisionBox().intersect(this.coin.collisionBox()))
		this.coinActive = false;
}

async function drawStatusText(currentTime) {

	// Load and set the font
	const pixelFont = new FontFace('PublicPixel', 'url(font/PublicPixel.ttf) format(ttf)');
	document.fonts.add(pixelFont);
	//await pixelFont.load();

	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	context.font = "900 15px Verdana";
	context.fillStyle = 'white';

	// Draw status text on the canvas
	context.fillText('MARIO', 20, 30);
	context.fillText('WORLD', 280, 30);
	context.fillText('TIME', 410, 30);

	context.fillText('000000', 20, 45);
	context.fillText('x 00', 150, 45);
	context.fillText('1-1', 300, 45);
	context.fillText((400 - Math.floor(currentTime / 1000)) + ' ', 410, 45);
	//TODO: when times up, do something
}

Scene.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(90, 150, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	drawStatusText(this.currentTime);

	// Draw entities
	if (this.bubbleActive)
		this.bubble.draw();
	if (this.coinActive)
		this.coin.draw();
	this.player.draw();
}