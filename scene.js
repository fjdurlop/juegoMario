

// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Loading texture to use in a TileMap
	//var tilesheet = new Texture("imgs/level2_00.png");//world02
	var tilesheet = new Texture("imgs/world1.png");

	// Create tilemap
	//this.map = new Tilemap(tilesheet, [32, 32], [6, 6], [0, 32], world02);//world02
	this.map = new Tilemap(tilesheet, [32, 32], [6, 6], [0, 32], world1);

	// Create entities
	this.player = new Player(150, 150, this.map);
	this.statusCoin = new Coin(250, 25);
	this.blockAnimation = new BlockAnimation(this.map);
	this.goomba_01 = new Goomba(29 * 32, 13 * 32, this.map);
	//this.turtle = new Turtle(29 * 32, 12 * 32, this.map);
	
	this.goombaKilled = false; // Goomba had killed mario
	this.lose = false;

	// Store current time
	this.currentTime = 0
	this.goombaTime = 0;
	this.dyingTime = 0;
}

Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Update entities
	this.player.update(deltaTime);
	this.statusCoin.update(deltaTime);
	this.goomba_01.update(deltaTime);
	// update del blockAnimation
	this.blockAnimation.update(deltaTime);

	if (this.player.dying){
		this.dyingTime += deltaTime;
		if (this.dyingTime >= 500){
			//console.log("-----------------");
			this.player.dying = false;
			this.dyingTime = 0;
		}
	}

	if(this.goomba_01.active && this.goomba_01.killed){
		this.goomba_01.dyingTime += deltaTime;
		if (this.goomba_01.dyingTime >= 500){
			//console.log("-----------------");
			this.goomba_01.active = false;
			this.goomba_01.dyingTime = 0;
		}
	}

	// Check for collision between entities
	if (this.player.collisionBox().intersect(this.goomba_01.collisionTop()) && this.goombaKilled == false)
	{	
		if(this.player.sprite.y + this.player.sprite.height <= this.goomba_01.sprite.y + 5){
			//console.log("from above")
			this.goomba_01.killed = true;
		}
		
		//console.log("Goomba dies!!")
	}
	if (this.player.collisionBox().intersect(this.goomba_01.collisionBox()) && this.goomba_01.killed==false && this.goombaKilled == false){
		//this.lose = true;
		this.player.lives -=1;
		console.log("Reduced lives");
		console.log(this.player.lives);
		if (this.player.lives == 0 ){ 
			this.lose = true;
		}
		this.goombaKilled = true; //there was an attack to mario
	}
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

Scene.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	if(this.lose)
	{
		//console.log("Losing!!")
		context.fillStyle = "rgb(0, 0, 0)";
	}
	else
	{
		context.fillStyle = "rgb(90, 150, 240)";
	}
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	//Draw status text
	drawStatusText(this.currentTime);
	this.blockAnimation.draw();

	// Draw entities
	this.statusCoin.draw();
	if (this.goomba_01.active)
		this.goomba_01.draw();
	if(this.lose == false || this.player.dying == true)
		this.player.draw();
}

//layer 1 dibujar el bloque de query usado 
//y en el layer 3 mostrar el query con animacion

//cambiar el img de query block amarillo, es diferente