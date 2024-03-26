

// Scene. Updates and draws a single scene of the game.

function Scene() {
	this.gameoverMusic = AudioFX('sounds/smb_gameover.wav');
	this.stageClearMusic = AudioFX('sounds/smb_stage_clear.wav');
	this.flagPoleMusic = AudioFX('sounds/smb_flagpole.wav');
	//when mario transforms from supermario to minimario
	this.pipeMusic = AudioFX('sounds/smb_pipe.wav');


	// Loading texture to use in a TileMap
	this.world = 1;
	// Create tilemap
	if (this.world == 1) {
		var tilesheet = new Texture("imgs/world1.png");
		this.map = new Tilemap(tilesheet, [32, 32], [6, 6], [0, 32], world1);
		this.music = AudioFX('sounds/main_theme.mp3', { loop: true });
		this.hurryMusic = AudioFX('sounds/main_theme_hurry.mp3', { loop: true });
	}
	else if (this.world == 2) {
		var tilesheet = new Texture("imgs/level2_00.png");//world02
		this.map = new Tilemap(tilesheet, [32, 32], [6, 6], [0, 32], world02);//world02
		this.music = AudioFX('sounds/second_theme.mp3', { loop: true });
		this.hurryMusic = AudioFX('sounds/second_theme_hurry.mp3', { loop: true });
	}

	// Create entities

	//this.player = new SuperPlayer(150, 400, this.map);
	this.player = new Player(150, 400, this.map);
	this.statusCoin = new StatusCoin(265, 35);
	this.blockAnimation = new BlockAnimation(this.map);

	this.testSprite = new BPiece(100, 100);
	// this.testSprite.active = true;
	// this.testSprite.play = true;

	this.goomba_01 = new Goomba(29 * 32, 13 * 32, this.map);
	this.goomba_01.active = true;
	this.turtle = new Turtle(33 * 32, 12 * 32, this.map);

	//this.goombaKilled = false; // Goomba had killed mario
	this.lose = false;
	this.timeFreeze = false;

	// Store current time
	this.currentTime = 0;
	this.gameTime = 0;
	this.goombaTime = 0;
	this.dyingTime = 0;

	this.scroll = 0;
	this.d = 0;
}

