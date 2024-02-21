

const BUB_STAND_LEFT = 0;
const BUB_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const BUB_WALK_RIGHT = 3;


// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Loading spritesheets
	var bub = new Texture("imgs/bub.png");
	var bubble = new Texture("imgs/bubble.png");

	// Prepare Bub sprite & its animations
	this.marioSprite = new Sprite(224, 224, 32, 32, 7, bub);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(BUB_STAND_LEFT, [0, 0, 32, 32]);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(BUB_STAND_RIGHT, [32, 0, 32, 32]);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [0, 0, 32, 32]);
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [0, 32, 32, 32]);
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [0, 64, 32, 32]);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(BUB_WALK_RIGHT, [32, 0, 32, 32]);
	this.marioSprite.addKeyframe(BUB_WALK_RIGHT, [32, 32, 32, 32]);
	this.marioSprite.addKeyframe(BUB_WALK_RIGHT, [32, 64, 32, 32]);

	this.marioSprite.setAnimation(BUB_STAND_RIGHT);

	// Prepare bubble sprite & its animation
	this.bubbleSprite = new Sprite(400, 160, 32, 32, 3, bubble);

	this.bubbleSprite.addAnimation();
	this.bubbleSprite.addKeyframe(0, [0, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [16, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [32, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [48, 0, 16, 16]);

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	// Move Bub sprite
	if (keyboard[37]) // KEY_LEFT
	{
		if (this.marioSprite.currentAnimation != MARIO_WALK_LEFT)
			this.marioSprite.setAnimation(MARIO_WALK_LEFT);
		if (this.marioSprite.x >= 2)
			this.marioSprite.x -= 2;
	}
	else if (keyboard[39]) // KEY_RIGHT
	{
		if (this.marioSprite.currentAnimation != BUB_WALK_RIGHT)
			this.marioSprite.setAnimation(BUB_WALK_RIGHT);
		if (this.marioSprite.x < 480)
			this.marioSprite.x += 2;
	}
	else {
		if (this.marioSprite.currentAnimation == MARIO_WALK_LEFT)
			this.marioSprite.setAnimation(BUB_STAND_LEFT);
		if (this.marioSprite.currentAnimation == BUB_WALK_RIGHT)
			this.marioSprite.setAnimation(BUB_STAND_RIGHT);
	}

	// Update sprites
	this.marioSprite.update(deltaTime);
	this.bubbleSprite.update(deltaTime);
}

Scene.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw bub sprite
	this.marioSprite.draw();

	// Draw enemy captured in a bubble sprite
	this.bubbleSprite.draw();
}



