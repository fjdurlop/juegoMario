

function Flag(x, y) {
    var flag = new Texture("imgs/flag.png");

    this.x = x;
    this.y = y;
    this.height = 7;

    this.active = true;

    this.first_hit = false;
    this.hit = false;
    
    //this.break = false;
    this.startY = 0;

    this.reachedY=0;
    //this.bobbingAngle = 0;

    this.sprite = new Sprite(x, y, 32, this.height*32, 5, flag);

    //default
    this.sprite.addAnimation();
    this.sprite.addKeyframe(0, [0*32, 0, 32, this.height*32]);
    this.sprite.addAnimation(); //list of animations
    this.sprite.addKeyframe(1, [4*32, 0, 32, this.height*32]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(2, [3*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(2, [4*32, 0, 32, this.height*32]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(3, [2*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(3, [3*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(3, [4*32, 0, 32, this.height*32]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(4, [1*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(4, [2*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(4, [3*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(4, [4*32, 0, 32, this.height*32]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(5, [0*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(5, [1*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(5, [2*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(5, [3*32, 0, 32, this.height*32]);
    this.sprite.addKeyframe(5, [4*32, 0, 32, this.height*32]);
    this.sprite.addAnimation();
    this.sprite.addKeyframe(6, [0*32, 0, 32, this.height*32]);
    // this.sprite.addAnimation();
    // this.sprite.addKeyframe(1, [])

    
}


Flag.prototype.update = function (deltaTime) {

    // //Mario hits flag
    // var mario_hit_height = 3;
    // if (this.hit == true) {
    //     console.log("flag: hit");
    // }
    // else {
    //     //
    // }
    if(!this.active)
        console.log("flag:no active");
    this.sprite.update(deltaTime);

    if(!this.first_hit){
        //console.log("animation,",0);
        this.sprite.setAnimation(0);
    }

        
}

Flag.prototype.draw = function () {
    this.sprite.draw();
}

Flag.prototype.collisionBox = function () {
    var box = new Box(this.sprite.x + 2, this.sprite.y , this.sprite.x + this.sprite.width - 2, this.sprite.y + this.sprite.height - 2);
    return box;
}

Flag.prototype.collisionDown = function () {
    var box = new Box(this.sprite.x + 4, this.sprite.y + this.sprite.height, this.sprite.x + this.sprite.width - 8, this.sprite.y + this.sprite.height + 6);

    return box;
}

Flag.prototype.checkCollision = function (player) {
    var playerColisionBox = player.collisionBox();
    var points=0;
    if(player.in_flag_finish){
        //player.stateUpdate();
        //if(player.in_flag)
        console.log("flag:here!");
        this.sprite.setAnimation(1);
        points = this.reachedY * 100;
    }else{
        if (playerColisionBox.intersect(this.collisionBox()) && !this.hit && !player.in_flag_finish){
            this.hit = true;
            if(!this.first_hit)
                this.first_hit = true;
            console.log("flag: hit ", );
            //this.startY = ;
            //13-0, 12-1
            
            //console.log("flag: this.y ", this.y);
            //console.log("resta;",13 - this.startY); // hardcoded 13 = start tile of flag
            
            this.startY = 13 - Math.floor((player.sprite.y+1) / 32);
            if(!player.in_flag){
                this.reachedY = this.startY+1; //save reached height of the flag
            }
            console.log("flag: startY ", this.startY+1);
            console.log("flag: reachedY ", this.reachedY+1);
    
            if(this.startY+1<=5 && this.startY+1 >=0)
                this.sprite.setAnimation(this.startY+1);
            else
                this.sprite.setAnimation(5);
            player.in_flag = true;
        }else{
            this.hit=false;
            //console.log("flag: hit false", this.hit);
        }
    }
    

    

    return points;
}