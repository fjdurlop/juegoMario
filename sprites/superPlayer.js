
const SMARIO_STAND_LEFT = 0;
const SMARIO_STAND_RIGHT = 1;
const SMARIO_WALK_LEFT = 2;
const SMARIO_WALK_RIGHT = 3;
const SMARIO_JUMP_RIGHT = 4;
const SMARIO_JUMP_LEFT = 5;
const SMARIO_DOWN_RIGHT = 6;
const SMARIO_DOWN_LEFT = 7;
const SMARIO_FLAG = 8;

function SuperPlayer(x, y, map) {
	// Loading spritesheets
	var mario = new Texture("imgs/supermario.png");

	this.jumpAudio = AudioFX('sounds/smb_jump-super.wav');
	this.starTheme = AudioFX('sounds/starTheme.mp3');

	this.active = true;
	this.lives = 1;
	this.state = SUPER_MARIO;
	this.transforming = false;
	this.Btransform = false;
	this.transformTime = 0;
	this.starTime = 0;
	this.enableStarTime = false;

	// Prepare Mario sprite & its animations
	this.sprite = new Sprite(x, y, 32, 64, 10, mario);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_STAND_LEFT, [0, 64, 32, 64]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_STAND_RIGHT, [0, 0, 32, 64]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32, 64, 32, 64]);
	this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 2, 64, 32, 64]);
	this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 3, 64, 32, 64]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32, 0, 32, 64]);
	this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 2, 0, 32, 64]);
	this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 3, 0, 32, 64]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_JUMP_RIGHT, [32 * 5, 0, 32, 64]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_JUMP_LEFT, [32 * 5, 64, 32, 64]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_DOWN_RIGHT, [32 * 6, 0, 32, 32 + 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_DOWN_LEFT, [32 * 6, 64, 32, 32 + 16]);
	//TODO: animacion freno

	this.sprite.addAnimation();
	this.sprite.addKeyframe(SMARIO_FLAG, [32 * 5, 0, 32, 64]);
	//xinlei: si no funciona, puede ser pq array_animations[MARIOF_FLAG] no existe, OVERFLOW

	this.transformSprite = new Sprite(x, y - 32, 32, 64, 7, mario);
	this.transformSpriteActive = false;

	//super mario to minimario 
	this.transformSprite.addAnimation();//add slot number 0
	this.transformSprite.addKeyframe(MARIO_TRANSFORM, [32, 64 * 8, 32, 64]);//s
	this.transformSprite.addKeyframe(MARIO_TRANSFORM, [0, 64 * 8, 32, 64]);//m
	this.transformSprite.addKeyframe(MARIO_TRANSFORM, [32, 64 * 8, 32, 64]);//s
	this.transformSprite.addKeyframe(MARIO_TRANSFORM, [0, 64 * 8, 32, 64]);//m
	this.transformSprite.addKeyframe(MARIO_TRANSFORM, [32, 64 * 8, 32, 32]);//s
	this.transformSprite.addKeyframe(MARIO_TRANSFORM, [0, 64 * 8, 32, 64]);//m
	this.transformSprite.addKeyframe(MARIO_TRANSFORM, [0, 0, 32, 64]);//b

	this.transformSprite.setAnimation(MARIO_TRANSFORM);
	this.sprite.setAnimation(SMARIO_STAND_RIGHT);

	// Set tilemap for collisions
	this.map = map;

	// Set attributes for jump
	this.bJumping = false;
	this.jumpAngle = 0;

	this.dying = false;
	this.just_pressed = false;
	this.allow_keys = true;
	this.timeFreeze = false;

	this.start_dying = false;
	this.start_pressing = false;
	this.accelerating = false;
	this.speed = 0;
	this.pressing_timer = 0;
	this.in_flag = false;
	this.in_flag_finish = false;
}

var minWalkSpeed = 60;
var walkAccel = 60;
var runAccel = 120;
var releaseDecel = 360;
var maxWalkSpeed = 120;
var maxRunSpeed = 240;

