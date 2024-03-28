
//Leer la layer3 y dibujar su correspondiente sprite
function BlockAnimation(map,level) {
	this.map = map;
	this.coins = [];
	this.queryblock = [];
	this.bricks = [];
	this.num_collected_coins = 0;
	this.num_broken_blocks = 0;
	this.level = level;
	//console.log("blockAnimation level:",this.level)
}

BlockAnimation.prototype.update = function (deltaTime) {
	var atb = this.map.getBlockAnimationData();

	if (this.coins.length < 1) {
		this.coins = this.createCoinAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	}
	if (this.queryblock.length < 1) {
		this.queryblock = this.createQueryBlockAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	}
	if (this.bricks.length < 1) {
		this.bricks = this.createBrickAnimation(atb[0], atb[1], atb[2], atb[3], atb[4]);
	}

	this.coins.forEach(coin => coin.update(deltaTime));
	this.queryblock.forEach(queryblock => queryblock.update(deltaTime));
	this.bricks.forEach(brick => brick.update(deltaTime));
}

//OPosX, OPosY: origen de coordenadas del mapa
//tileX, tileY: el ancho y alto del tile en pixels
//layer: json de la capa 3
BlockAnimation.prototype.createCoinAnimation = function (OPosX, OPosY, tileX, tileY, layer){
//function createCoinAnimation(OPosX, OPosY, tileX, tileY, layer) {
	var coins = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 36 && this.level ==1) //11 in world2
				coins.push(new Coin(OPosX + i * tileX, OPosY + j * tileY));
			if (tiledId == 11 && this.level ==2) //11 in world2
				coins.push(new Coin(OPosX + i * tileX, OPosY + j * tileY));
		}
	return coins;
}

BlockAnimation.prototype.createQueryBlockAnimation = function (OPosX, OPosY, tileX, tileY, layer) {
	var queryblock = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 2 && this.level ==1)
				queryblock.push(new QueryBlock(OPosX + i * tileX, OPosY + j * tileY, this.map));
			if (tiledId == 5 && this.level ==2)
				queryblock.push(new QueryBlock(OPosX + i * tileX, OPosY + j * tileY, this.map));
		}
	return queryblock;
}

BlockAnimation.prototype.createBrickAnimation = function (OPosX, OPosY, tileX, tileY, layer){
//function createBrickAnimation(OPosX, OPosY, tileX, tileY, layer) {
	var bricks = [];
	for (var j = 0, pos = 0; j < layer.height; j++)
		for (var i = 0; i < layer.width; i++, pos++) {
			var tiledId = layer.data[pos];
			if (tiledId == 3 && this.level ==1)
				bricks.push(new Brick(OPosX + i * tileX, OPosY + j * tileY));
			if (tiledId == 8 && this.level ==2)
				bricks.push(new Brick(OPosX + i * tileX, OPosY + j * tileY));
		}
	return bricks;
}

BlockAnimation.prototype.draw = function () {
	this.coins.forEach(coin => coin.draw());
	this.queryblock.forEach(queryblock => queryblock.draw());
	this.bricks.forEach(brick => brick.draw());
}

BlockAnimation.prototype.checkCollision = function (player) {
	//collision with [coins, queryblock, bricks]

	var playerColisionBox = player.collisionBox();
	var playerColisionTop = player.collisionTop();

	this.coins.forEach(coin => {
		if (playerColisionBox.intersect(coin.collisionBox()) && coin.active){
			coin.active = false;
			this.num_collected_coins += 1;
			console.log("+1 coin: ", this.num_collected_coins);
		}	
	});
	this.queryblock.forEach(queryblock => {
		if (playerColisionTop.intersect(queryblock.collisionDown())) {
			queryblock.hit = true;
		}
		//TODO: this.mushroom object exists ?
		if (/* if mushroom are enabled &&*/ playerColisionBox.intersect(queryblock.mushroom.collisionBox())) {
			queryblock.mushroom.active = false;
			queryblock.mushroom.play = false;
			//grow to Super Mario
			player.state = 11;
			player.transform = true;
		}
		if (queryblock.star && playerColisionBox.intersect(queryblock.star.collisionBox())) {
			queryblock.star.active = false;
			queryblock.star.play = false;
			//grow to Star Mario
			player.state = 12;
			player.transform = true;
		}
		player.stateUpdate();
	});

	this.bricks.forEach(brick => {
		if (playerColisionTop.intersect(brick.collisionDown())) {
			brick.hit = true;
			// this.num_broken_blocks +=1;
			// console.log("+1 block: ", this.num_broken_blocks);
			//if player.state == supermario
		}
	});

	return [this.num_collected_coins, this.num_broken_blocks]
}