Scene.prototype.update = function (deltaTime) {
	this.currentTime += deltaTime;

	if (!this.timeFreeze) {
		// Keep track of time
		this.gameTime += deltaTime;

		if (interacted)
			this.music.play();

		// Update entities
		this.player.update(deltaTime);
		this.testSprite.update(deltaTime);

		if (this.player.sprite.x <= this.d + 400 && this.player.sprite.x > this.d) {
			this.scroll = this.d;
		}
		else {
			this.scroll = this.player.sprite.x - 400;
			if (this.scroll > this.d)
				this.d = this.scroll;
		}

		if (this.player.sprite.x <= this.d + 2) {
			this.player.sprite.x += 2;
		}

		this.statusCoin.update(deltaTime);
		this.goomba_01.update(deltaTime);
		// update del blockAnimation
		this.blockAnimation.update(deltaTime);

		if (this.player.dying) {
			this.dyingTime += deltaTime;
			if (this.dyingTime >= 500) {
				//console.log("-----------------");
				this.player.dying = false;
				this.dyingTime = 0;
			}
		}

		if (this.goomba_01.active && this.goomba_01.killed) {
			this.goomba_01.dyingTime += deltaTime;
			if (this.goomba_01.dyingTime >= 500) {
				//console.log("-----------------");
				this.goomba_01.active = false;
				this.goomba_01.dyingTime = 0;
			}
		}

		// if (this.turtle.active && this.turtle.killed) {
		// 	this.turtle.dyingTime += deltaTime;
		// 	if (this.turtle.dyingTime >= 500) {
		// 		//console.log("-----------------");
		// 		this.turtle.active = false;
		// 		this.turtle.dyingTime = 0;
		// 	}
		// }

		// Check for collision between entities
		if (this.player.collisionBox().intersect(this.goomba_01.collisionTop()) && this.goomba_01.killed_mario == false) {
			if (this.player.sprite.y + this.player.sprite.height <= this.goomba_01.sprite.y + 5) {
				//console.log("from above")
				console.log("y: ", this.player.sprite.y, " h: ", this.player.sprite.height, " goomba ", this.goomba_01.sprite.y)
				this.player.just_pressed = true;
				this.goomba_01.killed = true;
			}
		}
		if (this.player.collisionBox().intersect(this.goomba_01.collisionBox()) && this.goomba_01.killed == false && this.goomba_01.killed_mario == false) {
			//this.lose = true;
			this.player.lives -= 1;
			console.log("Reduced lives");
			//console.log(this.player.lives);
			if (this.player.lives == 0) {
				this.lose = true;
			}
			this.goomba_01.killed_mario = true; //there was an attack to mario
		}

		//collisions with turtle
		if (this.player.collisionBox().intersect(this.turtle.collisionTop())
			&& this.turtle.killed == false && this.turtle.killed_mario == false && this.player.just_pressed == false) {
			console.log("Enter")
			console.log("y: ", this.player.sprite.y, " h: ", this.player.sprite.height, " goomba ", this.turtle.sprite.y - 16)
			if (this.player.sprite.y - this.player.sprite.height <= this.turtle.sprite.y - 16 - 2) {
				console.log("turtle: from above")
				console.log("2y: ", this.player.sprite.y, " h: ", this.player.sprite.height, " goomba ", this.turtle.sprite.y - 16)
				console.log(this.turtle.sprite.y - 16)


				if (this.turtle.pressed_static == true) {
					this.player.sprite.y -= 2;
					console.log("just_pressed to true");
					this.player.just_pressed = true;

					this.turtle.pressed_static = false;
					this.turtle.direction = getDirection(this.player.sprite.x, this.player.sprite.width, this.turtle.sprite.x, this.turtle.sprite.width);
					this.turtle.pressed_moving = true;
					console.log("turtle: to moving");
				}
				else if (this.turtle.pressed_moving == true) {
					console.log("turtle:pressing pressed_moving turtle");
				}
				else {
					this.player.sprite.y -= 2;
					console.log("just_pressed to true");
					this.player.just_pressed = true;

					this.turtle.pressed_static = true;
					console.log("turtle:to pressed_static");
				}
			}

			//console.log("Goomba dies!!")
		}
		//turtle kills mario
		if (this.player.collisionBox().intersect(this.turtle.collisionBox()) && this.turtle.killed == false
			&& this.turtle.killed_mario == false && this.player.just_pressed == false) {
			console.log("pressed_static", this.turtle.pressed_static)
			console.log("just_pressed", this.player.just_pressed)

			if (this.turtle.pressed_static == false && this.player.just_pressed == false) {
				this.lose = true;
				this.player.lives -= 1;
				console.log("turtle:Reduced lives");
				//console.log(this.player.lives);
				if (this.player.lives == 0) {
					this.lose = true;
				}
				this.turtle.killed_mario = true; //there was an attack to mario
			}
			else if (this.player.just_pressed == false) {
				this.player.just_pressed = true;
				this.player.sprite.y -= 2;
				this.turtle.pressed_static = false;
				this.turtle.direction = getDirection(this.player.sprite.x, this.player.sprite.width, this.turtle.sprite.x, this.turtle.sprite.width);
				this.turtle.pressed_moving = true;
				console.log("turtle2: to moving");
			}

		}
		this.blockAnimation.checkCollision(this.player);
	}
	else {
		this.player.update(deltaTime);
	}
	this.timeFreeze = this.player.timeFreeze;
}

function getDirection(marioX, marioWidth, turtleX, turtleWidth) {
	// Calculate the right side of Mario
	marioRightSide = marioX + marioWidth;

	// Calculate the center of the turtle
	turtleCenter = turtleX + turtleWidth / 2;

	// If Mario's right side is to the left of the turtle's center, the turtle should slide to the right.
	if (marioRightSide < turtleCenter) {
		console.log("Direction: ", 1);
		return 1;
	}
	// Otherwise, if Mario's right side is to the right of the turtle's center, the turtle should slide to the left.
	else {
		console.log("Direction: ", 0);
		return 0;
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
	if (restantTime < 0) {
		restantTime = 0;
		//TODO: when times up, do something
	}
	else if (restantTime == 100) {
		//this.music.stop();
		this.hurryMusic.play();
	}
	context.fillText('TIME', 21 * 32, 30);
	context.fillText(restantTime + ' ', 21 * 32, 50);

}

Scene.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	if (this.lose) {
		//console.log("Losing!!")
		context.fillStyle = "rgb(0, 0, 0)";
	}
	else {
		context.fillStyle = "rgb(90, 150, 240)";
	}
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.save();
	context.translate(-this.scroll, 0);
	this.map.draw();

	this.blockAnimation.draw();
	this.testSprite.active && this.testSprite.draw();

	// Draw entities
	if (this.goomba_01.active)
		this.goomba_01.draw();
	if (this.lose == false || this.player.dying == true)
		this.player.draw();
	this.turtle.draw();
	context.restore();

	//Draw status text
	drawStatusText(this.gameTime);
	this.statusCoin.draw();

}