SuperPlayer.prototype.transformAnimation = function () {
	this.timeFreeze = true;
	this.transformSpriteActive = true;
	this.active = false;
	this.transformSprite.x = this.sprite.x;
	this.transformSprite.y = this.sprite.y + 32;
	this.transforming = false;
}

SuperPlayer.prototype.setStarTime = function (deltaTime) {
	var deltaSeconds = deltaTime / 1000;
	if (this.enableStarTime) {
		this.starTime += deltaSeconds;
		console.log("star time: " + this.starTime);
		if (this.starTime >= STAR_TIME)
			this.changeStarAnimation(false);
	}
}

SuperPlayer.prototype.setFreezeTime = function (deltaTime) {
	var deltaSeconds = deltaTime / 1000;
	this.transformTime += deltaSeconds;
	console.log("transform time: " + this.transformTime);
	if (this.transformTime >= TRANSFORM_TIME) {	//transform time
		this.timeFreeze = false;
		this.Btransform = true;
		this.transformSpriteActive = false;
	}
}

SuperPlayer.prototype.changeStarAnimation = function (bStar) {
	if (bStar) {
		this.starTheme.play();
		this.enableStarTime = true;
		this.sprite.clearAnimation(SMARIO_STAND_LEFT);
		this.sprite.addKeyframe(SMARIO_STAND_LEFT, [0, 3 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_STAND_LEFT, [0, 5 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_STAND_LEFT, [0, 7 * 64, 32, 64]);

		this.sprite.clearAnimation(SMARIO_STAND_RIGHT);
		this.sprite.addKeyframe(SMARIO_STAND_RIGHT, [0, 64 * 2, 32, 64]);
		this.sprite.addKeyframe(SMARIO_STAND_RIGHT, [0, 64 * 4, 32, 64]);
		this.sprite.addKeyframe(SMARIO_STAND_RIGHT, [0, 64 * 6, 32, 64]);

		this.sprite.clearAnimation(SMARIO_WALK_LEFT);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32, 3 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32, 5 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32, 7 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 2, 3 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 2, 5 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 2, 7 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 3, 3 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 3, 5 * 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 3, 7 * 64, 32, 64]);

		this.sprite.clearAnimation(SMARIO_WALK_RIGHT);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32, 64 * 2, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32, 64 * 4, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32, 64 * 6, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 2, 64 * 2, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 2, 64 * 4, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 2, 64 * 6, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 3, 64 * 2, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 3, 64 * 4, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 3, 64 * 6, 32, 64]);

		this.sprite.clearAnimation(SMARIO_JUMP_LEFT);
		this.sprite.addKeyframe(SMARIO_JUMP_LEFT, [32 * 5, 64 * 3, 32, 64]);
		this.sprite.addKeyframe(SMARIO_JUMP_LEFT, [32 * 5, 64 * 5, 32, 64]);
		this.sprite.addKeyframe(SMARIO_JUMP_LEFT, [32 * 5, 64 * 7, 32, 64]);

		this.sprite.clearAnimation(SMARIO_JUMP_RIGHT);
		this.sprite.addKeyframe(SMARIO_JUMP_RIGHT, [32 * 5, 64 * 2, 32, 64]);
		this.sprite.addKeyframe(SMARIO_JUMP_RIGHT, [32 * 5, 64 * 4, 32, 64]);
		this.sprite.addKeyframe(SMARIO_JUMP_RIGHT, [32 * 5, 64 * 6, 32, 64]);

		this.sprite.clearAnimation(SMARIO_DOWN_LEFT);
		this.sprite.addKeyframe(SMARIO_DOWN_LEFT, [32 * 6, 64 * 3, 32, 32 + 16]);
		this.sprite.addKeyframe(SMARIO_DOWN_LEFT, [32 * 6, 64 * 5, 32, 32 + 16]);
		this.sprite.addKeyframe(SMARIO_DOWN_LEFT, [32 * 6, 64 * 7, 32, 32 + 16]);

		this.sprite.clearAnimation(SMARIO_DOWN_RIGHT);
		this.sprite.addKeyframe(SMARIO_DOWN_RIGHT, [32 * 6, 64 * 2, 32, 32 + 16]);
		this.sprite.addKeyframe(SMARIO_DOWN_RIGHT, [32 * 6, 64 * 4, 32, 32 + 16]);
		this.sprite.addKeyframe(SMARIO_DOWN_RIGHT, [32 * 6, 64 * 6, 32, 32 + 16]);

		//TODO: animacion freno
		this.sprite.setAnimation(SMARIO_STAND_RIGHT);
	}
	else {
		this.starTheme.stop();
		this.enableStarTime = false;
		this.starTime = 0;
		this.sprite.clearAnimation(SMARIO_STAND_LEFT);
		this.sprite.addKeyframe(SMARIO_STAND_LEFT, [0, 64, 32, 64]);

		this.sprite.clearAnimation(SMARIO_STAND_RIGHT);
		this.sprite.addKeyframe(SMARIO_STAND_RIGHT, [0, 0, 32, 64]);

		this.sprite.clearAnimation(SMARIO_WALK_LEFT);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32, 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 2, 64, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_LEFT, [32 * 3, 64, 32, 64]);

		this.sprite.clearAnimation(SMARIO_WALK_RIGHT);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32, 0, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 2, 0, 32, 64]);
		this.sprite.addKeyframe(SMARIO_WALK_RIGHT, [32 * 3, 0, 32, 64]);

		this.sprite.clearAnimation(SMARIO_JUMP_LEFT);
		this.sprite.addKeyframe(SMARIO_JUMP_LEFT, [32 * 5, 64, 32, 64]);

		this.sprite.clearAnimation(SMARIO_JUMP_RIGHT);
		this.sprite.addKeyframe(SMARIO_JUMP_RIGHT, [32 * 5, 0, 32, 64]);

		this.sprite.clearAnimation(SMARIO_DOWN_LEFT);
		this.sprite.addKeyframe(SMARIO_DOWN_LEFT, [32 * 6, 64, 32, 32 + 16]);

		this.sprite.clearAnimation(SMARIO_DOWN_RIGHT);
		this.sprite.addKeyframe(SMARIO_DOWN_RIGHT, [32 * 6, 0, 32, 32 + 16]);

		//TODO: animacion freno
		this.sprite.setAnimation(SMARIO_STAND_RIGHT);
	}
}

