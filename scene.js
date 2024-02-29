

// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/world1.png");

	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [6, 6], [0, 32], world1);

	// Create entities
	this.player = new Player(150, 150, this.map);
	this.statusCoin = new Coin(250, 25);
	this.coins = [];
	this.goomba_01 = new Goomba(29 * 32, 24 * 32, this.map);

	//this.coinActive = true;
	this.goombaActive = true;

	this.lose = false;

	// Store current time
	this.currentTime = 0
}

Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Update entities
	this.player.update(deltaTime);
	this.statusCoin.update(deltaTime);
	this.goomba_01.update(deltaTime);
	// update del blockAnimation
	updateBlockAnimation(deltaTime);


	// Check for collision between entities
	if (this.player.collisionBox().intersect(this.goomba_01.collisionTop()))
		this.goombaActive = false;
	if (this.player.collisionBox().intersect(this.goomba_01.collisionBox()) && this.goombaActive)
		//this.lose = true;
		console.log("Reduced lives")
	console.log(this.player.lives)
	checkBlockAnimation(this.player.collisionBox()); //TODO: not created yet
}

function drawStatusText(currentTime) {

	// Load and set the font
	//const pixelFont = new FontFace('PublicPixel', 'url(font/PublicPixel.ttf) format(ttf)');
	//document.fonts.add(pixelFont);
	//await pixelFont.load();

	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	context.font = "900 20px Verdana";
	context.fillStyle = 'white';

	// Draw status text on the canvas
	var score = 8888;
	context.fillText('MARIO', 2 * 32, 30);
	context.fillText(String(score).padStart(6, '0'), 2 * 32, 50);

	context.fillText('X 00', 9 * 32, 50);

	context.fillText('WORLD', 15 * 32, 30);
	context.fillText('1-1', 15 * 32, 50);

	var restantTime = (400 - Math.floor(currentTime / 1000));
	context.fillText('TIME', 21 * 32, 30);
	context.fillText(restantTime + ' ', 21 * 32, 50);

	if (restantTime == 0) {
		//TODO: when times up, do something
	}
}

//OPosX, OPosY: origen de coordenadas del mapa
//tileX, tileY: el ancho y alto del tile en pixels
//map: json del mapa
function createBlockAnimation(OPosX, OPosY, tileX, tileY, map) {
	//var questionSprite

	for (var j = 0, pos = 0; j < map.height; j++)
		for (var i = 0; i < map.width; i++, pos++) {
			var tiledId = map.data[pos];
			if (tiledId == 35) {	//question id == 1
				this.coins.push(new Coin(OPosX + i * tileX, OPosY + j * tileY));
			}
		}
}

function updateBlockAnimation(deltaTime) {
	if (this.coins.length < 1)
		return;

	for (coin in coins) {
		coin.update(deltaTime);
	}
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

	//Draw status text
	drawStatusText(this.currentTime);

	var atb = this.map.getBlockAnimationData();
	createBlockAnimation(atb[0], atb[1], atb[2], atb[3], atb[4], atb[5]);

	// Draw entities
	this.statusCoin.draw();
	if (this.goombaActive)//pq no hacemos que estos xxActive sean atributos de sus clase 
		this.goomba_01.draw();
	if (this.lose == false)
		this.player.draw();
}