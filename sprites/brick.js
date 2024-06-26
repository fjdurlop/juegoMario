function Brick(x, y, map) {
    var brick = new Texture("imgs/blocks.png");
    if (world == 2) {
        brick = new Texture("imgs/level2_01.png");
    }

    this.x = x;
    this.y = y;
    this.first = 0;

    this.map = map;
    this.first = 0;
    this.active = true;
    this.hit = false;
    this.break = false;
    this.startY = y;
    this.bobbingAngle = 0;

    this.bumbMusic = AudioFX('sounds/smb_bump.wav');

    this.sprite = new Sprite(x, y, 32, 32, 5, brick);

    this.sprite.addAnimation();
    if (world == 2) {
        this.sprite.addKeyframe(0, [0, 32, 32, 32]);
    }
    else {
        this.sprite.addKeyframe(0, [0, 64, 32, 32]);
    }

    this.sprite.setAnimation(0);
}


Brick.prototype.update = function (deltaTime) {
    if (this.active) {
        if (!this.break) {
            if (this.hit == true) {
                this.bumbMusic.play();
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
            if (this.first != 0) {
                this.map.deleteBlock(this.x, this.y);
                this.active = false;
            }
            else
                this.first++;
        }
        this.sprite.update(deltaTime);
    }
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