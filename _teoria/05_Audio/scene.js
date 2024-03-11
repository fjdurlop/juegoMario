

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Prepare sounds
	this.music = AudioFX('sounds/main_theme.mp3', { loop: true });
	this.shootSound = AudioFX('sounds/shoot.wav');

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	// Init music once user has interacted
	if(interacted)
		this.music.play();
	
	// Play shooting sound when spacebar pressed
	if(keyboard[32] && interacted)
		this.shootSound.play();
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw text
	if(keyboard[32])
	{
		var text = "Spacebar pressed";
		context.font = "24px Verdana";
		var textSize = context.measureText(text);
		context.fillStyle = "SlateGrey";
		context.fillText(text, 256 - textSize.width/2, 224 + 12);
	}
}



