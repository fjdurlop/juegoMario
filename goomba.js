const GOOMBA_NORMAL = 0;
const GOOMBA_PRESSED = 1;

function Goomba(x, y,map) {
    var goomba = new Texture("imgs/goomba_01.png");
    this.direction = 0;
    this.counter = 0;

    // Prepare coin sprite & its animation
    this.sprite = new Sprite(x, y, 32, 32, 4, goomba);

    this.sprite.addAnimation(); //list of animations
    this.sprite.addKeyframe(GOOMBA_NORMAL, [0, 0, 32, 32]);
    this.sprite.addKeyframe(GOOMBA_NORMAL, [32, 0, 32, 32]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(GOOMBA_PRESSED, [64, 0, 32, 32]);

    this.map = map;

    this.killed = false;
    this.active = true;

    //this.currentTime = 0;
    this.dyingTime = 0;
    // active = still in screen, active & killed = animation of pressed

}


Goomba.prototype.update = function update(deltaTime) {
    
    if(this.active){
        
        if(this.killed){
            //animation when goomba is killed 
            //console.log("just killed")
            this.sprite.setAnimation(GOOMBA_PRESSED);
        }
        else{
            // State: NORMAL
            if (this.direction == 0) // LEFT
            {
                // if (this.sprite.currentAnimation != MARIO_WALK_LEFT)
                // 	this.sprite.setAnimation(MARIO_WALK_LEFT);
                this.sprite.x -= 2;
                if (this.map.collisionMoveLeft(this.sprite))
                {
                    //this.counter += 1;
                    this.sprite.x += 2;
                    this.changeDirection();
                }
            }
            else if (this.direction == 1) // RIGHT
            {
                // if (this.sprite.currentAnimation != MARIO_WALK_RIGHT)
                // 	this.sprite.setAnimation(MARIO_WALK_RIGHT);
                this.sprite.x += 2;
                if (this.map.collisionMoveRight(this.sprite))
                {
                    this.sprite.x -= 2;
                    this.direction = 0;
                }
            }
        }
        
    }
    else{
        //no active
        console.log("Goomba not actived")
        
    }

    

    if (keyboard[32]) // KEY_LEFT
	{
        if (this.sprite.currentAnimation == GOOMBA_NORMAL)
			this.sprite.setAnimation(GOOMBA_PRESSED);
        else if (this.sprite.currentAnimation == GOOMBA_PRESSED)
            this.sprite.setAnimation(GOOMBA_NORMAL);
	}
    
    this.sprite.update(deltaTime);
}

Goomba.prototype.draw = function draw() {
    this.sprite.draw();
}

Goomba.prototype.changeDirection = function changeDirection() {
    if(this.direction==1)
        this.direction = 0
    if(this.direction==0)
        this.direction = 1
}

Goomba.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);

	return box;
}

Goomba.prototype.collisionTop = function () {
	var box = new Box(this.sprite.x + 2+2, this.sprite.y-2, this.sprite.x + this.sprite.width - 4-2, this.sprite.y + 2);

	return box;
}
