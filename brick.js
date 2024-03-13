

function Brick(x, y) {
    var coin = new Texture("imgs/coins.png");//que pasa con el fondo ? si el bloque hace el bobbing 

    this.x = x;
    this.y = y;

    this.active = true;
    this.hit = false;
    this.startY = y;
    this.bobbingAngle = 0;

    this.sprite = new Sprite(x, y, 32, 32, 5, coin);

}


Brick.prototype.update = function (deltaTime) {

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

Brick.prototype.draw = function () {
    this.sprite.draw();
}

Brick.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}