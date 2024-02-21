

function Bubble(x, y)
{
	var bubble = new Texture("imgs/bubble.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
	this.sprite.addKeyframe(0, [32, 0, 16, 16]);
	this.sprite.addKeyframe(0, [48, 0, 16, 16]);
}


Bubble.prototype.update = function update(deltaTime)
{
	this.sprite.update(deltaTime);
}

Bubble.prototype.draw = function draw()
{
	this.sprite.draw();
}

Bubble.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




