

function Coin(x, y) {
    var blocks = new Texture("imgs/blocks.png");

    this.active = true;
    this.once = false;
    // Prepare coin sprite & its animation
    this.sprite = new Sprite(x, y, 32, 32, 5, blocks);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [0, 32, 32, 32]);
    this.sprite.addKeyframe(0, [0, 32, 32, 32]);
    this.sprite.addKeyframe(0, [0, 32, 32, 32]);
    this.sprite.addKeyframe(0, [0, 32, 32, 32]);
    this.sprite.addKeyframe(0, [32, 32, 32, 32]);
    this.sprite.addKeyframe(0, [64, 32, 32, 32]);
    this.sprite.addKeyframe(0, [32, 32, 32, 32]);
}

Coin.prototype.update = function update(deltaTime) {
    this.active && this.sprite.update(deltaTime);
}

Coin.prototype.draw = function draw() {
    this.active && this.sprite.draw();
}

Coin.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}