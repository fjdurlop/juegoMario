

function MiniCoin(x, y) {
    var powerups = new Texture("imgs/powerups.png");

    this.x = x;
    this.y = y;
    this.active = false;
    this.play = false;
    this.initialY = y;
    this.jumpAngle = 0;

    this.sprite = new Sprite(x, y, 16, 32, 14, powerups);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [64, 32, 16, 32]);
    this.sprite.addKeyframe(0, [80, 32, 16, 32]);
    this.sprite.addKeyframe(0, [96, 32, 16, 32]);
    this.sprite.addKeyframe(0, [112, 32, 16, 32]);

    this.sprite.setAnimation(0);
}

MiniCoin.prototype.update = function update(deltaTime) {
    if (this.play) {
        this.active = true;
        this.sprite.y = this.initialY - 64 * Math.sin(3.14159 * this.jumpAngle / 180);
        this.jumpAngle += 6;
        if (this.jumpAngle > 180) {
            this.play = false;
            this.sprite.y = this.initialY;
            this.active = false;
        }
    }
    else {
        this.initialY = this.sprite.y;
        this.jumpAngle = 0;
    }
    this.sprite.update(deltaTime);
}

MiniCoin.prototype.draw = function draw() {
    if (this.active) {
        this.sprite.draw();
    }
}
