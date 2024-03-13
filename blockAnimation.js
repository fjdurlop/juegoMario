
//Leer la layer3 y dibujar su correspondiente sprite
function BlockAnimation(map) {
	this.map = map;
	this.coins = [];
	this.queryblock = [];
	this.bricks = [];
}

BlockAnimation.prototype.update = function (deltaTime) {
	var atb = this.map.getBlockAnimationData();

	if (this.coins.length < 1) {
		this.coins = createCoinAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	}
	if (this.queryblock.length < 1) {
		this.queryblock = createQueryBlockAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	}
	if (this.bricks.length < 1) {
		this.bricks = createBrickAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	}

	this.coins.forEach(coin => coin.update(deltaTime));
	this.queryblock.forEach(queryblock => queryblock.update(deltaTime));
	this.bricks.forEach(brick => brick.update(deltaTime));
}

//OPosX, OPosY: origen de coordenadas del mapa
//tileX, tileY: el ancho y alto del tile en pixels
//layer: json de la capa 3
function createCoinAnimation(OPosX, OPosY, tileX, tileY, layer) {
	var coins = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 36 || tiledId == 11) {
				coins.push(new Coin(OPosX + i * tileX, OPosY + j * tileY));
			}
		}
	return coins;
}

function createQueryBlockAnimation(OPosX, OPosY, tileX, tileY, layer) {
	var queryblock = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 2) {
				queryblock.push(new QueryBlock(OPosX + i * tileX, OPosY + j * tileY));
			}
		}
	return queryblock;
}

function createBrickAnimation(OPosX, OPosY, tileX, tileY, layer) {
	var bricks = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 3) {
				bricks.push(new Brick(OPosX + i * tileX, OPosY + j * tileY));
			}
		}
	return bricks;
}

BlockAnimation.prototype.draw = function () {
	this.coins.forEach(coin => coin.active == true && coin.draw());
	this.queryblock.forEach(queryblock => queryblock.active == true && queryblock.draw());
	this.bricks.forEach(brick => brick.active == true && brick.draw());
}

BlockAnimation.prototype.checkCollision = function (playerColisionBox) {
	this.coins.forEach(coin => {
		if (playerColisionBox.intersect(coin.collisionBox())) {
			coin.active = false;
		}
	});
	this.queryblock.forEach(queryblock => {
		if (playerColisionBox.intersect(queryblock.collisionDown())) {
			queryblock.hit = true;
		}
	});
	this.bricks.forEach(brick => {
		if (playerColisionBox.intersect(brick.collisionDown())) {
			brick.hit = true;
		}
	});

}