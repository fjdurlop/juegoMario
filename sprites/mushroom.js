

function Mushroom(x, y, map) {
	var powerups = new Texture("imgs/powerups.png");

	// var tilesheet = new Texture("imgs/world1.png");
	// this.map = new Tilemap(tilesheet, [32, 32], [6, 6], [0, 32], world1);
	this.map = map;
	this.active = false;
	this.play = false;
	this.right = true;

	this.sprite = new Sprite(x, y, 32, 32, 14, powerups);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 32, 32, 32]);

	this.sprite.setAnimation(0);
}

Mushroom.prototype.update = function (deltaTime) {
	if (this.play) {
		this.active = true;
		//TODO:usar func translate for moveUP
		if (true) { //moving up 
			this.sprite.y += 4;
			this.map.collisionMoveDown(this.sprite);
			if (this.right) {
				this.sprite.x += 2;
				if (this.map.collisionMoveRight(this.sprite)) {
					this.sprite.x -= 2;
					this.right = !this.right;
				}
			}
			else {
				this.sprite.x -= 2;
				if (this.map.collisionMoveLeft(this.sprite)) {
					this.sprite.x += 2;
					this.right = !this.right;
				}
			}
		}
	}
	this.sprite.update(deltaTime);
}

Mushroom.prototype.draw = function () {
	if (this.active)
		this.sprite.draw();
}

Mushroom.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x, this.sprite.y, this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height);
	return box;
}
