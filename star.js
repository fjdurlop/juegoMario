

function Star(x, y) {
    var powerups = new Texture("imgs/powerups.png");

    var tilesheet = new Texture("imgs/world1.png");
    this.map = new Tilemap(tilesheet, [32, 32], [6, 6], [0, 32], world1);

    this.active = false;
    this.play = false;
    this.jumpAngle = 0;
    this.startY = y;
    this.jumping = true;
    this.right = true;

    this.sprite = new Sprite(x, y, 32, 32, 7, powerups);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [2 * 32, 0, 32, 32]);
    this.sprite.addKeyframe(0, [3 * 32, 0, 32, 32]);
    this.sprite.addKeyframe(0, [1 * 32, 0, 32, 32]);
    this.sprite.addKeyframe(0, [0 * 32, 0, 32, 32]);

    this.sprite.setAnimation(0);
}

Star.prototype.update = function (deltaTime) {

    if (this.play) {
        this.active = true;
        //TODO: moveUP func
        if (this.jumping) {
            this.jumpAngle += 4;
            if (this.jumpAngle == 180) {
                this.jumping = false;
                this.sprite.y = this.startY;
            }
            else {
                if (this.map.collisionMoveUp(this.sprite)) {
                    this.jumping = false;
                } else {
                    this.sprite.y = this.startY - 100 * Math.sin(3.14159 * this.jumpAngle / 180);
                    if (this.jumpAngle > 90)
                        this.jumping = !this.map.collisionMoveDown(this.sprite);
                }
            }
        }
        else {
            this.sprite.y += 4;
            if (this.map.collisionMoveDown(this.sprite)) {
                this.jumping = true;
                this.jumpAngle = 0;
                this.startY = this.sprite.y;
            }
        }
        this.sprite.y += 2;
        if (!this.map.collisionMoveUp(this.sprite) && !this.map.collisionMoveDown(this.sprite)) {
            if (this.right) {
                this.sprite.x += 2;
                if (this.map.collisionMoveRight(this.sprite)) {
                    this.sprite.x -= 2;
                    this.right = !this.right;
                }
            }
            else {
                this.sprite.x -= 2;
                if (this.map.collisionMoveLeft(this.sprite)) {
                    this.sprite.x += 2;
                    this.right = !this.right;
                }
            }
        }
        this.sprite.y -= 2;
    }
    this.sprite.update(deltaTime);
}

Star.prototype.draw = function () {
    if (this.active) {
        this.sprite.draw();
    }
}

Star.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}
