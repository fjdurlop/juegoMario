
//Leer la layer3 y dibujar su correspondiente sprite
function BlockAnimation(map) {
	this.map = map;
	this.coins = [];
	this.queryblock = [];
	//id =3, block
}

BlockAnimation.prototype.update = function (deltaTime) {
	var atb = this.map.getBlockAnimationData();

	if (this.coins.length < 1) {
		this.coins = createCoinAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	}
	if (this.queryblock.length < 1) {
		this.queryblock = createQueryBlockAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	}

	this.coins.forEach(coin => coin.update(deltaTime));
	this.queryblock.forEach(queryblock => queryblock.update(deltaTime));
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

BlockAnimation.prototype.draw = function () {
	this.coins.forEach(coin => coin.active == true && coin.draw());
	this.queryblock.forEach(queryblock => queryblock.active == true && queryblock.draw());
}

BlockAnimation.prototype.checkCollision = function (playerColisionBox) {
	this.coins.forEach(coin => playerColisionBox.intersect(coin.collisionBox()));// if collided, hide the coin
	//if brick collided UP(not down), set .hit to true

	//propongo poner un atributo .hide o bien .active en Coin, player, en general Sprites
}