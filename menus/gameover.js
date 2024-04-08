

// Scene. Updates and draws a single scene of the game.
function GameOverScene(last_points, last_level) {


	// New code to load a menu background image
	this.menuImage = null; // This will hold our image once loaded
	//this.loadImage();
	this.active = false;
	this.nextScene = null;
	this.last_points = last_points;
	this.last_level = last_level;
}

GameOverScene.prototype.update = function (deltaTime) {
	//ESC
	if (keyboard[27]){
		this.nextScene = 'menu';
	}
}

GameOverScene.prototype.drawStatusText = function () {

	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	
	var score = 8888;

	context.font = "900 40px Verdana";
	context.fillStyle = 'white';
	context.fillText('GAME OVER', 8 * 32, 8*32);
	context.font = "900 30px Verdana";
	context.fillStyle = 'white';
	context.fillText("Your points: "+String(this.last_points).padStart(6, '0'), 7 * 32, 11*32);

	context.font = "900 20px Verdana";
	context.fillStyle = 'white';

	// Draw status text on the canvas
	
	context.fillText('MARI2O22', 2 * 32, 30);
	context.fillText(String(this.last_points).padStart(6, '0'), 2 * 32, 50);

	context.fillText('X 00', 9 * 32, 50);

	context.fillText('WORLD', 15 * 32, 30);
	context.fillText(String(this.last_level)+'-1', 15 * 32, 50);

	context.font = "900 12px Verdana";
	context.fillStyle = 'white';
	context.fillText('[ESC] MENU', 22 * 32, 20);

}

GameOverScene.prototype.draw = function () {
	//console.log ("GameOverScene draw");
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

	//context.fillStyle = "rgb(90, 150, 240)";
	context.fillStyle = "rgb(0, 0, 0)";

	context.fillRect(0, 0, canvas.width, canvas.height);

	// if(this.menuImage) {
	// 	context.drawImage(this.menuImage, 0, 0, canvas.width, canvas.height);
	// }

	context.save();
	context.translate(0, 0);
	//this.map.draw();

	context.restore();

	this.drawStatusText();
}

// Function to load an image
GameOverScene.prototype.loadImage = function() {
	this.menuImage = new Image();
	this.menuImage.src = 'imgs/main_menu.png'; // Path to your image
	// Optional: You can use the onload event of the image to know when it's loaded
	this.menuImage.onload = function() {
		// Image loaded
		console.log("Image loaded main menu");
	};
};