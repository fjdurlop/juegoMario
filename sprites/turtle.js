const TURTLE_LEFT = 0;
const TURTLE_RIGHT = 1;
const TURTLE_PRESSED = 2;

function Turtle(x, y, map) {
    var turtle = new Texture("imgs/turtle_02.png");
    this.direction = 0;
    this.counter = 0;

    pixels_height = 64;
    // Prepare coin sprite & its animation
    this.sprite = new Sprite(x, y, 32, pixels_height, 4, turtle);
    
    this.sprite.addAnimation(); //list of animations
    this.sprite.addKeyframe(TURTLE_LEFT, [0, 0, 32, pixels_height]);
    this.sprite.addKeyframe(TURTLE_LEFT, [32, 0, 32, pixels_height]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(TURTLE_RIGHT, [64, 0, 32, pixels_height]);
    this.sprite.addKeyframe(TURTLE_RIGHT, [96, 0, 32, pixels_height]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(TURTLE_PRESSED, [128, 0, 32, pixels_height]);

    this.map = map;

    this.killed = false;
    this.killed_mario = false;
    this.active = true;
    this.pressed_static = false;
    this.pressed_moving = false;


    //this.currentTime = 0;
    this.dyingTime = 0;
    // active = still in screen, active & killed = animation of pressed

}


Turtle.prototype.update = function update(deltaTime) {

    if (this.active) {

        if (this.pressed_static || this.pressed_moving) {
            //animation when turtle is killed 
            //console.log("pressed active")
            this.sprite.setAnimation(TURTLE_PRESSED);
            if(this.pressed_moving){
                // State: presed_moving
                if (this.direction == 0) // LEFT
                {
                    this.sprite.x -= 4;
                    if (this.map.collisionMoveLeft(this.sprite)) {
                        //this.counter += 1;
                        this.sprite.x += 4;
                        this.changeDirection();
                    }
                }
                else if (this.direction == 1) // RIGHT
                {
                    this.sprite.x += 4;
                    if (this.map.collisionMoveRight(this.sprite)) {
                        this.sprite.x -= 4;
                        this.direction = 0;
                    }
                }
            }
            
        }
        else {
            // State: NORMAL
            if (this.direction == 0) // LEFT
            {
                if (this.sprite.currentAnimation != TURTLE_LEFT)
                 	this.sprite.setAnimation(TURTLE_LEFT);
                this.sprite.x -= 2;
                if (this.map.collisionMoveLeft(this.sprite)) {
                    //this.counter += 1;
                    this.sprite.x += 2;
                    this.changeDirection();
                }
            }
            else if (this.direction == 1) // RIGHT
            {
                if (this.sprite.currentAnimation != TURTLE_RIGHT)
                 	this.sprite.setAnimation(TURTLE_RIGHT);
                this.sprite.x += 2;
                if (this.map.collisionMoveRight(this.sprite)) {
                    this.sprite.x -= 2;
                    this.direction = 0;
                }
            }
        }

    }
    else {
        //no active
        console.log("Turtle not actived")

    }



    if (keyboard[32]) // KEY_LEFT
    {
        if (this.sprite.currentAnimation == TURTLE_LEFT)
            this.sprite.setAnimation(TURTLE_PRESSED);
        else if (this.sprite.currentAnimation == TURTLE_PRESSED)
            this.sprite.setAnimation(TURTLE_LEFT);
    }

    this.sprite.update(deltaTime);
}

Turtle.prototype.draw = function draw() {
    this.sprite.draw();
}

Turtle.prototype.changeDirection = function changeDirection() {
    if (this.direction == 1)
        this.direction = 0
    if (this.direction == 0)
        this.direction = 1
}

Turtle.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y+16, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);

    return box;
}

Turtle.prototype.collisionTop = function () {
    var box = new Box(this.sprite.x + 2 + 2, this.sprite.y+16 - 2, this.sprite.x + this.sprite.width - 4 - 2, this.sprite.y+16 + 2);

    return box;
}
