// Scene Manager
function SceneManager() {
    this.scenes = {
        game: new Scene(1),
        level1: new Scene(1),
        level2: new Scene(2),
        menu: new MenuScene(0),
        credits: new CreditsScene(),
        gameOver: new GameOverScene(last_points),
        finishLevel: new FinishLevelScene(last_points),
        instructions: new InstructionsScene(),
    };
    this.currentScene = this.scenes.menu; // Start with the menu scene
    this.switchScene("menu");

    //this.points_record = 0;
    
}
var points_record = 0;
var last_points = 0;

SceneManager.prototype.switchScene = function(sceneName) {
    this.currentScene.active = false;
    this.currentScene.nextScene = null;

    //var scene = this.scenes[sceneName];
    //if (scene) {
    if(sceneName == 'game'){
        console.log("SceneManager to Scene()");
        this.currentScene = new Scene(1)
    }
    else if(sceneName == 'level1'){
        console.log("SceneManager to Scene()");
        this.currentScene = new Scene(1)
    }
    else if(sceneName == 'level2'){
        console.log("SceneManager to Scene()");
        this.currentScene = new Scene(2)
    }
    else if(sceneName == 'menu'){
        console.log("SceneManager to menu()");
        console.log("je", points_record);
        this.currentScene = new MenuScene(points_record);
        this.currentScene.nextScene = null;
    }
    else if(sceneName == 'gameOver'){
        console.log("SceneManager to gameover()");
        console.log("je", last_points);
        this.currentScene = new GameOverScene(last_points);
        this.currentScene.nextScene = null;
    }
    else if(sceneName == 'finishLevel'){
        console.log("SceneManager to finishLevel()");
        console.log("je", last_points);
        this.currentScene = new FinishLevelScene(last_points);
        this.currentScene.nextScene = null;
    }
    else{
        this.currentScene = this.scenes[sceneName];
        this.currentScene.nextScene = null;
    }
        
    // } else {
    //     console.error('Scene not found:', sceneName);
    // }
    this.currentScene.active = true;
};

SceneManager.prototype.update = function(deltaTime) {
    if (this.currentScene && typeof this.currentScene.update === 'function') {
        this.currentScene.active == true && this.currentScene.update(deltaTime);
        //console.log("SceneManager:update:currentScene.nextScene = ",this.currentScene.nextScene);
        if(this.currentScene.nextScene != null){
            console.log("SceneManager nextScene to:",this.currentScene.nextScene);
            console.log("Change of record!:",this.currentScene.points);
            last_points = this.currentScene.points;
            if(this.currentScene.points > points_record){
                console.log("Change of record!");
                points_record = this.currentScene.points;
            }
            this.switchScene(this.currentScene.nextScene);
        }
    }
};

SceneManager.prototype.draw = function() {
    if (this.currentScene && typeof this.currentScene.draw === 'function' ) {
        this.currentScene.active == true && this.currentScene.draw();
    }
};
