

// Scene. Updates and draws a single scene of the game.

function InstructionsScene() {


	// New code to load a menu background image
	this.menuImage = null; // This will hold our image once loaded
	//this.loadImage();
	this.active = false;
	this.nextScene = null;

}

InstructionsScene.prototype.update = function (deltaTime) {
	//ESC
	if (keyboard[27]){
		this.nextScene = 'menu';
	}

}

InstructionsScene.prototype.drawStatusText = function () {

	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");
	var score = 8888;

	context.font = "900 40px Verdana";
	context.fillStyle = 'white';
	context.fillText('INSTRUCTIONS', 8 * 32, 2*32);
	context.font = "900 30px Verdana";
	context.fillStyle = 'white';

	context.font = "900 20px Verdana";
	context.fillStyle = 'white';

	// Draw status text on the canvas

	// Displaying game instructions
    context.font = "16px Verdana";
    context.fillText("- Use arrow keys to move Mario", 50, 140);
    context.fillText("- Space or up key to jump", 50, 170);
    context.fillText("- Collect coins and avoid Goombas and Turtles", 50, 200);
	context.fillText("- If you fall into a hole or water, you die :(", 50, 230);

	context.font = "900 12px Verdana";
	context.fillStyle = 'white';
	context.fillText('[ESC] MENU', 22 * 32, 20);

}

InstructionsScene.prototype.draw = function () {
	//console.log("InstructionsScene.draw()");

	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);

	//context.fillStyle = "rgb(90, 150, 240)";
	context.fillStyle = "rgb(0, 0, 0)";

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
InstructionsScene.prototype.loadImage = function() {
	this.menuImage = new Image();
	this.menuImage.src = 'imgs/main_menu.png'; // Path to your image
	// Optional: You can use the onload event of the image to know when it's loaded
	this.menuImage.onload = function() {
		// Image loaded
		console.log("Image loaded main menu");
	};
};