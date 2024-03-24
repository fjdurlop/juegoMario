

function Brick(x, y, map) {
    var brick = new Texture("imgs/blocks.png");

    this.x = x;
    this.y = y;

    this.map = map;
    this.active = true;
    this.hit = false;
    this.break = false;
    this.startY = y;
    this.bobbingAngle = 0;

    this.sprite = new Sprite(x, y, 32, 32, 5, brick);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [0, 64, 32, 32]);

    this.sprite.setAnimation(0);
}


Brick.prototype.update = function (deltaTime) {
    if (!this.break) {
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
    }
    else {
        this.active = false;
        this.map.deleteBlock(this.x, this.y);
    }
    this.sprite.update(deltaTime);
}

Brick.prototype.draw = function () {
    this.active == true && this.sprite.draw();
}

Brick.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}

Brick.prototype.collisionDown = function () {
    var box = new Box(this.sprite.x + 4, this.sprite.y + this.sprite.height, this.sprite.x + this.sprite.width - 8, this.sprite.y + this.sprite.height + 6);

    return box;
}