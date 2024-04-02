

// Scene. Updates and draws a single scene of the game.
function CreditsScene() {


	// New code to load a menu background image
	this.menuImage = null; // This will hold our image once loaded
	//this.loadImage();
	this.active = false;
	this.nextScene = null;

}

CreditsScene.prototype.update = function () {

	//ESC
	if (keyboard[27]){
		this.nextScene = 'menu';
	}

	// //enter
	// if (keyboard[13]){
	// 	this.nextScene = 'game';
	// }
	// // numbers 0-9 are 48-57
	// else if(keyboard[49]){
	// 	this.nextScene = 'instructions';
	// }
	// else if(keyboard[57]){
	// 	this.nextScene = 'credits';
	// }
	
}

CreditsScene.prototype.drawStatusText = function () {

	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");
	var score = 8888;

	context.font = "900 40px Verdana";
	context.fillStyle = 'white';
	context.fillText('CREDITS', 9 * 32, 3*32);

	context.font = "900 30px Verdana";
	context.fillStyle = 'red';
	context.fillText('Jocs per Computador', 8 * 32, 5*32);

	context.font = "900 20px Verdana";
	context.fillStyle = 'white';
	context.fillText('Professor:', 9 * 32, 7*32);
	context.fillText('Antonio Chica', 9 * 32, 8*32);
	context.fillText('Team:', 9 * 32, 11*32);
	context.fillText('Francisco Duran', 9 * 32, 12*32);
	context.fillText('Xinlei', 9 * 32, 13*32);

	context.font = "900 12px Verdana";
	context.fillStyle = 'white';
	context.fillText('[ESC] MENU', 22 * 32, 20);

}

CreditsScene.prototype.draw = function () {
	//console.log("CreditsScene.draw()");

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
CreditsScene.prototype.loadImage = function() {
	this.menuImage = new Image();
	this.menuImage.src = 'imgs/main_menu.png'; // Path to your image
	// Optional: You can use the onload event of the image to know when it's loaded
	this.menuImage.onload = function() {
		// Image loaded
		console.log("Image loaded main menu");
	};
};