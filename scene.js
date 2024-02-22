

// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/world1.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [6, 6], [0, 32], world11);

	// Create entities
	this.player = new Player(0, 150, this.map);
	this.bubble = new Bubble(360, 112);
	this.bubbleActive = true;

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Update entities
	this.player.update(deltaTime);
	this.bubble.update(deltaTime);

	// Check for collision between entities
	if (this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;
}

Scene.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	// Draw entities
	if (this.bubbleActive)
		this.bubble.draw();
	this.player.draw();
}



