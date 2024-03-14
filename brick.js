

function Brick(x, y) {
    var brick = new Texture("imgs/world1.png");

    this.x = x;
    this.y = y;

    this.active = true;
    this.hit = false;
    this.startY = y;
    this.bobbingAngle = 0;

    this.sprite = new Sprite(x, y, 32, 32, 5, brick);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [64, 0, 32, 32]);

    this.sprite.setAnimation(0);
}


Brick.prototype.update = function (deltaTime) {

    if (this.hit == true) {
        this.sprite.y = this.startY - 10 * Math.sin(3.14159 * this.bobbingAngle / 180);
        this.bobbingAngle += 10;
        if (this.bobbingAngle > 180 - 13 && this.bobbingAngle < 180 + 13) {
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

Brick.prototype.draw = function () {
    this.sprite.draw();
}

Brick.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}

Brick.prototype.collisionDown = function () {
    var box = new Box(this.sprite.x + 9, this.sprite.y + this.sprite.height, this.sprite.x + this.sprite.width - 18, this.sprite.y + this.sprite.height + 6);

    return box;
}