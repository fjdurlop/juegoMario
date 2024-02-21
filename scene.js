

// Scene. Updates and draws a single scene of the game.

const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;

function Scene() {
	// Loading texture to use in a TileMap
	var world1 = new Texture("imgs/world1_map.png");
	// Loading spritesheets
	var mario = new Texture("imgs/mario_sprite.png");

	// Create tilemap
	this.map = new Tilemap(world1, [16, 16], [6, 6], [0, 32], world11);
	// Prepare Mario sprite & its animations
	this.marioSprite = new Sprite(224, 224, 32, 32, 3, mario);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(MARIO_STAND_LEFT, [48, 32, 16, 16]);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [16, 0, 16, 16]);
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [32, 0, 16, 16]);
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [48, 0, 16, 16]);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 16]);



	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	if (keyboard[37]) // KEY_LEFT
	{
		if (this.marioSprite.currentAnimation != MARIO_WALK_LEFT)
			this.marioSprite.setAnimation(MARIO_WALK_LEFT);
		if (this.marioSprite.x >= 2)
			this.marioSprite.x -= 2;
	}
	else if (keyboard[39]) // KEY_RIGHT
	{
		if (this.marioSprite.currentAnimation != MARIO_WALK_RIGHT)
			this.marioSprite.setAnimation(MARIO_WALK_RIGHT);
		if (this.marioSprite.x < 480)
			this.marioSprite.x += 2;
	}
	else {
		if (this.marioSprite.currentAnimation == MARIO_WALK_LEFT)
			this.marioSprite.setAnimation(MARIO_STAND_LEFT);
		if (this.marioSprite.currentAnimation == MARIO_WALK_RIGHT)
			this.marioSprite.setAnimation(MARIO_STAND_RIGHT);
	}
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
}



