

function QueryBlock(x, y) {
    var coin = new Texture("imgs/coins.png");

    this.x=x;
    this.y=y;

    this.sprite = new Sprite(x, y, 32, 32, 5, coin);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [32, 0, 32, 32]);
    this.sprite.addKeyframe(0, [64, 0, 32, 32]);
    this.sprite.addKeyframe(0, [32, 0, 32, 32]);


}


QueryBlock.prototype.update = function update(deltaTime) {
    this.sprite.update(deltaTime);
}

QueryBlock.prototype.draw = function draw() {
    this.sprite.draw();
}

QueryBlock.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}