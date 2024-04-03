const MUSHROOM = 0;


function QueryBlock(x, y, map) {
    var blocks = new Texture("imgs/blocks.png");

    this.active = true;
    this.hit = false;
    this.startY = y;
    this.bobbingAngle = 0;

    this.powerupAppearsAudio = AudioFX('sounds/smb_powerup_appears.wav');

    this.sprite = new Sprite(x, y, 32, 32, 5, blocks);
    this.powerups = 0;//if 0 minicoin, 1 only mushroom, 2 only star
    this.coin = new MiniCoin(x + 10, y - 32);
    this.mushroom = new Mushroom(x, y - 32, map);
    this.star = new Star(x, y - 32, map);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [0, 0, 32, 32]);
    this.sprite.addKeyframe(0, [32, 0, 32, 32]);
    this.sprite.addKeyframe(0, [64, 0, 32, 32]);
    this.sprite.addKeyframe(0, [32, 0, 32, 32]);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(1, [32 * 3, 0, 32, 32]);

    this.sprite.setAnimation(0);
}

QueryBlock.prototype.update = function (deltaTime) {
    if (this.sprite.currentAnimation == 1 && this.bobbingAngle == 0)
        this.hit = false;

    if (this.hit == true) {
        this.sprite.setAnimation(1);
        switch (this.powerups) {
            case 1:
                this.mushroom.play = true;
                this.powerupAppearsAudio.play();
                break;
            case 2:
                this.star.play = true;
                this.powerupAppearsAudio.play();
                break;
            default:
                this.coin.play = true;
                break;
        }
        //reproducir animacion de coin o mushroom o star
        this.sprite.y = this.startY - 10 * Math.sin(3.14159 * this.bobbingAngle / 180);
        this.bobbingAngle += 10;
        if (this.bobbingAngle > 180) {
            this.hit = false;
            this.sprite.y = this.startY;
        }
    }
    else {
        this.startY = this.sprite.y;
        this.bobbingAngle = 0;
    }

    this.coin.update(deltaTime);
    this.mushroom.update(deltaTime);
    this.star.update(deltaTime);
    this.sprite.update(deltaTime);
}

QueryBlock.prototype.draw = function () {
    this.coin.draw();
    this.mushroom.draw();
    this.star.draw();
    this.active == true && this.sprite.draw();
}

QueryBlock.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
    return box;
}

QueryBlock.prototype.collisionDown = function () {
    var box = new Box(this.sprite.x + 4, this.sprite.y + this.sprite.height, this.sprite.x + this.sprite.width - 8, this.sprite.y + this.sprite.height + 2);
    return box;
}