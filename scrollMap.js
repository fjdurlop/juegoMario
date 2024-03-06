

function ScrollMap(player, map) {

	this.map = map;
	this.player = player;

}

Scene.prototype.draw = function () {
	var canvas = document.getElementById("game-layer");
	var limit = canvas.width / 2;
	var player_limit = this.player.x + this.player.width;
	var startDist = 0;

	if (player_limit >= limit) {
		startDist += 2;
		this.map.draw(startDist);
	}
	else {
		this.map.draw(0);
	}

}

