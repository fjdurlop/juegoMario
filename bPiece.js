

function BPiece(x, y) {
    var img = new Texture("imgs/blocks.png");

    this.active = true;
    this.play = true;
    this.startY = y;
    this.jumping = true;
    this.jumpAngle = 0;
    this.right = true;

    var size = 16;
    this.sprite = new Sprite(x, y, size, size, 4, img);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [32, 32 * 2, size, size]);
    this.sprite.addKeyframe(0, [32 + 16, 32 * 2 + 16, size, size]);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(1, [32, 32 * 2 + 16, size, size]);
    this.sprite.addKeyframe(1, [32 + 16, 32 * 2, size, size]);

    this.sprite.setAnimation(0);
}

BPiece.prototype.update = function (deltaTime) {
    if (this.play) {
        this.active = true;
        if (this.jumping) {
            this.jumpAngle += 4;
            if (this.jumpAngle == 180) {
                this.jumping = false;
                this.sprite.y = this.startY;
            } else
                this.sprite.y = this.startY - 32 * 2 * Math.sin(3.14159 * this.jumpAngle / 180);
        } else // falling by gravity
            this.sprite.y += 4;

        if (this.right)
            this.sprite.x += 1;
        else
            this.sprite.x -= 1;
    }
    this.sprite.update(deltaTime);
}

BPiece.prototype.draw = function () {
    if (this.active)
        this.sprite.draw();
}

BPiece.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}
