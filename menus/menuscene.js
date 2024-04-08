

// Scene. Updates and draws a single scene of the game.
function MenuScene(points_record) {

	// New code to load a menu background image
	//console.log("menu created")
	this.menuImage = null; // This will hold our image once loaded
	this.loadImage();
	this.active = false;

	this.nextScene = null;

	this.points_record = points_record;
	console.log("points_record: ",points_record);

}

MenuScene.prototype.update = function () {
	//enter
	if (keyboard[13]){
		this.nextScene = 'level1';
	}
	// numbers 0-9 are 48-57
	else if(keyboard[49]){
		this.nextScene = 'instructions';
	}
	else if(keyboard[57]){
		this.nextScene = 'credits';
	}

}

MenuScene.prototype.drawStatusText = function () {

	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");
	context.font = "900 12px Verdana";
	context.fillStyle = 'white';
	context.fillText('[1] INSTRUCTIONS [9] CREDITS', 9 * 32, 9*32);
	context.fillText('PRESS [ENTER] TO START NEW GAME!', 9 * 32, 12*32);

	context.fillText(String(this.points_record).padStart(6, '0'), 13 * 32, 13*32-10);

	context.font = "900 20px Verdana";
	context.fillStyle = 'white';

	// Draw status text on the canvas
	var score = 8888;
	

}

MenuScene.prototype.draw = function () {
	//console.log("MenuScene.draw()");

	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "rgb(90, 150, 240)";

	context.fillRect(0, 0, canvas.width, canvas.height);

	if(this.menuImage) {
		context.drawImage(this.menuImage, 0, 0, canvas.width, canvas.height);
	}

	context.save();
	context.translate(0, 0);

	context.restore();

	//Draw status text
	this.drawStatusText();
}

// Function to load an image
MenuScene.prototype.loadImage = function() {
	this.menuImage = new Image();
	this.menuImage.src = 'imgs/main_menu.png'; // Path to your image
	// Optional: You can use the onload event of the image to know when it's loaded
	this.menuImage.onload = function() {
		// Image loaded
		console.log("Image loaded main menu");
	};
};