SuperPlayer.prototype.update = function (deltaTime) {
	this.setStarTime(deltaTime);

	if (this.timeFreeze) {
		this.setFreezeTime(deltaTime);
	}
	this.transformSpriteActive && this.transformSprite.update(deltaTime);

	if (this.active) {
		if (this.lives == 0) { // problem: always reinitiate to dying
			this.dying = true;
		}

		//animation when mario dies
		if (this.dying) {
			//console.log("dying!!");
			this.allow_keys = false;
			this.sprite.setAnimation(MARIO_DIE);//not die just downgrade

			if (this.start_dying == false) {
				this.start_dying = true;
				this.initial_dying = this.sprite.y;
				//console.log("dying");
				//console.log(this.sprite.y);
				this.die_up = true;
			}
			else {
				if (this.die_up == true) {
					this.sprite.y -= 2;
					if (this.initial_dying - 3 * 32 > this.sprite.y) {
						this.die_up = false;
					}

				}
				else if (this.die_up == false) {
					this.sprite.y += 2;
				}
			}
		}

		//flag
		if (this.in_flag && !this.in_flag_finish) {
			console.log("smario: IN_FLAG!!");
			this.allow_keys = false;
			this.sprite.setAnimation(SMARIO_FLAG);
			var collision_down = this.map.collisionMoveDown(this.sprite)
			if (!collision_down[0]) {
				this.sprite.y += 2;
			} else {
				//console.log("in_flag finished")
				this.in_flag_finish = true;
			}
		}

		if (this.just_pressed) {
			this.pressing_timer += deltaTime;
			if (this.pressing_timer >= 500) {
				//console.log("-----------------");
				//console.log("finish pressing");
				this.just_pressed = false;
				this.pressing_timer = 0;

			}
		}

		//animation when mario dies
		if (this.just_pressed) {
			//console.log("pressing!!");
			// this.allow_keys = false;
			// this.sprite.setAnimation(MARIO_DIE);
			if (this.start_pressing == false) {
				this.start_pressing = true;
				this.initial_pressing = this.sprite.y;
				//console.log("dying");
				//console.log(this.sprite.y);
				this.press_up = true;
			}
			else {
				//console.log("22");
				if (this.press_up == true) {
					//this.sprite.y -= 2;
					if (this.initial_pressing - 2 > this.sprite.y) {
						this.press_up = false;
					}

				}
				else {
					//console.log("33")
					this.sprite.y += 2;
					//console.log("finish pressing");
					//this.just_pressed = false;
				}
			}
		}

		//animation when mario kills someone
		// if (this.just_pressed) { 
		// 	//console.log("dying!!");
		// 	//this.allow_keys = false;
		// 	//this.sprite.setAnimation(MARIO_DIE);
		// 	if(this.bJumping ==false){
		// 		this.bJumping = true;
		// 		this.jumpAngle = 0;
		// 		this.startY = this.sprite.y;
		// 	}else{
		// 		if (this.startY - 2 * 32 > this.sprite.y) {
		// 			console.log("mario: ", this.this.startY - 2 * 32 )
		// 			console.log("mario_y: ", this.this.sprite.y )
		// 			this.bJumping = false;
		// 		}
		// 	}

		// }

		if (this.allow_keys) {
			var accel = 0;

			if (keyboard[37] || keyboard[39]) {
				// Pressing move buttons
				if (keyboard[37] && (this.speed > -minWalkSpeed))
					this.speed = -minWalkSpeed;
				else if (keyboard[39] && (this.speed < minWalkSpeed))
					this.speed = minWalkSpeed;
				// Prepare acceleration according to action (walk or run)
				if (keyboard[16]) {
					this.accelerating = true;
					if (keyboard[37])
						accel = -runAccel;
					else
						accel = runAccel;
				}
				else {
					this.accelerating = false;
					if (keyboard[37])
						accel = -walkAccel;
					else
						accel = walkAccel;
				}
			}
			else {
				if (this.speed > 0)
					accel = -releaseDecel;
				else if (this.speed < 0)
					accel = releaseDecel;
				else
					accel = 0;
			}

			// Move Mario sprite left/right
			if (keyboard[37]) // KEY_LEFT
			{
				if (this.sprite.currentAnimation != SMARIO_WALK_LEFT && this.bJumping == false)
					this.sprite.setAnimation(SMARIO_WALK_LEFT);
				else if (this.sprite.currentAnimation != SMARIO_JUMP_LEFT && this.bJumping)
					this.sprite.setAnimation(SMARIO_JUMP_LEFT);

				//this.sprite.x -= 2;
				// Move according to current speed
				last_x = this.sprite.x;
				this.sprite.x = this.sprite.x + this.speed * deltaTime / 1000.0;
				if (this.map.collisionMoveLeft(this.sprite)) {
					this.sprite.x = last_x;
				}
			}
			else if (keyboard[39]) // KEY_RIGHT
			{
				if (this.sprite.currentAnimation != SMARIO_WALK_RIGHT && this.bJumping == false)
					this.sprite.setAnimation(SMARIO_WALK_RIGHT);
				else if (this.sprite.currentAnimation != SMARIO_JUMP_RIGHT && this.bJumping)
					this.sprite.setAnimation(SMARIO_JUMP_RIGHT);

				//this.sprite.x += 2;
				last_x = this.sprite.x;
				this.sprite.x = this.sprite.x + this.speed * deltaTime / 1000.0;
				if (this.map.collisionMoveRight(this.sprite)) {
					this.sprite.x = last_x;
				}
			}
			else if (keyboard[40]) {
				if ((this.speed >= 0 && this.sprite.currentAnimation == SMARIO_WALK_RIGHT) || this.sprite.currentAnimation == SMARIO_STAND_RIGHT)
					this.sprite.setAnimation(SMARIO_DOWN_RIGHT);
				else if ((this.speed <= 0 && this.sprite.currentAnimation == SMARIO_WALK_LEFT) || this.sprite.currentAnimation == SMARIO_STAND_LEFT)
					this.sprite.setAnimation(SMARIO_DOWN_LEFT);
			}
			else { //stand
				if (this.sprite.currentAnimation == SMARIO_WALK_LEFT)
					this.sprite.setAnimation(SMARIO_STAND_LEFT);
				if (this.sprite.currentAnimation == SMARIO_WALK_RIGHT)
					this.sprite.setAnimation(MARIO_STAND_RIGHT);
				if (this.bJumping && this.sprite.currentAnimation == SMARIO_STAND_LEFT)
					this.sprite.setAnimation(SMARIO_JUMP_LEFT)
				if (this.bJumping && this.sprite.currentAnimation == SMARIO_STAND_RIGHT)
					this.sprite.setAnimation(SMARIO_JUMP_RIGHT)
			}

			// Apply acceleration to current speed
			if (keyboard[37] || keyboard[39]) {
				this.speed = this.speed + accel * deltaTime / 1000.0;

				// Respect maximum speeds
				if (keyboard[16]) {
					if (Math.abs(this.speed) > maxRunSpeed) {
						if (this.speed > 0)
							this.speed = maxRunSpeed;
						else
							this.speed = -maxRunSpeed;
					}
				}
				else {
					if (Math.abs(this.speed) > maxWalkSpeed) {
						if (this.speed > 0)
							this.speed = maxWalkSpeed;
						else
							this.speed = -maxWalkSpeed;
					}
				}
			}
			else {
				// Be careful to stop when current acceleration gets close to zero
				if (this.speed > 0) {
					this.speed = this.speed + accel * deltaTime / 1000.0;
					if (this.speed < minWalkSpeed)
						this.speed = 0;
				}
				else if (this.speed < 0) {
					this.speed = this.speed + accel * deltaTime / 1000.0;
					if (this.speed > -minWalkSpeed)
						this.speed = 0;
				}
			}

			//console.log("Speed = " + this.speed);

			//Mario jumping
			if (this.bJumping) {
				this.jumpAngle += 4;
				if (this.jumpAngle == 180) {
					this.bJumping = false;
					this.sprite.y = this.startY;
				}
				else {
					if (this.map.collisionMoveUp(this.sprite)) {
						this.bJumping = false;
					} else {
						this.sprite.y = this.startY - (32 * 4 + 2) * Math.sin(3.14159 * this.jumpAngle / 180);
						if (this.jumpAngle > 90) {
							this.bJumping = !this.map.collisionMoveDown(this.sprite)[0];
						}
					}
				}
			}
			else {
				// Move Mario so that it is affected by gravity
				this.sprite.y += 4;
				var collision_down = this.map.collisionMoveDown(this.sprite)
				if (collision_down[1])
					this.lives -= 1;
				if (collision_down[0]) {
					//this.sprite.y -= 2;
					if (this.sprite.currentAnimation == SMARIO_JUMP_LEFT)
						this.sprite.setAnimation(SMARIO_STAND_LEFT);
					if (this.sprite.currentAnimation == SMARIO_JUMP_RIGHT)
						this.sprite.setAnimation(SMARIO_STAND_RIGHT);
					// Check arrow up key. If pressed, jump.
					if (keyboard[38] || keyboard[32] || this.just_pressed) {
						this.jumpAudio.stop();
						this.jumpAudio.play();
						this.bJumping = true;
						this.jumpAngle = 0;
						this.startY = this.sprite.y;
					}
				}
			}
		}
		// Update sprites
		this.sprite.update(deltaTime);
	}
}

SuperPlayer.prototype.draw = function () {
	this.active && this.sprite.draw();
	this.transformSpriteActive && this.transformSprite.draw();
}

SuperPlayer.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x, this.sprite.y, this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height);
	return box;
}

SuperPlayer.prototype.collisionTop = function () {
	var box = new Box(this.sprite.x + 10, this.sprite.y - 2, this.sprite.x + this.sprite.width - 20, this.sprite.y + 2);
	return box;
}