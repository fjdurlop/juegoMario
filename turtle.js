const TURTLE_NORMAL = 0;
const TURTLE_PRESSED = 1;

function Turtle(x, y,map) {
    var turtle = new Texture("imgs/turtle.png");
    this.direction = 0;
    this.counter = 0;

    // Prepare coin sprite & its animation
    this.sprite = new Sprite(x, y, 32, 64, 4, turtle);

    this.sprite.addAnimation(); //list of animations
    this.sprite.addKeyframe(TURTLE_NORMAL, [0, 0, 32, 64]);
    this.sprite.addKeyframe(TURTLE_NORMAL, [32, 0, 32, 64]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(TURTLE_PRESSED, [64, 0, 32, 64]);

    this.map = map;

    this.killed = false;
    this.active = true;

    //this.currentTime = 0;
    this.dyingTime = 0;
    // active = still in screen, active & killed = animation of pressed

}


Turtle.prototype.update = function update(deltaTime) {
    
    if(this.active){
        
        if(this.killed){
            //animation when goomba is killed 
            //console.log("just killed")
            this.sprite.setAnimation(TURTLE_PRESSED);
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
        console.log("tURTLE not actived")
        
    }

    

    if (keyboard[32]) // KEY_LEFT
	{
        if (this.sprite.currentAnimation == TURTLE_NORMAL)
			this.sprite.setAnimation(TURTLE_PRESSED);
        else if (this.sprite.currentAnimation == TURTLE_PRESSED)
            this.sprite.setAnimation(TURTLE_NORMAL);
	}
    
    this.sprite.update(deltaTime);
}

Turtle.prototype.draw = function draw() {
    this.sprite.draw();
}

Turtle.prototype.changeDirection = function changeDirection() {
    if(this.direction==1)
        this.direction = 0
    if(this.direction==0)
        this.direction = 1
}

Turtle.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);

	return box;
}

Turtle.prototype.collisionTop = function () {
	var box = new Box(this.sprite.x + 2+2, this.sprite.y-2, this.sprite.x + this.sprite.width - 4-2, this.sprite.y + 2);

	return box;
}
