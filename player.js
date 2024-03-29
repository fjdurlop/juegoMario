
const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;
const MARIO_JUMP_RIGHT = 4;
const MARIO_JUMP_LEFT = 5;
const MARIO_DIE = 6;

const MINI_MARIO = 10;
const SUPER_MARIO = 11;
const STAR_MARIO = 12;

const MARIO_FLAG = 13;

function Player(x, y, map) {
	// Loading spritesheets
	var mario = new Texture("imgs/mario.png");
	this.jumpAudio = AudioFX('sounds/smb_jump-super.wav');
	this.diedMusic = AudioFX('sounds/smb_mariodie.wav');
	this.stompMusic = AudioFX('sounds/smb_stomp.wav');

	this.active = true;
	this.lives = 1;
	this.state = MINI_MARIO;
	this.transforming = false;
	this.supermario = new SuperPlayer(x, y + 32, map);

	// Prepare Mario sprite & its animations
	this.sprite = new Sprite(x, y, 32, 32, 5, mario);

	//TODO:star mario animation
	// this.sprite.addAnimation();
	// this.sprite.addKeyframe(STAR_MARIO, []);

	//miniMario to superMario
	//this.sprite.addAnimation();
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 6 * 32, 32, 32]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 7 * 32, 32, 48]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 6 * 32, 32, 32]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 7 * 32, 32, 48]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 6 * 32, 32, 32]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 7 * 32, 32, 48]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 4 * 32, 32, 32 * 2]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 7 * 32, 32, 48]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 4 * 32, 32, 32 * 2]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 7 * 32, 32, 48]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 6 * 32, 32, 32]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 7 * 32, 32, 48]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 4 * 32, 32, 32 * 2]);
	// this.sprite.addKeyframe(SUPER_MARIO, [0, 4 * 32, 32, 32 * 2]);

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

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_DIE, [32, 32, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_FLAG, [32, 64, 32, 32]);

	this.sprite.setAnimation(MARIO_STAND_RIGHT);

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
	this.finish_dying =false;
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

Player.prototype.stateUpdate = function () {
	if (this.transforming) {
		//this.timeFreeze = true;
		if (this.state == SUPER_MARIO) {
			//this.sprite.setAnimation(SUPER_MARIO);
			this.active = false;
			this.supermario.active = true;
			this.supermario.sprite.x = this.sprite.x;
			this.supermario.sprite.y = this.sprite.y - 32;
			this.supermario.bJumping = false;
		}
		else if (this.state == STAR_MARIO) {

		}
	}
	this.transforming = false;
	//this.timeFreeze = false;
}

Player.prototype.update = function (deltaTime) {
	this.supermario.update();

	if (this.active) {
		if (this.lives == 0) { // problem: always reinitiate to dying
			this.dying = true;
			console.log("player: dying: ",this.dying);
		}

		//animation when mario dies
		if (this.dying) {
			//console.log("dying!!");
			this.allow_keys = false;
			this.sprite.setAnimation(MARIO_DIE);

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
					console.log("y: ",this.sprite.y);
					if(this.sprite.y > 32*15){
						console.log("finish_dying");
						this.finish_dying = true;
					}
				}
			}
		}

		//flag
		if (this.in_flag && !this.in_flag_finish) {
			console.log("mario: IN_FLAG!!");
			this.allow_keys = false;
			this.sprite.setAnimation(MARIO_FLAG);
			var collision_down = this.map.collisionMoveDown(this.sprite)
			if(!collision_down[0]){
				this.sprite.y += 2;
			}else{
				console.log("in_flag finished")
				this.in_flag_finish =true;
			}
		}

		if (this.just_pressed) {
			this.pressing_timer += deltaTime;
			if (this.pressing_timer >= 500) {
				//console.log("-----------------");
				console.log("finish pressing");
				this.just_pressed = false;
				this.pressing_timer = 0;

			}
		}

		//animation when mario dies
		if (this.just_pressed) {
			console.log("pressing!!");
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
					console.log("finish pressing");
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
				if (this.sprite.currentAnimation != MARIO_WALK_LEFT && this.bJumping == false) {
					this.sprite.setAnimation(MARIO_WALK_LEFT);
				}
				else if (this.sprite.currentAnimation != MARIO_JUMP_LEFT && this.bJumping) {
					this.sprite.setAnimation(MARIO_JUMP_LEFT);
				}

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
				if (this.sprite.currentAnimation != MARIO_WALK_RIGHT && this.bJumping == false)
					this.sprite.setAnimation(MARIO_WALK_RIGHT);
				else if (this.sprite.currentAnimation != MARIO_JUMP_RIGHT && this.bJumping) {
					this.sprite.setAnimation(MARIO_JUMP_RIGHT);
				}

				//this.sprite.x += 2;
				last_x = this.sprite.x;
				this.sprite.x = this.sprite.x + this.speed * deltaTime / 1000.0;
				if (this.map.collisionMoveRight(this.sprite)) {
					this.sprite.x = last_x;
				}
			}
			else { //stand
				if (this.sprite.currentAnimation == MARIO_WALK_LEFT)
					this.sprite.setAnimation(MARIO_STAND_LEFT);
				if (this.sprite.currentAnimation == MARIO_WALK_RIGHT)
					this.sprite.setAnimation(MARIO_STAND_RIGHT);
				if (this.bJumping && this.sprite.currentAnimation == MARIO_STAND_LEFT)
					this.sprite.setAnimation(MARIO_JUMP_LEFT)
				if (this.bJumping && this.sprite.currentAnimation == MARIO_STAND_RIGHT)
					this.sprite.setAnimation(MARIO_JUMP_RIGHT)
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
							var collision_down = this.map.collisionMoveDown(this.sprite)
							this.bJumping = !collision_down[0];
							if (collision_down[1])
								this.lives -=1;
							//this.bJumping = !this.map.collisionMoveDown(this.sprite);
						}
					}
				}
			}
			else {
				// Move Mario so that it is affected by gravity
				this.sprite.y += 4;
				var collision_down = this.map.collisionMoveDown(this.sprite)
				if (collision_down[1])
					this.lives -=1;
				if (collision_down[0]) {
				//if (this.map.collisionMoveDown(this.sprite)) {
					//this.sprite.y -= 2;
					if (this.sprite.currentAnimation == MARIO_JUMP_LEFT)
						this.sprite.setAnimation(MARIO_STAND_LEFT);
					if (this.sprite.currentAnimation == MARIO_JUMP_RIGHT)
						this.sprite.setAnimation(MARIO_STAND_RIGHT);
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

Player.prototype.draw = function () {
	this.supermario.draw();
	this.active && this.sprite.draw();
}

Player.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x, this.sprite.y, this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height);
	return box;
}

Player.prototype.collisionTop = function () {
	var box = new Box(this.sprite.x + 10, this.sprite.y - 2, this.sprite.x + this.sprite.width - 20, this.sprite.y + 2);
	return box;
}