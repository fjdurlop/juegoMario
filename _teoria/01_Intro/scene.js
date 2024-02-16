

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TexturedQuad
	var img = new Texture("imgs/varied.png");
	var brick = new Texture("imgs/brick.png");

	var canvas = document.getElementById("game-layer");

	// Prepare all quads
	this.quads = new Array();
	this.quads.push(new Quad(64, 32, 128, 128, "red"));
	this.quads.push(new Quad(320, 32, 128, 128, "green"));
	this.quads.push(new Quad(64, 288, 128, 128, "blue"));
	
	this.texQuad = new TexturedQuad(0, 0, 32, 32, 320, 288, 128, 128, img);
	
	this.brick01 = new TexturedQuad(0, 0, 64, 64, 0, canvas.height-20, 20, 20, brick);
	

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Clear background
	context.fillStyle = "rgb(100, 224, 240)";
	context.fillRect(0, 0, canvas.width, (canvas.height)/2);

	// Draw color quads
	context.save();
	//the way it is moving
	context.translate(32 * Math.sin(this.currentTime / 1000), 0);
	this.quads[0].draw();
	context.restore();
	
	context.save();
	context.translate(-32 * Math.sin(this.currentTime / 1000), 0);
	this.quads[1].draw();
	context.restore();
	
	context.save();
	context.translate(32 * Math.sin(this.currentTime / 1000), 0);
	this.quads[2].draw();
	context.restore();
		
	// Draw textured quad
	context.save();
	context.translate(-32 * Math.sin(this.currentTime / 1000), 0);
	this.texQuad.draw();
	context.restore();

	context.save();
	//context.translate(-32 * Math.sin(this.currentTime / 1000), 0);
	this.brick01.draw();
	context.restore();
	
	
	// Draw text
	var text = "Videogames!!!";
	context.font = "24px Verdana";
	var textSize = context.measureText(text);
	context.fillStyle = "SlateGrey";
	context.fillText(text, 256 - textSize.width/2, 224 - 12);
	
	text = "Active for " + Math.floor(this.currentTime / 1000) + " seconds";
	var textSize = context.measureText(text);
	context.fillText(text, 256 - textSize.width/2, 224 + 12);

	if(keyboard[32])
	{
		text = "Spacebar pressed";
		var textSize = context.measureText(text);
		context.fillText(text, 256 - textSize.width/2, 224 + 36);
	}

	if(keyboard[32])
	{
		text = "Spacebar pressed";
		var textSize = context.measureText(text);
		context.fillText(text, 256 - textSize.width/2, 224 + 36);
	}

	if(keyboard[87])
	{
		text = "W pressed";
		var textSize = context.measureText(text);
		context.fillText(text, 256 - textSize.width/2, 224 + 36);
	}

	if(keyboard[83])
	{
		context.save();
		context.translate(50 * Math.sin(this.currentTime / 1000), 0);
		this.quads[2].draw();
		context.restore();

		text = "S pressed";
		var textSize = context.measureText(text);
		context.fillText(text, 256 - textSize.width/2, 224 + 36);
	}

	if(keyboard[68])
	{
		text = "D pressed";
		var textSize = context.measureText(text);
		context.fillText(text, 256 - textSize.width/2, 224 + 36);
	}

	if(keyboard[65])
	{
		text = "A pressed";
		var textSize = context.measureText(text);
		context.fillText(text, 256 - textSize.width/2, 224 + 36);
	}
}



