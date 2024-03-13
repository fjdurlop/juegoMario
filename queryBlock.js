

function QueryBlock(x, y) {
    var coin = new Texture("imgs/coins.png");

    this.x = x;
    this.y = y;

    this.active = true;
    this.hit = false;
    this.startY = this.sprite.y;
    this.bobbingAngle = 0;

    this.sprite = new Sprite(x, y, 32, 32, 5, coin);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [32, 0, 32, 32]);
    this.sprite.addKeyframe(0, [64, 0, 32, 32]);
    this.sprite.addKeyframe(0, [32, 0, 32, 32]);
}

QueryBlock.prototype.update = function (deltaTime) {

    if (this.hit == true) {
        this.bobbingAngle += 4;
        this.sprite.y = this.startY - 40 * Math.sin(3.14159 * this.bobbingAngle / 180)
        if (this.bobbingAngle == 180) {
            this.hit = false;
            this.sprite.y = this.startY;
        }
    }
    else {
        this.startY = this.sprite.y;
        this.bobbingAngle = 0;
    }
    this.sprite.update(deltaTime);
}

QueryBlock.prototype.draw = function () {
    this.sprite.draw();
}

QueryBlock.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}