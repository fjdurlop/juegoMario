

function StatusCoin(x, y) {
    var img = new Texture("imgs/statuscoin.png");

    this.active = true;
    // Prepare coin sprite & its animation
    var size = 16;
    this.sprite = new Sprite(x, y, size, size, 5, img);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [0, 0, size, size]);
    this.sprite.addKeyframe(0, [size, 0, size, size]);
    this.sprite.addKeyframe(0, [size * 2, 0, size, size]);
    this.sprite.addKeyframe(0, [size * 2, 0, size, size]);
    this.sprite.addKeyframe(0, [size, 0, size, size]);
    this.sprite.addKeyframe(0, [0, 0, size, size]);
}

StatusCoin.prototype.update = function update(deltaTime) {
    this.active && this.sprite.update(deltaTime);
}

StatusCoin.prototype.draw = function draw() {
    this.active && this.sprite.draw();
}
