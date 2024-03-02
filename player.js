
const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;
const MARIO_JUMP_RIGHT = 4;
const MARIO_JUMP_LEFT = 5;


function Player(x, y, map) {
	// Loading spritesheets
	var mario = new Texture("imgs/mario.png");

	this.lives = 3;

	// Prepare Mario sprite & its animations
	this.sprite = new Sprite(x, y, 32, 32, 10, mario);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_LEFT, [96, 64, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [64, 64, 32, 32]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [32, 64, 32, 32]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [0, 64, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [64, 0, 32, 32]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [96, 0, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_JUMP_RIGHT, [0, 32, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_JUMP_LEFT, [96, 96, 32, 32]);

	this.sprite.setAnimation(MARIO_STAND_RIGHT);

	// Set tilemap for collisions
	this.map = map;

	// Set attributes for jump
	this.bJumping = false;
	this.jumpAngle = 0;
}


Player.prototype.update = function (deltaTime) {
	if (this.bJumping) // KEY_UP
	{
		if (this.sprite.currentAnimation == MARIO_WALK_LEFT || this.sprite.currentAnimation == MARIO_STAND_LEFT) {
			if (this.sprite.currentAnimation != MARIO_JUMP_LEFT)
				this.sprite.setAnimation(MARIO_JUMP_LEFT);
		}
		else if (this.sprite.currentAnimation == MARIO_WALK_RIGHT || this.sprite.currentAnimation == MARIO_STAND_RIGHT) {
			if (this.sprite.currentAnimation != MARIO_JUMP_RIGHT)
				this.sprite.setAnimation(MARIO_JUMP_RIGHT);
		}
	}
	else {
		if (this.sprite.currentAnimation == MARIO_JUMP_LEFT)
			this.sprite.setAnimation(MARIO_STAND_LEFT);
		if (this.sprite.currentAnimation == MARIO_JUMP_RIGHT)
			this.sprite.setAnimation(MARIO_STAND_RIGHT);
	}

	// Move Mario sprite left/right
	if (keyboard[37]) // KEY_LEFT
	{
		if (this.sprite.currentAnimation != MARIO_WALK_LEFT)
			this.sprite.setAnimation(MARIO_WALK_LEFT);
		this.sprite.x -= 2;
		if (this.map.collisionMoveLeft(this.sprite))
			this.sprite.x += 2;
	}
	else if (keyboard[39]) // KEY_RIGHT
	{
		if (this.sprite.currentAnimation != MARIO_WALK_RIGHT)
			this.sprite.setAnimation(MARIO_WALK_RIGHT);
		this.sprite.x += 2;
		if (this.map.collisionMoveRight(this.sprite))
			this.sprite.x -= 2;
	}
	else {
		if (this.sprite.currentAnimation == MARIO_WALK_LEFT)
			this.sprite.setAnimation(MARIO_STAND_LEFT);
		if (this.sprite.currentAnimation == MARIO_WALK_RIGHT)
			this.sprite.setAnimation(MARIO_STAND_RIGHT);
	}


	if (this.bJumping) {
		this.jumpAngle += 4;
		if (this.jumpAngle == 180) {
			this.bJumping = false;
			this.sprite.y = this.startY;
		}
		else {
			this.sprite.y = this.startY - 100 * Math.sin(3.14159 * this.jumpAngle / 180);
			if (this.jumpAngle > 90)
				this.bJumping = !this.map.collisionMoveDown(this.sprite);
		}
	}
	else {
		// Move Mario so that it is affected by gravity
		this.sprite.y += 2;
		if (this.map.collisionMoveDown(this.sprite)) {
			//this.sprite.y -= 2;

			// Check arrow up key. If pressed, jump.
			if (keyboard[38]) {
				this.bJumping = true;
				this.jumpAngle = 0;
				this.startY = this.sprite.y;
			}
		}

	}

	// Update sprites
	this.sprite.update(deltaTime);
}

Player.prototype.draw = function () {
	this.sprite.draw();
}

Player.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);

	return box;
}




